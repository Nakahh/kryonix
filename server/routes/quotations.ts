import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface QuotationPayload {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  siteType: string;
  pages: number;
  hasAdminPanel: boolean;
  hasPaymentIntegration: boolean;
  hasSupport: boolean;
  additionalFeatures?: string;
  estimatedPrice: number;
}

// Create new quotation
export const handleCreateQuotation: RequestHandler = async (req, res) => {
  try {
    const quotationData: QuotationPayload = req.body;

    // Get user ID from token if provided
    let userId: string | undefined;
    const authHeader = req.headers.authorization;
    if (authHeader) {
      try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
        userId = decoded.userId;
      } catch (error) {
        // Continue without user ID if token is invalid
      }
    }

    // Create quotation
    const quotation = await prisma.quotation.create({
      data: {
        userId,
        customerName: quotationData.customerName,
        customerEmail: quotationData.customerEmail,
        customerPhone: quotationData.customerPhone,
        siteType: quotationData.siteType,
        pages: quotationData.pages,
        hasAdminPanel: quotationData.hasAdminPanel,
        hasPaymentIntegration: quotationData.hasPaymentIntegration,
        hasSupport: quotationData.hasSupport,
        additionalFeatures: quotationData.additionalFeatures,
        estimatedPrice: quotationData.estimatedPrice,
        status: "PENDING",
      },
    });

    // Send notification to admin
    await notifyAdminNewQuotation(quotation);

    // Send email to customer (using Resend)
    await sendQuotationEmail(quotation);

    res.status(201).json({
      quotation: {
        id: quotation.id,
        estimatedPrice: quotation.estimatedPrice,
        status: quotation.status,
        createdAt: quotation.createdAt,
      },
    });
  } catch (error) {
    console.error("Create quotation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get quotations (admin only)
export const handleGetQuotations: RequestHandler = async (req, res) => {
  try {
    // In a real implementation, add admin authorization check
    const quotations = await prisma.quotation.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    res.json({ quotations });
  } catch (error) {
    console.error("Get quotations error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update quotation status (admin only)
export const handleUpdateQuotationStatus: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, finalPrice } = req.body;

    const quotation = await prisma.quotation.update({
      where: { id },
      data: {
        status,
        finalPrice: finalPrice ? parseFloat(finalPrice) : undefined,
      },
    });

    // Send update email to customer
    await sendQuotationUpdateEmail(quotation);

    res.json({ quotation });
  } catch (error) {
    console.error("Update quotation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Calculate quotation price using AI logic
export const handleCalculatePrice: RequestHandler = async (req, res) => {
  try {
    const {
      siteType,
      pages,
      hasAdminPanel,
      hasPaymentIntegration,
      hasSupport,
    } = req.body;

    let basePrice = 0;

    // Base price by site type
    switch (siteType) {
      case "institutional":
        basePrice = 800;
        break;
      case "ecommerce":
        basePrice = 2500;
        break;
      case "system":
        basePrice = 5000;
        break;
      default:
        basePrice = 800;
    }

    // Additional pages (first 5 included)
    if (pages > 5) {
      basePrice += (pages - 5) * 150;
    }

    // Additional features
    if (hasAdminPanel) basePrice += 800;
    if (hasPaymentIntegration) basePrice += 600;
    if (hasSupport) basePrice += 500;

    // Add some AI randomization (±10%)
    const variation = 0.9 + Math.random() * 0.2;
    const finalPrice = Math.round(basePrice * variation);

    res.json({ estimatedPrice: finalPrice });
  } catch (error) {
    console.error("Calculate price error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Helper function to notify admin about new quotation
async function notifyAdminNewQuotation(quotation: any) {
  try {
    // Send webhook to admin notification system
    if (process.env.ADMIN_WEBHOOK_URL) {
      await fetch(process.env.ADMIN_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "new_quotation",
          data: {
            id: quotation.id,
            customerName: quotation.customerName,
            customerEmail: quotation.customerEmail,
            siteType: quotation.siteType,
            estimatedPrice: quotation.estimatedPrice,
            createdAt: quotation.createdAt,
          },
        }),
      });
    }

    // Log to admin metrics
    await updateAdminMetrics("quotationsToday", 1);
  } catch (error) {
    console.error("Admin notification failed:", error);
  }
}

// Helper function to send quotation email
async function sendQuotationEmail(quotation: any) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.log("No Resend API key, skipping email");
      return;
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "AutoBiz <noreply@autobiz.com>",
        to: [quotation.customerEmail],
        subject: `Orçamento para seu ${quotation.siteType} - R$ ${quotation.estimatedPrice}`,
        html: `
          <h2>Olá ${quotation.customerName}!</h2>
          <p>Recebemos sua solicitação de orçamento para criação de site.</p>
          
          <h3>Detalhes do Projeto:</h3>
          <ul>
            <li><strong>Tipo:</strong> ${quotation.siteType}</li>
            <li><strong>Páginas:</strong> ${quotation.pages}</li>
            <li><strong>Valor Estimado:</strong> R$ ${quotation.estimatedPrice.toLocaleString()}</li>
          </ul>
          
          <p>Em breve entraremos em contato para detalhar seu projeto.</p>
          
          <p>Atenciosamente,<br>Equipe AutoBiz</p>
        `,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send email: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Email sending failed:", error);
  }
}

// Helper function to send quotation update email
async function sendQuotationUpdateEmail(quotation: any) {
  try {
    if (!process.env.RESEND_API_KEY) return;

    let subject = "";
    let message = "";

    switch (quotation.status) {
      case "APPROVED":
        subject = "Orçamento Aprovado! 🎉";
        message = `Seu orçamento foi aprovado! Em breve iniciaremos o desenvolvimento do seu projeto.`;
        break;
      case "IN_DEVELOPMENT":
        subject = "Projeto em Desenvolvimento 🚀";
        message = `Ótimas notícias! Seu projeto já está em desenvolvimento.`;
        break;
      case "COMPLETED":
        subject = "Projeto Concluído! ✅";
        message = `Seu projeto foi concluído com sucesso! Confira o resultado.`;
        break;
      default:
        return;
    }

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "AutoBiz <noreply@autobiz.com>",
        to: [quotation.customerEmail],
        subject,
        html: `
          <h2>Olá ${quotation.customerName}!</h2>
          <p>${message}</p>
          
          <h3>Detalhes do Projeto:</h3>
          <ul>
            <li><strong>Tipo:</strong> ${quotation.siteType}</li>
            <li><strong>Status:</strong> ${quotation.status}</li>
            ${quotation.finalPrice ? `<li><strong>Valor Final:</strong> R$ ${quotation.finalPrice.toLocaleString()}</li>` : ""}
          </ul>
          
          <p>Atenciosamente,<br>Equipe AutoBiz</p>
        `,
      }),
    });
  } catch (error) {
    console.error("Update email failed:", error);
  }
}

// Helper function to update admin metrics
async function updateAdminMetrics(field: string, increment: number) {
  try {
    const today = new Date().toISOString().split("T")[0];

    await prisma.adminMetrics.upsert({
      where: { date: new Date(today) },
      update: {
        [field]: {
          increment,
        },
      },
      create: {
        date: new Date(today),
        [field]: increment,
      },
    });
  } catch (error) {
    console.error("Failed to update admin metrics:", error);
  }
}

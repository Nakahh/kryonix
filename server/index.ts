import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Import route handlers
import {
  handleRegister,
  handleLogin,
  handleGetUser,
  handleGoogleCallback,
} from "./routes/auth.js";
import {
  handleCreateQuotation,
  handleGetQuotations,
  handleUpdateQuotationStatus,
  handleCalculatePrice,
} from "./routes/quotations.js";
import {
  handleSaveConfig,
  handleGetConfig,
  handleTestOpenAI,
  handleTestGoogle,
  handleTestStripe,
  handleTestResend,
  handleTestN8N,
  handleTestWhatsApp,
  handleGetSystemStatus,
} from "./routes/config.js";
import { handleDemoRoute } from "./routes/demo.js";
import adminRouter from "./routes/admin.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get("/api/ping", (req, res) => {
    res.json({ message: "AutoBiz API is running!" });
  });

  // Authentication routes
  app.post("/api/auth/register", handleRegister);
  app.post("/api/auth/login", handleLogin);
  app.get("/api/auth/user", handleGetUser);
  app.get("/api/auth/google/callback", handleGoogleCallback);

  // Admin routes (protected)
  app.use("/api/admin", adminRouter);

  // Quotation routes
  app.post("/api/quotations", handleCreateQuotation);
  app.get("/api/quotations", handleGetQuotations);
  app.patch("/api/quotations/:id", handleUpdateQuotationStatus);
  app.post("/api/quotations/calculate", handleCalculatePrice);

  // Configuration routes
  app.post("/api/admin/config", handleSaveConfig);
  app.get("/api/admin/config", handleGetConfig);
  app.get("/api/system/status", handleGetSystemStatus);

  // API Testing routes
  app.post("/api/test/openai", handleTestOpenAI);
  app.post("/api/test/google", handleTestGoogle);
  app.post("/api/test/stripe", handleTestStripe);
  app.post("/api/test/resend", handleTestResend);
  app.post("/api/test/n8n", handleTestN8N);
  app.post("/api/test/whatsapp", handleTestWhatsApp);

  // Dashboard routes
  app.get("/api/dashboard/metrics", async (req, res) => {
    try {
      // Mock metrics for now
      res.json({
        messagesThisMonth: 245,
        leadsGenerated: 32,
        appointmentsScheduled: 18,
        revenue: 2850,
        whatsappConnected: true,
        emailConnected: false,
        calendarConnected: false,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to get metrics" });
    }
  });

  // WhatsApp integration routes
  app.post("/api/whatsapp/connect", async (req, res) => {
    try {
      // Generate QR code for WhatsApp connection
      const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
        `whatsapp-connect-${Date.now()}`,
      )}`;

      res.json({
        qrCode,
        sessionId: `session-${Date.now()}`,
        instructions: "Escaneie este QR Code com seu WhatsApp para conectar",
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to generate QR code" });
    }
  });

  app.get("/api/whatsapp/status/:sessionId", async (req, res) => {
    try {
      // Mock WhatsApp status check
      const { sessionId } = req.params;
      const isConnected = Math.random() > 0.5; // Simulate connection status

      res.json({
        sessionId,
        connected: isConnected,
        phone: isConnected ? "+55 11 99999-9999" : null,
        lastSeen: isConnected ? new Date().toISOString() : null,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to check WhatsApp status" });
    }
  });

  // N8N workflow routes
  app.post("/api/workflows/create", async (req, res) => {
    try {
      const { userId, businessData } = req.body;

      // Mock workflow creation
      const workflowId = `workflow-${userId}-${Date.now()}`;

      res.json({
        workflowId,
        webhookUrl: `${process.env.N8N_WEBHOOK_URL}/${workflowId}`,
        status: "created",
        message: "Workflow criado com sucesso",
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to create workflow" });
    }
  });

  // Admin routes (protected)
  app.get("/api/admin/metrics", async (req, res) => {
    try {
      // Check admin token
      const token = req.query.token;
      if (token !== process.env.ADMIN_SECRET_TOKEN) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      // Mock admin metrics
      res.json({
        totalUsers: 1247,
        activeUsers: 892,
        totalRevenue: 45650,
        monthlyRecurring: 18940,
        quotationsToday: 23,
        quotationsPending: 8,
        conversionRate: 12.5,
        systemHealth: {
          apiUptime: "99.9%",
          n8nStatus: "online",
          databaseStatus: "healthy",
          lastBackup: new Date().toISOString(),
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to get admin metrics" });
    }
  });

  app.post("/api/admin/notifications", async (req, res) => {
    try {
      const { type, data } = req.body;

      console.log("Admin notification:", { type, data, timestamp: new Date() });

      // In a real implementation, send to Discord/Slack webhook
      if (process.env.DISCORD_WEBHOOK_URL) {
        await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `🚨 **AutoBiz Alert**\nType: ${type}\nData: ${JSON.stringify(data, null, 2)}`,
          }),
        });
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to send notification" });
    }
  });

  // File upload route
  app.post("/api/upload", async (req, res) => {
    try {
      // Mock file upload
      const fileName = `file-${Date.now()}.jpg`;
      const fileUrl = `https://via.placeholder.com/300x200?text=${fileName}`;

      res.json({
        fileName,
        fileUrl,
        size: "125KB",
        uploadedAt: new Date().toISOString(),
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to upload file" });
    }
  });

  // PDF report generation
  app.get("/api/reports/pdf/:userId", async (req, res) => {
    try {
      const { userId } = req.params;

      // Mock PDF generation
      const reportData = {
        userId,
        generatedAt: new Date().toISOString(),
        metrics: {
          messages: 245,
          leads: 32,
          appointments: 18,
          revenue: 2850,
        },
        downloadUrl: `https://via.placeholder.com/600x400/blue/white?text=PDF+Report+${userId}`,
      };

      res.json(reportData);
    } catch (error) {
      res.status(500).json({ error: "Failed to generate report" });
    }
  });

  // Chat AI endpoint
  app.post("/api/chat/ai", async (req, res) => {
    try {
      const { message, context } = req.body;

      // Mock AI response
      const responses = [
        "Olá! Como posso ajudar você hoje?",
        "Entendi sua pergunta. Vamos resolver isso juntos!",
        "Excelente pergunta! Nossa plataforma pode fazer isso automaticamente.",
        "Ficou alguma dúvida? Estou aqui para ajudar!",
        "Que legal! Você vai amar os resultados da automação.",
      ];

      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      res.json({
        response: randomResponse,
        timestamp: new Date().toISOString(),
        context: "chat",
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to get AI response" });
    }
  });

  // Stripe webhook (for payment processing)
  app.post(
    "/api/webhooks/stripe",
    express.raw({ type: "application/json" }),
    (req, res) => {
      try {
        // In a real implementation, verify Stripe signature and process events
        console.log("Stripe webhook received");
        res.status(200).send("Webhook processed");
      } catch (error) {
        res.status(400).send("Webhook error");
      }
    },
  );

  // Original demo route
  app.get("/api/demo", handleDemoRoute);

  // Serve React app in production
  const isProduction = process.env.NODE_ENV === "production";
  if (isProduction) {
    app.use(express.static(path.join(__dirname, "../dist/spa")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../dist/spa/index.html"));
    });
  }

  return app;
}

// Start server if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const app = createServer();
  const port = process.env.PORT || 3001;

  app.listen(port, () => {
    console.log(`🚀 AutoBiz API server running on port ${port}`);
    console.log(
      `📊 Admin panel: http://localhost:3000/admin?token=admin-secret-2024`,
    );
    console.log(`🤖 N8N: http://localhost:5678`);
    console.log(`🗄️ PgAdmin: http://localhost:5050`);
  });
}

import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UserPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  businessType?: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

// Register new user
export const handleRegister: RequestHandler = async (req, res) => {
  try {
    const { name, email, phone, company, businessType, password }: UserPayload =
      req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user with 7-day trial
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 7);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        company,
        businessType,
        password: hashedPassword,
        trialEndsAt,
        plan: "FREE",
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    );

    // Create initial N8N workflow for the user
    try {
      await createUserWorkflow(user.id, {
        businessName: company || name,
        businessType: businessType || "Geral",
        userEmail: email,
      });
    } catch (error) {
      console.error("Failed to create N8N workflow:", error);
      // Don't fail registration if N8N setup fails
    }

    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        trialEndsAt: user.trialEndsAt,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Login user
export const handleLogin: RequestHandler = async (req, res) => {
  try {
    const { email, password }: LoginPayload = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        trialEndsAt: user.trialEndsAt,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get current user
export const handleGetUser: RequestHandler = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        plan: true,
        trialEndsAt: true,
        whatsappConnected: true,
        emailConnected: true,
        calendarConnected: true,
        company: true,
        businessType: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};

// Google OAuth callback
export const handleGoogleCallback: RequestHandler = async (req, res) => {
  try {
    // In a real implementation, handle Google OAuth flow
    // For now, this is a placeholder
    res.redirect("/dashboard?oauth=success");
  } catch (error) {
    console.error("Google OAuth error:", error);
    res.redirect("/login?error=oauth_failed");
  }
};

// Helper function to create N8N workflow for new user
async function createUserWorkflow(
  userId: string,
  userData: {
    businessName: string;
    businessType: string;
    userEmail: string;
  },
) {
  try {
    const workflowTemplate = {
      name: `AutoBiz - ${userData.businessName}`,
      nodes: [
        // Simplified workflow creation
        // In a real implementation, this would be more complex
      ],
    };

    // Make API call to N8N to create workflow
    const response = await fetch(`${process.env.N8N_API_URL}/workflows`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.N8N_AUTH_TOKEN}`,
      },
      body: JSON.stringify(workflowTemplate),
    });

    if (response.ok) {
      const workflow = await response.json();

      // Update user with workflow ID
      await prisma.user.update({
        where: { id: userId },
        data: { workflowId: workflow.id },
      });
    }
  } catch (error) {
    console.error("N8N workflow creation failed:", error);
    throw error;
  }
}

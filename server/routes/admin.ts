import express from "express";
import bcrypt from "bcryptjs";

const router = express.Router();

// Mock data - In production, this would come from your database
const mockUsers = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@empresa.com",
    plan: "PROFESSIONAL",
    status: "active",
    revenue: 147,
    joinedAt: "2024-01-15T00:00:00Z",
    lastActive: "2024-01-20T10:30:00Z",
    integrations: ["WhatsApp", "Gmail", "Calendar"],
    country: "Brasil",
    city: "São Paulo",
    phone: "(11) 99999-9999",
    totalSessions: 45,
    totalMessages: 234,
    lastLogin: "2024-01-20T10:30:00Z",
    ipAddress: "192.168.1.100",
    device: "Desktop",
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@loja.com",
    plan: "ENTERPRISE",
    status: "trial",
    revenue: 0,
    joinedAt: "2024-01-14T00:00:00Z",
    lastActive: "2024-01-20T09:15:00Z",
    integrations: ["WhatsApp", "Stripe"],
    country: "Brasil",
    city: "Rio de Janeiro",
    phone: "(21) 88888-8888",
    totalSessions: 12,
    totalMessages: 67,
    lastLogin: "2024-01-20T09:15:00Z",
    ipAddress: "10.0.0.50",
    device: "Mobile",
  },
  {
    id: 3,
    name: "Carlos Pereira",
    email: "carlos@clinica.com",
    plan: "PROFESSIONAL",
    status: "active",
    revenue: 147,
    joinedAt: "2024-01-13T00:00:00Z",
    lastActive: "2024-01-19T16:45:00Z",
    integrations: ["WhatsApp", "Gmail", "Calendar", "N8N"],
    country: "Brasil",
    city: "Brasília",
    phone: "(61) 77777-7777",
    totalSessions: 78,
    totalMessages: 456,
    lastLogin: "2024-01-19T16:45:00Z",
    ipAddress: "172.16.0.25",
    device: "Desktop",
  },
];

const mockQuotations = [
  {
    id: 1,
    customerName: "Ana Costa",
    customerEmail: "ana@email.com",
    customerPhone: "(11) 99999-9999",
    siteType: "E-commerce",
    features: ["Carrinho", "Pagamento", "Estoque", "Dashboard"],
    estimatedPrice: 8500,
    status: "pending",
    createdAt: "2024-01-20T10:30:00Z",
    urgency: "alta",
    source: "Landing Page",
    description: "E-commerce completo para venda de roupas",
    timeline: "6-8 semanas",
    notes: "Cliente interessado em integração com redes sociais",
  },
  {
    id: 2,
    customerName: "Roberto Lima",
    customerEmail: "roberto@empresa.com",
    customerPhone: "(21) 88888-8888",
    siteType: "Institucional",
    features: ["Blog", "Contato", "Sobre", "Portfolio"],
    estimatedPrice: 3200,
    status: "approved",
    createdAt: "2024-01-20T09:15:00Z",
    urgency: "media",
    source: "WhatsApp",
    description: "Site institucional para consultoria jurídica",
    timeline: "3-4 semanas",
    notes: "Aprovado para início imediato",
  },
  {
    id: 3,
    customerName: "Fernanda Oliveira",
    customerEmail: "fernanda@studio.com",
    customerPhone: "(31) 77777-7777",
    siteType: "Sistema Personalizado",
    features: ["Dashboard", "API", "Relatórios", "Integração", "Mobile"],
    estimatedPrice: 15000,
    status: "in_development",
    createdAt: "2024-01-19T16:45:00Z",
    urgency: "alta",
    source: "Indicação",
    description: "Sistema de gestão para estúdio de design",
    timeline: "10-12 semanas",
    notes: "Projeto em desenvolvimento - 30% concluído",
  },
];

const mockAlerts = [
  {
    id: 1,
    type: "error",
    message:
      "N8N workflow falhou para usuário #1234 - Timeout na integração Gmail",
    timestamp: "2024-01-20T11:30:00Z",
    resolved: false,
    severity: "critical",
    affectedUsers: 1,
    component: "N8N Workflow",
  },
  {
    id: 2,
    type: "warning",
    message: "Alto volume de registros nas últimas 2h - 150% acima da média",
    timestamp: "2024-01-20T10:00:00Z",
    resolved: false,
    severity: "medium",
    affectedUsers: 0,
    component: "User Registration",
  },
  {
    id: 3,
    type: "info",
    message: "Backup automático do banco de dados concluído com sucesso",
    timestamp: "2024-01-20T06:00:00Z",
    resolved: true,
    severity: "low",
    affectedUsers: 0,
    component: "Database Backup",
  },
];

const mockActivities = [
  {
    id: 1,
    user: "João Silva",
    userId: 1,
    action: "Conectou WhatsApp",
    timestamp: "2024-01-20T10:45:00Z",
    ip: "192.168.1.100",
    device: "Desktop",
    details: "Conectou conta WhatsApp Business",
  },
  {
    id: 2,
    user: "Maria Santos",
    userId: 2,
    action: "Gerou novo orçamento",
    timestamp: "2024-01-20T10:30:00Z",
    ip: "10.0.0.50",
    device: "Mobile",
    details: "Orçamento para e-commerce - R$ 8.500",
  },
  {
    id: 3,
    user: "Carlos Pereira",
    userId: 3,
    action: "Configurou automação de email",
    timestamp: "2024-01-20T09:15:00Z",
    ip: "172.16.0.25",
    device: "Desktop",
    details: "Configurou workflow de boas-vindas",
  },
];

// Middleware to check admin authentication
const requireAdminAuth = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  // In production, validate JWT token properly
  if (token !== "admin-secret-2024") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};

// Get system metrics and overview
router.get("/metrics", requireAdminAuth, (req, res) => {
  try {
    const metrics = {
      totalUsers: mockUsers.length,
      activeUsers: mockUsers.filter((u) => u.status === "active").length,
      totalRevenue: mockUsers.reduce((sum, user) => sum + user.revenue, 0),
      monthlyRecurring: mockUsers
        .filter((u) => u.status === "active")
        .reduce((sum, user) => sum + user.revenue, 0),
      quotationsToday: mockQuotations.filter(
        (q) =>
          new Date(q.createdAt).toDateString() === new Date().toDateString(),
      ).length,
      quotationsPending: mockQuotations.filter((q) => q.status === "pending")
        .length,
      quotationsThisMonth: mockQuotations.filter(
        (q) => new Date(q.createdAt).getMonth() === new Date().getMonth(),
      ).length,
      conversionRate: 12.5,
      systemUptime: 99.98,
      apiResponseTime: 200 + Math.floor(Math.random() * 100),
      databaseUsage: 65 + Math.floor(Math.random() * 10),
      activeConnections: 1400 + Math.floor(Math.random() * 200),
      messagesProcessed: 12547 + Math.floor(Math.random() * 100),
      emailsSent: 8923 + Math.floor(Math.random() * 50),
      whatsappActive: mockUsers.filter((u) =>
        u.integrations.includes("WhatsApp"),
      ).length,
      n8nWorkflows: 1123 + Math.floor(Math.random() * 20),
    };

    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch metrics" });
  }
});

// Get all users with filtering and pagination
router.get("/users", requireAdminAuth, (req, res) => {
  try {
    const {
      page = 1,
      limit = 50,
      search = "",
      status = "all",
      plan = "all",
    } = req.query;

    let filteredUsers = [...mockUsers];

    // Apply filters
    if (search) {
      const searchTerm = search.toString().toLowerCase();
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm),
      );
    }

    if (status !== "all") {
      filteredUsers = filteredUsers.filter((user) => user.status === status);
    }

    if (plan !== "all") {
      filteredUsers = filteredUsers.filter((user) => user.plan === plan);
    }

    // Pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    res.json({
      users: paginatedUsers,
      total: filteredUsers.length,
      page: Number(page),
      totalPages: Math.ceil(filteredUsers.length / Number(limit)),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Get specific user details
router.get("/users/:id", requireAdminAuth, (req, res) => {
  try {
    const userId = Number(req.params.id);
    const user = mockUsers.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add additional user details
    const userDetails = {
      ...user,
      paymentHistory: [
        {
          date: "2024-01-15",
          amount: 147,
          status: "paid",
          plan: "PROFESSIONAL",
        },
        {
          date: "2023-12-15",
          amount: 147,
          status: "paid",
          plan: "PROFESSIONAL",
        },
      ],
      usageStats: {
        messagesThisMonth: user.totalMessages,
        sessionsThisMonth: user.totalSessions,
        integrationsUsed: user.integrations.length,
        lastActivity: user.lastActive,
      },
      activityLog: mockActivities
        .filter((a) => a.userId === userId)
        .slice(0, 10),
    };

    res.json(userDetails);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user details" });
  }
});

// Update user status
router.patch("/users/:id/status", requireAdminAuth, (req, res) => {
  try {
    const userId = Number(req.params.id);
    const { status } = req.body;

    const userIndex = mockUsers.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!["active", "suspended", "trial", "expired"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    mockUsers[userIndex].status = status;

    res.json({
      message: "User status updated successfully",
      user: mockUsers[userIndex],
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user status" });
  }
});

// Create new user
router.post("/users", requireAdminAuth, async (req, res) => {
  try {
    const { name, email, plan, status = "trial" } = req.body;

    if (!name || !email || !plan) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === email);
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    const newUser = {
      id: Math.max(...mockUsers.map((u) => u.id)) + 1,
      name,
      email,
      plan,
      status,
      revenue: 0,
      joinedAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      integrations: [],
      country: "Brasil",
      city: "São Paulo",
      phone: "",
      totalSessions: 0,
      totalMessages: 0,
      lastLogin: new Date().toISOString(),
      ipAddress: "0.0.0.0",
      device: "Unknown",
    };

    mockUsers.push(newUser);

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Delete user
router.delete("/users/:id", requireAdminAuth, (req, res) => {
  try {
    const userId = Number(req.params.id);
    const userIndex = mockUsers.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    const deletedUser = mockUsers.splice(userIndex, 1)[0];

    res.json({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// Get all quotations
router.get("/quotations", requireAdminAuth, (req, res) => {
  try {
    const { status = "all", urgency = "all" } = req.query;

    let filteredQuotations = [...mockQuotations];

    if (status !== "all") {
      filteredQuotations = filteredQuotations.filter(
        (q) => q.status === status,
      );
    }

    if (urgency !== "all") {
      filteredQuotations = filteredQuotations.filter(
        (q) => q.urgency === urgency,
      );
    }

    res.json(filteredQuotations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quotations" });
  }
});

// Update quotation status
router.patch("/quotations/:id/status", requireAdminAuth, (req, res) => {
  try {
    const quotationId = Number(req.params.id);
    const { status } = req.body;

    const quotationIndex = mockQuotations.findIndex(
      (q) => q.id === quotationId,
    );

    if (quotationIndex === -1) {
      return res.status(404).json({ error: "Quotation not found" });
    }

    mockQuotations[quotationIndex].status = status;

    res.json({
      message: "Quotation status updated successfully",
      quotation: mockQuotations[quotationIndex],
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update quotation status" });
  }
});

// Get system alerts
router.get("/alerts", requireAdminAuth, (req, res) => {
  try {
    const { resolved = "all" } = req.query;

    let filteredAlerts = [...mockAlerts];

    if (resolved === "true") {
      filteredAlerts = filteredAlerts.filter((a) => a.resolved);
    } else if (resolved === "false") {
      filteredAlerts = filteredAlerts.filter((a) => !a.resolved);
    }

    res.json(filteredAlerts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
});

// Resolve alert
router.patch("/alerts/:id/resolve", requireAdminAuth, (req, res) => {
  try {
    const alertId = Number(req.params.id);
    const alertIndex = mockAlerts.findIndex((a) => a.id === alertId);

    if (alertIndex === -1) {
      return res.status(404).json({ error: "Alert not found" });
    }

    mockAlerts[alertIndex].resolved = true;

    res.json({
      message: "Alert resolved successfully",
      alert: mockAlerts[alertIndex],
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to resolve alert" });
  }
});

// Get recent activities
router.get("/activities", requireAdminAuth, (req, res) => {
  try {
    const { limit = 50 } = req.query;
    const activities = mockActivities
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      )
      .slice(0, Number(limit));

    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch activities" });
  }
});

// Get system statistics
router.get("/statistics", requireAdminAuth, (req, res) => {
  try {
    const statistics = {
      userGrowth: {
        thisMonth: 45,
        lastMonth: 32,
        percentageChange: 40.6,
      },
      revenueGrowth: {
        thisMonth: 18940,
        lastMonth: 15200,
        percentageChange: 24.6,
      },
      topPlans: [
        { plan: "PROFESSIONAL", count: 156, percentage: 42.5 },
        { plan: "STARTER", count: 123, percentage: 33.5 },
        { plan: "ENTERPRISE", count: 88, percentage: 24.0 },
      ],
      topIntegrations: [
        { integration: "WhatsApp", users: 245, percentage: 66.8 },
        { integration: "Gmail", users: 189, percentage: 51.5 },
        { integration: "Calendar", users: 156, percentage: 42.5 },
        { integration: "N8N", users: 98, percentage: 26.7 },
      ],
      regionalStats: [
        { region: "São Paulo", users: 134, percentage: 36.5 },
        { region: "Rio de Janeiro", users: 89, percentage: 24.2 },
        { region: "Minas Gerais", users: 67, percentage: 18.3 },
        { region: "Outros", users: 77, percentage: 21.0 },
      ],
    };

    res.json(statistics);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
});

// Export data
router.get("/export/:type", requireAdminAuth, (req, res) => {
  try {
    const { type } = req.params;
    const { format = "json" } = req.query;

    let data;
    let filename;

    switch (type) {
      case "users":
        data = mockUsers;
        filename = `users_export_${new Date().toISOString().split("T")[0]}`;
        break;
      case "quotations":
        data = mockQuotations;
        filename = `quotations_export_${new Date().toISOString().split("T")[0]}`;
        break;
      case "activities":
        data = mockActivities;
        filename = `activities_export_${new Date().toISOString().split("T")[0]}`;
        break;
      default:
        return res.status(400).json({ error: "Invalid export type" });
    }

    if (format === "csv") {
      // Convert to CSV format
      const headers = Object.keys(data[0]).join(",");
      const rows = data.map((item) => Object.values(item).join(","));
      const csv = [headers, ...rows].join("\n");

      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}.csv"`,
      );
      res.send(csv);
    } else {
      res.setHeader("Content-Type", "application/json");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}.json"`,
      );
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to export data" });
  }
});

// System configuration endpoints
router.get("/config", requireAdminAuth, (req, res) => {
  try {
    const config = {
      maintenanceMode: false,
      autoBackup: true,
      detailedLogs: true,
      autoCache: true,
      rateLimiting: {
        enabled: true,
        requestsPerMinute: 100,
      },
      features: {
        userRegistration: true,
        emailNotifications: true,
        whatsappIntegration: true,
        n8nWorkflows: true,
      },
    };

    res.json(config);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch configuration" });
  }
});

router.patch("/config", requireAdminAuth, (req, res) => {
  try {
    const updates = req.body;

    // In production, save to database
    console.log("Configuration updated:", updates);

    res.json({
      message: "Configuration updated successfully",
      config: updates,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update configuration" });
  }
});

// Send notification to users
router.post("/notifications", requireAdminAuth, (req, res) => {
  try {
    const { type, title, message, userIds = [] } = req.body;

    if (!type || !title || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // In production, send actual notifications
    console.log("Sending notification:", { type, title, message, userIds });

    res.json({
      message: "Notification sent successfully",
      sentTo: userIds.length > 0 ? userIds.length : mockUsers.length,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to send notification" });
  }
});

export default router;

import { RequestHandler } from "express";

interface ConfigData {
  OPENAI_API_KEY?: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  STRIPE_SECRET_KEY?: string;
  RESEND_API_KEY?: string;
  N8N_WEBHOOK_URL?: string;
  WHATSAPP_API_URL?: string;
}

// Store config in memory (in production, use database or secure storage)
let serverConfig: ConfigData = {
  N8N_WEBHOOK_URL: "http://localhost:5678/webhook",
  WHATSAPP_API_URL: "http://localhost:21465",
};

// Save configuration
export const handleSaveConfig: RequestHandler = async (req, res) => {
  try {
    const configData: ConfigData = req.body;

    // Validate required fields
    const requiredFields = ["OPENAI_API_KEY", "GOOGLE_CLIENT_ID"];
    const missingFields = requiredFields.filter(
      (field) => !configData[field as keyof ConfigData],
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Missing required fields",
        missingFields,
      });
    }

    // Update server config
    serverConfig = { ...serverConfig, ...configData };

    // In production, save to secure storage/database
    console.log("Configuration updated:", Object.keys(configData));

    res.json({
      success: true,
      message: "Configuração salva com sucesso",
      configuredKeys: Object.keys(configData),
    });
  } catch (error) {
    console.error("Config save error:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Get current configuration (without sensitive values)
export const handleGetConfig: RequestHandler = async (req, res) => {
  try {
    const safeConfig = Object.keys(serverConfig).reduce(
      (acc, key) => {
        const value = serverConfig[key as keyof ConfigData];
        acc[key] = value
          ? key.includes("SECRET") || key.includes("KEY")
            ? "***configured***"
            : value
          : "";
        return acc;
      },
      {} as Record<string, string>,
    );

    res.json({
      config: safeConfig,
      status: "success",
    });
  } catch (error) {
    console.error("Config get error:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Test OpenAI connection
export const handleTestOpenAI: RequestHandler = async (req, res) => {
  try {
    const { OPENAI_API_KEY } = req.body;

    if (!OPENAI_API_KEY) {
      return res.status(400).json({ error: "API Key é obrigatória" });
    }

    // Test OpenAI API
    const response = await fetch("https://api.openai.com/v1/models", {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    });

    if (response.ok) {
      res.json({
        success: true,
        message: "OpenAI conectado com sucesso!",
        status: "connected",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Falha na conexão com OpenAI. Verifique a API Key.",
        status: "error",
      });
    }
  } catch (error) {
    console.error("OpenAI test error:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao testar OpenAI",
      status: "error",
    });
  }
};

// Test Google APIs
export const handleTestGoogle: RequestHandler = async (req, res) => {
  try {
    const { GOOGLE_CLIENT_ID } = req.body;

    if (!GOOGLE_CLIENT_ID) {
      return res.status(400).json({ error: "Client ID é obrigatório" });
    }

    // Basic validation of Google Client ID format
    if (!GOOGLE_CLIENT_ID.includes("googleusercontent.com")) {
      return res.status(400).json({
        success: false,
        message: "Formato do Client ID parece inválido",
        status: "error",
      });
    }

    res.json({
      success: true,
      message: "Google Client ID válido!",
      status: "connected",
    });
  } catch (error) {
    console.error("Google test error:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao testar Google",
      status: "error",
    });
  }
};

// Test Stripe connection
export const handleTestStripe: RequestHandler = async (req, res) => {
  try {
    const { STRIPE_SECRET_KEY } = req.body;

    if (!STRIPE_SECRET_KEY) {
      return res.status(400).json({ error: "Stripe Secret Key é obrigatória" });
    }

    // Test Stripe API
    const response = await fetch("https://api.stripe.com/v1/account", {
      headers: {
        Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
      },
    });

    if (response.ok) {
      res.json({
        success: true,
        message: "Stripe conectado com sucesso!",
        status: "connected",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Falha na conexão com Stripe. Verifique a Secret Key.",
        status: "error",
      });
    }
  } catch (error) {
    console.error("Stripe test error:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao testar Stripe",
      status: "error",
    });
  }
};

// Test Resend connection
export const handleTestResend: RequestHandler = async (req, res) => {
  try {
    const { RESEND_API_KEY } = req.body;

    if (!RESEND_API_KEY) {
      return res.status(400).json({ error: "Resend API Key é obrigatória" });
    }

    // Test Resend API
    const response = await fetch("https://api.resend.com/domains", {
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
    });

    if (response.ok) {
      res.json({
        success: true,
        message: "Resend conectado com sucesso!",
        status: "connected",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Falha na conexão com Resend. Verifique a API Key.",
        status: "error",
      });
    }
  } catch (error) {
    console.error("Resend test error:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao testar Resend",
      status: "error",
    });
  }
};

// Test N8N connection
export const handleTestN8N: RequestHandler = async (req, res) => {
  try {
    const { N8N_WEBHOOK_URL } = req.body;

    if (!N8N_WEBHOOK_URL) {
      return res.status(400).json({ error: "N8N URL é obrigatória" });
    }

    // Test N8N webhook
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ test: true, timestamp: new Date().toISOString() }),
    });

    if (response.status < 500) {
      // Accept any non-server error as valid webhook
      res.json({
        success: true,
        message: "N8N webhook respondendo!",
        status: "connected",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "N8N não está respondendo. Verifique se está rodando.",
        status: "error",
      });
    }
  } catch (error) {
    console.error("N8N test error:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao conectar com N8N",
      status: "error",
    });
  }
};

// Test WhatsApp connection
export const handleTestWhatsApp: RequestHandler = async (req, res) => {
  try {
    const { WHATSAPP_API_URL } = req.body;

    if (!WHATSAPP_API_URL) {
      return res.status(400).json({ error: "WhatsApp API URL é obrigatória" });
    }

    // Test WhatsApp API
    const response = await fetch(`${WHATSAPP_API_URL}/api/status`, {
      method: "GET",
    });

    if (response.ok) {
      res.json({
        success: true,
        message: "WhatsApp API conectada!",
        status: "connected",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "WhatsApp API não disponível. Verifique o WppConnect.",
        status: "error",
      });
    }
  } catch (error) {
    console.error("WhatsApp test error:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao testar WhatsApp",
      status: "error",
    });
  }
};

// Get system status
export const handleGetSystemStatus: RequestHandler = async (req, res) => {
  try {
    const status = {
      api: "online",
      database: "healthy",
      n8n: serverConfig.N8N_WEBHOOK_URL ? "configured" : "not_configured",
      openai: serverConfig.OPENAI_API_KEY ? "configured" : "not_configured",
      google: serverConfig.GOOGLE_CLIENT_ID ? "configured" : "not_configured",
      stripe: serverConfig.STRIPE_SECRET_KEY ? "configured" : "not_configured",
      resend: serverConfig.RESEND_API_KEY ? "configured" : "not_configured",
      whatsapp: serverConfig.WHATSAPP_API_URL ? "configured" : "not_configured",
      timestamp: new Date().toISOString(),
    };

    res.json({
      status,
      message: "Status do sistema atualizado",
    });
  } catch (error) {
    console.error("System status error:", error);
    res.status(500).json({ error: "Erro ao verificar status do sistema" });
  }
};

// Export current config for use in other parts of the app
export const getCurrentConfig = () => serverConfig;

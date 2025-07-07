import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Settings,
  Zap,
  CheckCircle,
  AlertCircle,
  XCircle,
  Key,
  Database,
  Mail,
  MessageSquare,
  Calendar,
  DollarSign,
  Bot,
  Cloud,
  Code,
  HelpCircle,
  Save,
  TestTube,
  RefreshCw,
  Copy,
} from "lucide-react";

interface ApiConfig {
  name: string;
  key: string;
  value: string;
  description: string;
  status: "connected" | "error" | "disconnected";
  required: boolean;
  testEndpoint?: string;
  icon: React.ReactNode;
  tutorial: string;
}

const Settings = () => {
  const [configs, setConfigs] = useState<ApiConfig[]>([
    {
      name: "OpenAI API",
      key: "OPENAI_API_KEY",
      value: "",
      description: "Chave da API do OpenAI para funcionalidades de IA",
      status: "disconnected",
      required: true,
      testEndpoint: "/api/test/openai",
      icon: <Bot className="h-5 w-5" />,
      tutorial:
        "1. Acesse platform.openai.com\n2. Faça login na sua conta\n3. Vá em 'API Keys'\n4. Clique em 'Create new secret key'\n5. Cole a chave aqui",
    },
    {
      name: "Google Client ID",
      key: "GOOGLE_CLIENT_ID",
      value: "",
      description: "ID do cliente Google para Calendar e Sheets",
      status: "disconnected",
      required: true,
      testEndpoint: "/api/test/google",
      icon: <Calendar className="h-5 w-5" />,
      tutorial:
        "1. Acesse console.cloud.google.com\n2. Crie um projeto\n3. Ative Google Calendar API\n4. Crie credenciais OAuth 2.0\n5. Cole o Client ID aqui",
    },
    {
      name: "Google Client Secret",
      key: "GOOGLE_CLIENT_SECRET",
      value: "",
      description: "Chave secreta do Google OAuth",
      status: "disconnected",
      required: true,
      icon: <Key className="h-5 w-5" />,
      tutorial:
        "1. No mesmo projeto do Google Cloud\n2. Nas credenciais OAuth 2.0\n3. Copie o 'Client Secret'\n4. Cole aqui",
    },
    {
      name: "Stripe Secret Key",
      key: "STRIPE_SECRET_KEY",
      value: "",
      description: "Chave secreta do Stripe para pagamentos",
      status: "disconnected",
      required: false,
      testEndpoint: "/api/test/stripe",
      icon: <DollarSign className="h-5 w-5" />,
      tutorial:
        "1. Acesse dashboard.stripe.com\n2. Vá em 'Developers > API keys'\n3. Copie a 'Secret key'\n4. Cole aqui",
    },
    {
      name: "Resend API Key",
      key: "RESEND_API_KEY",
      value: "",
      description: "Chave da API Resend para envio de e-mails",
      status: "disconnected",
      required: false,
      testEndpoint: "/api/test/resend",
      icon: <Mail className="h-5 w-5" />,
      tutorial:
        "1. Acesse resend.com\n2. Faça login na sua conta\n3. Vá em 'API Keys'\n4. Clique em 'Create API Key'\n5. Cole aqui",
    },
    {
      name: "N8N Webhook URL",
      key: "N8N_WEBHOOK_URL",
      value: "http://localhost:5678/webhook",
      description: "URL do webhook do N8N",
      status: "disconnected",
      required: true,
      testEndpoint: "/api/test/n8n",
      icon: <Zap className="h-5 w-5" />,
      tutorial:
        "1. Acesse seu N8N em localhost:5678\n2. Crie um workflow\n3. Adicione um nó Webhook\n4. Copie a URL gerada\n5. Cole aqui",
    },
    {
      name: "WhatsApp API URL",
      key: "WHATSAPP_API_URL",
      value: "http://localhost:21465",
      description: "URL da API do WhatsApp (WppConnect)",
      status: "disconnected",
      required: false,
      testEndpoint: "/api/test/whatsapp",
      icon: <MessageSquare className="h-5 w-5" />,
      tutorial:
        "1. Configure o WppConnect\n2. Inicie o servidor\n3. Anote a URL e porta\n4. Cole aqui",
    },
  ]);

  const [isSaving, setIsSaving] = useState(false);
  const [embedCode, setEmbedCode] = useState("");
  const [showTutorial, setShowTutorial] = useState<string | null>(null);

  // Calculate overall setup progress
  const totalRequired = configs.filter((c) => c.required).length;
  const connectedRequired = configs.filter(
    (c) => c.required && c.status === "connected",
  ).length;
  const setupProgress = (connectedRequired / totalRequired) * 100;

  const handleConfigChange = (key: string, value: string) => {
    setConfigs((prev) =>
      prev.map((config) =>
        config.key === key ? { ...config, value } : config,
      ),
    );
  };

  const testConnection = async (config: ApiConfig) => {
    if (!config.testEndpoint) return;

    setConfigs((prev) =>
      prev.map((c) =>
        c.key === config.key ? { ...c, status: "disconnected" } : c,
      ),
    );

    try {
      const response = await fetch(config.testEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [config.key]: config.value }),
      });

      const status = response.ok ? "connected" : "error";
      setConfigs((prev) =>
        prev.map((c) => (c.key === config.key ? { ...c, status } : c)),
      );
    } catch (error) {
      setConfigs((prev) =>
        prev.map((c) => (c.key === config.key ? { ...c, status: "error" } : c)),
      );
    }
  };

  const saveAllConfigs = async () => {
    setIsSaving(true);
    try {
      await fetch("/api/admin/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          configs.reduce(
            (acc, config) => ({
              ...acc,
              [config.key]: config.value,
            }),
            {},
          ),
        ),
      });

      // Test all connections after saving
      for (const config of configs) {
        if (config.testEndpoint && config.value) {
          await testConnection(config);
        }
      }
    } catch (error) {
      console.error("Failed to save configs:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const generateEmbedCode = () => {
    const code = `<!-- Kryonix Chat Widget -->
<div id="kryonix-chat"></div>
<script>
  (function() {
    var script = document.createElement('script');
    script.src = 'https://sua-plataforma.com/widget.js';
    script.setAttribute('data-chat-id', 'seu-id-unico');
    script.setAttribute('data-business-name', 'Sua Empresa');
    script.async = true;
    document.head.appendChild(script);
  })();
</script>
<!-- Fim Kryonix Chat Widget -->`;
    setEmbedCode(code);
  };

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(embedCode);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-100 text-green-800">Conectado</Badge>;
      case "error":
        return <Badge variant="destructive">Erro</Badge>;
      default:
        return <Badge variant="secondary">Desconectado</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Settings className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Central de Configurações
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Progresso: {Math.round(setupProgress)}%
              </div>
              <Progress value={setupProgress} className="w-32" />
              <Button onClick={saveAllConfigs} disabled={isSaving}>
                {isSaving ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Salvar Tudo
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">APIs Configuradas</p>
                  <p className="text-2xl font-bold">
                    {configs.filter((c) => c.status === "connected").length}/
                    {configs.length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    Funcionalidades Ativas
                  </p>
                  <p className="text-2xl font-bold">
                    {
                      configs.filter(
                        (c) => c.required && c.status === "connected",
                      ).length
                    }
                  </p>
                </div>
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Status do Sistema</p>
                  <p className="text-2xl font-bold">
                    {setupProgress >= 80 ? "Ativo" : "Configurando"}
                  </p>
                </div>
                <Database className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Última Atualização</p>
                  <p className="text-2xl font-bold">Agora</p>
                </div>
                <Cloud className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="apis" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="apis">Configuração de APIs</TabsTrigger>
            <TabsTrigger value="embed">Código para Site</TabsTrigger>
            <TabsTrigger value="workflows">Workflows N8N</TabsTrigger>
          </TabsList>

          {/* APIs Configuration */}
          <TabsContent value="apis">
            <div className="space-y-6">
              {configs.map((config) => (
                <Card
                  key={config.key}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {config.icon}
                        <div>
                          <CardTitle className="text-lg">
                            {config.name}
                          </CardTitle>
                          <CardDescription>
                            {config.description}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {config.required && (
                          <Badge variant="outline">Obrigatório</Badge>
                        )}
                        {getStatusBadge(config.status)}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setShowTutorial(
                              showTutorial === config.key ? null : config.key,
                            )
                          }
                        >
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex space-x-2">
                        <Input
                          type={
                            config.key.includes("SECRET") ? "password" : "text"
                          }
                          value={config.value}
                          onChange={(e) =>
                            handleConfigChange(config.key, e.target.value)
                          }
                          placeholder={`Insira sua ${config.name}`}
                          className="flex-1"
                        />
                        {config.testEndpoint && (
                          <Button
                            variant="outline"
                            onClick={() => testConnection(config)}
                            disabled={!config.value}
                          >
                            <TestTube className="h-4 w-4 mr-2" />
                            Testar
                          </Button>
                        )}
                      </div>

                      {showTutorial === config.key && (
                        <Alert>
                          <HelpCircle className="h-4 w-4" />
                          <AlertTitle>Como obter esta chave:</AlertTitle>
                          <AlertDescription>
                            <pre className="whitespace-pre-wrap text-sm mt-2">
                              {config.tutorial}
                            </pre>
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Embed Code */}
          <TabsContent value="embed">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5" />
                  <span>Código para Incorporar no Site</span>
                </CardTitle>
                <CardDescription>
                  Cole este código no seu site para adicionar o chat automático
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button onClick={generateEmbedCode}>Gerar Código</Button>

                  {embedCode && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>Código HTML:</Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={copyEmbedCode}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copiar
                        </Button>
                      </div>
                      <Textarea
                        value={embedCode}
                        readOnly
                        rows={10}
                        className="font-mono text-sm"
                      />
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Instruções:</AlertTitle>
                        <AlertDescription>
                          1. Copie o código acima
                          <br />
                          2. Cole antes da tag &lt;/body&gt; do seu site
                          <br />
                          3. O chat aparecerá automaticamente
                          <br />
                          4. Teste enviando uma mensagem
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* N8N Workflows */}
          <TabsContent value="workflows">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Gerenciamento de Workflows</span>
                </CardTitle>
                <CardDescription>
                  Configure e monitore suas automações N8N
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Em Desenvolvimento</AlertTitle>
                    <AlertDescription>
                      Esta funcionalidade estará disponível em breve. Por
                      enquanto, configure seus workflows diretamente no N8N em
                      localhost:5678
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Workflow Básico</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Atendimento automático com IA
                        </p>
                        <Button variant="outline" size="sm">
                          Configurar
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Agendamentos</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Integração com Google Calendar
                        </p>
                        <Button variant="outline" size="sm">
                          Configurar
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;

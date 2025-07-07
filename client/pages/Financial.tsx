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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  DollarSign,
  Calendar,
  MessageSquare,
  Zap,
  Settings,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Eye,
  EyeOff,
  RefreshCw,
  Server,
  Database,
  Globe,
} from "lucide-react";

interface Client {
  id: string;
  name: string;
  email: string;
  plan: string;
  status: "ACTIVE" | "EXPIRED" | "SUSPENDED";
  expiresAt: string;
  services: {
    whatsapp: boolean;
    n8n: boolean;
    calendar: boolean;
  };
  monthlyValue: number;
  lastPayment: string;
}

interface N8NConfig {
  serverUrl: string;
  apiKey: string;
  webhookBaseUrl: string;
  timeout: number;
  status: "ACTIVE" | "INACTIVE";
}

const Financial = () => {
  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      name: "Siqueira Campos Imóveis",
      email: "admin@siqueicamposimoveis.com.br",
      plan: "ENTERPRISE",
      status: "ACTIVE",
      expiresAt: "2025-08-06",
      services: { whatsapp: true, n8n: true, calendar: true },
      monthlyValue: 197.0,
      lastPayment: "2024-01-06",
    },
    {
      id: "2",
      name: "Imobiliária Demo",
      email: "demo@exemplo.com.br",
      plan: "PROFESSIONAL",
      status: "ACTIVE",
      expiresAt: "2025-07-22",
      services: { whatsapp: true, n8n: true, calendar: false },
      monthlyValue: 147.0,
      lastPayment: "2024-01-22",
    },
    {
      id: "3",
      name: "Imobiliária Teste",
      email: "teste@exemplo.com.br",
      plan: "STARTER",
      status: "EXPIRED",
      expiresAt: "2024-07-02",
      services: { whatsapp: false, n8n: false, calendar: false },
      monthlyValue: 97.0,
      lastPayment: "2024-06-02",
    },
  ]);

  const [n8nConfig, setN8nConfig] = useState<N8NConfig>({
    serverUrl: "https://n8n.siqueicamposimoveis.com.br",
    apiKey: "••••••••••••••••••••••••••••••••••",
    webhookBaseUrl: "https://n8n.siqueicamposimoveis.com.br/webhook",
    timeout: 30,
    status: "INACTIVE",
  });

  const [showApiKey, setShowApiKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Cálculos financeiros
  const totalRevenue = clients.reduce((sum, client) => {
    return client.status === "ACTIVE" ? sum + client.monthlyValue : sum;
  }, 0);

  const activeClients = clients.filter((c) => c.status === "ACTIVE").length;
  const expiredClients = clients.filter((c) => c.status === "EXPIRED").length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <Badge className="bg-green-100 text-green-800">ATIVO</Badge>;
      case "EXPIRED":
        return <Badge variant="destructive">EXPIRADO</Badge>;
      case "SUSPENDED":
        return <Badge variant="secondary">SUSPENSO</Badge>;
      default:
        return <Badge variant="outline">DESCONHECIDO</Badge>;
    }
  };

  const getServiceIcon = (enabled: boolean, type: string) => {
    const iconClass = enabled ? "text-green-600" : "text-gray-400";
    switch (type) {
      case "whatsapp":
        return <MessageSquare className={`h-4 w-4 ${iconClass}`} />;
      case "n8n":
        return <Zap className={`h-4 w-4 ${iconClass}`} />;
      case "calendar":
        return <Calendar className={`h-4 w-4 ${iconClass}`} />;
      default:
        return null;
    }
  };

  const testN8NConnection = async () => {
    setIsLoading(true);
    try {
      // Simular teste de conexão
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setN8nConfig((prev) => ({ ...prev, status: "ACTIVE" }));
    } catch (error) {
      console.error("Erro ao testar conexão N8N:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveN8NConfig = async () => {
    setIsLoading(true);
    try {
      // Simular salvamento
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Configuração salva com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar configuração:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const syncWorkflows = async () => {
    setIsLoading(true);
    try {
      // Simular sincronização
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Workflows sincronizados com sucesso!");
    } catch (error) {
      console.error("Erro ao sincronizar workflows:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <DollarSign className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Controle Financeiro
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800">
                R$ {totalRevenue.toFixed(2).replace(".", ",")} MRR
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Métricas Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Receita Mensal</p>
                  <p className="text-2xl font-bold text-green-600">
                    R$ {totalRevenue.toFixed(2).replace(".", ",")}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Clientes Ativos</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {activeClients}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Clientes Expirados</p>
                  <p className="text-2xl font-bold text-red-600">
                    {expiredClients}
                  </p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Status N8N</p>
                  <p
                    className={`text-2xl font-bold ${
                      n8nConfig.status === "ACTIVE"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {n8nConfig.status}
                  </p>
                </div>
                <Server
                  className={`h-8 w-8 ${
                    n8nConfig.status === "ACTIVE"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="clients" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="clients">Controle de Clientes</TabsTrigger>
            <TabsTrigger value="n8n">Configuração N8N Server</TabsTrigger>
          </TabsList>

          {/* Controle de Clientes */}
          <TabsContent value="clients">
            <Card>
              <CardHeader>
                <CardTitle>Clientes e Assinaturas</CardTitle>
                <CardDescription>
                  Gerencie clientes, planos e status de pagamento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clients.map((client) => (
                    <Card
                      key={client.id}
                      className={`transition-all hover:shadow-md ${
                        client.status === "EXPIRED"
                          ? "border-red-200 bg-red-50"
                          : client.status === "ACTIVE"
                            ? "border-green-200 bg-green-50"
                            : "border-gray-200"
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {client.name}
                              </h3>
                              {getStatusBadge(client.status)}
                            </div>
                            <p className="text-sm text-gray-600 mb-1">
                              {client.email}
                            </p>
                            <p className="text-sm text-gray-500">
                              Expira:{" "}
                              {new Date(client.expiresAt).toLocaleDateString(
                                "pt-BR",
                              )}
                            </p>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="flex space-x-2">
                              <div
                                className="flex items-center space-x-1"
                                title="WhatsApp"
                              >
                                {getServiceIcon(
                                  client.services.whatsapp,
                                  "whatsapp",
                                )}
                                <span className="text-xs">WhatsApp</span>
                              </div>
                              <div
                                className="flex items-center space-x-1"
                                title="N8N"
                              >
                                {getServiceIcon(client.services.n8n, "n8n")}
                                <span className="text-xs">N8N</span>
                              </div>
                              <div
                                className="flex items-center space-x-1"
                                title="Calendar"
                              >
                                {getServiceIcon(
                                  client.services.calendar,
                                  "calendar",
                                )}
                                <span className="text-xs">Calendar</span>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900">
                                R${" "}
                                {client.monthlyValue
                                  .toFixed(2)
                                  .replace(".", ",")}
                              </p>
                              <p className="text-xs text-gray-500">
                                Plano {client.plan}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configuração N8N */}
          <TabsContent value="n8n">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Server className="h-5 w-5" />
                  <span>Configuração N8N Server</span>
                  <Badge
                    variant={
                      n8nConfig.status === "ACTIVE" ? "default" : "destructive"
                    }
                  >
                    {n8nConfig.status}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  O N8N roda em VPS separada para garantir isolamento e controle
                  de pagamento. Configure as credenciais abaixo para integração.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Informação Importante</AlertTitle>
                  <AlertDescription>
                    Os tokens Meta são necessários apenas se usar a integração
                    Meta via N8N. Configure primeiro o servidor básico.
                  </AlertDescription>
                </Alert>

                <Tabs defaultValue="server" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="server">Servidor</TabsTrigger>
                    <TabsTrigger value="apis">APIs</TabsTrigger>
                    <TabsTrigger value="meta">Meta/WhatsApp</TabsTrigger>
                    <TabsTrigger value="workflows">Workflows</TabsTrigger>
                  </TabsList>

                  <TabsContent value="server" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="serverUrl">URL do N8N Server</Label>
                        <Input
                          id="serverUrl"
                          value={n8nConfig.serverUrl}
                          onChange={(e) =>
                            setN8nConfig((prev) => ({
                              ...prev,
                              serverUrl: e.target.value,
                            }))
                          }
                          placeholder="https://n8n.seudominio.com.br"
                        />
                      </div>

                      <div>
                        <Label htmlFor="apiKey">API Key N8N</Label>
                        <div className="flex space-x-2">
                          <Input
                            id="apiKey"
                            type={showApiKey ? "text" : "password"}
                            value={n8nConfig.apiKey}
                            onChange={(e) =>
                              setN8nConfig((prev) => ({
                                ...prev,
                                apiKey: e.target.value,
                              }))
                            }
                            placeholder="Sua API Key do N8N"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowApiKey(!showApiKey)}
                          >
                            {showApiKey ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="webhookUrl">Webhook Base URL</Label>
                        <Input
                          id="webhookUrl"
                          value={n8nConfig.webhookBaseUrl}
                          onChange={(e) =>
                            setN8nConfig((prev) => ({
                              ...prev,
                              webhookBaseUrl: e.target.value,
                            }))
                          }
                          placeholder="https://n8n.seudominio.com.br/webhook"
                        />
                      </div>

                      <div>
                        <Label htmlFor="timeout">Timeout (segundos)</Label>
                        <Input
                          id="timeout"
                          type="number"
                          value={n8nConfig.timeout}
                          onChange={(e) =>
                            setN8nConfig((prev) => ({
                              ...prev,
                              timeout: parseInt(e.target.value) || 30,
                            }))
                          }
                          placeholder="30"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4">
                      <Button
                        onClick={testN8NConnection}
                        disabled={isLoading}
                        className="flex items-center space-x-2"
                      >
                        {isLoading ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <CheckCircle className="h-4 w-4" />
                        )}
                        <span>Testar Conexão</span>
                      </Button>

                      <Button
                        variant="outline"
                        onClick={saveN8NConfig}
                        disabled={isLoading}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Salvar Configuração
                      </Button>

                      <Button
                        variant="outline"
                        onClick={syncWorkflows}
                        disabled={isLoading}
                      >
                        <Database className="h-4 w-4 mr-2" />
                        Sincronizar Workflows
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="apis">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Em Desenvolvimento</AlertTitle>
                      <AlertDescription>
                        Configuração de APIs externas estará disponível em
                        breve.
                      </AlertDescription>
                    </Alert>
                  </TabsContent>

                  <TabsContent value="meta">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Integração Meta</AlertTitle>
                      <AlertDescription>
                        Configure tokens do Facebook e Instagram para automação
                        de posts. Disponível apenas no plano Enterprise.
                      </AlertDescription>
                    </Alert>
                  </TabsContent>

                  <TabsContent value="workflows">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Gerenciamento de Workflows</AlertTitle>
                      <AlertDescription>
                        Visualize e gerencie workflows ativos. Acesse o N8N
                        diretamente para edições avançadas.
                      </AlertDescription>
                    </Alert>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Financial;

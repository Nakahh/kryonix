import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  MessageSquare,
  Calendar,
  Mail,
  DollarSign,
  BarChart3,
  Settings,
  QrCode,
  FileText,
  Upload,
  Zap,
  CheckCircle,
  Clock,
  AlertCircle,
  Bot,
  Users,
  TrendingUp,
  Wifi,
  WifiOff,
  Code,
  Play,
  Pause,
  RefreshCw,
  Copy,
  ExternalLink,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState({
    name: "Vitor Jayme",
    company: "Minha Empresa",
    plan: "PREMIUM",
    trialDaysLeft: 5,
    whatsappConnected: true,
    emailConnected: false,
    calendarConnected: true,
    aiConfigured: false,
  });

  const [metrics, setMetrics] = useState({
    messagesThisMonth: 1247,
    leadsGenerated: 89,
    appointmentsScheduled: 45,
    revenue: 8950,
    conversionRate: 18.5,
    averageResponseTime: "2.3s",
  });

  const [systemStatus, setSystemStatus] = useState({
    api: "online",
    n8n: "online",
    whatsapp: "connected",
    openai: "connected",
    database: "healthy",
  });

  const [activities, setActivities] = useState([
    {
      id: 1,
      type: "whatsapp",
      description: "Nova mensagem: 'Gostaria de agendar uma consulta'",
      time: "2 min atrás",
      status: "success",
    },
    {
      id: 2,
      type: "ai",
      description: "IA respondeu automaticamente sobre horários disponíveis",
      time: "2 min atrás",
      status: "success",
    },
    {
      id: 3,
      type: "calendar",
      description: "Agendamento criado para João Silva - 15/01 14h",
      time: "5 min atrás",
      status: "success",
    },
    {
      id: 4,
      type: "payment",
      description: "Pagamento de R$ 250 recebido via PIX",
      time: "23 min atrás",
      status: "success",
    },
    {
      id: 5,
      type: "email",
      description: "E-mail de confirmação enviado para cliente",
      time: "1 hora atrás",
      status: "success",
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const integrationModules = [
    {
      id: "whatsapp",
      title: "WhatsApp Business",
      description: "Conecte seu WhatsApp e ative respostas automáticas com IA",
      icon: <MessageSquare className="h-6 w-6" />,
      connected: user.whatsappConnected,
      color: "bg-green-500",
      features: ["Respostas automáticas", "QR Code", "IA personalizada"],
      status: "Conectado - 1247 mensagens processadas",
      setupTime: "2 minutos",
    },
    {
      id: "ai",
      title: "Inteligência Artificial",
      description: "Configure e treine sua IA personalizada para o negócio",
      icon: <Bot className="h-6 w-6" />,
      connected: user.aiConfigured,
      color: "bg-purple-500",
      features: [
        "Prompts customizáveis",
        "Treinamento",
        "Respostas contextuais",
      ],
      status: "Configuração necessária",
      setupTime: "5 minutos",
    },
    {
      id: "calendar",
      title: "Google Calendar",
      description: "Agendamentos automáticos integrados com seu calendário",
      icon: <Calendar className="h-6 w-6" />,
      connected: user.calendarConnected,
      color: "bg-blue-500",
      features: ["Agendamento automático", "Lembretes", "Sincronização"],
      status: "Conectado - 45 agendamentos este mês",
      setupTime: "3 minutos",
    },
    {
      id: "email",
      title: "E-mail Automático",
      description: "Campanhas e respostas automáticas por e-mail",
      icon: <Mail className="h-6 w-6" />,
      connected: user.emailConnected,
      color: "bg-red-500",
      features: ["Campanhas automáticas", "Templates", "Analytics"],
      status: "Configuração necessária",
      setupTime: "4 minutos",
    },
    {
      id: "payments",
      title: "Pagamentos PIX",
      description: "Gere cobranças automáticas via PIX e cartão",
      icon: <DollarSign className="h-6 w-6" />,
      connected: false,
      color: "bg-yellow-500",
      features: ["PIX automático", "Cartão", "Relatórios"],
      status: "Não configurado",
      setupTime: "6 minutos",
    },
    {
      id: "forms",
      title: "Formulários Web",
      description: "Capture leads com formulários inteligentes",
      icon: <FileText className="h-6 w-6" />,
      connected: false,
      color: "bg-indigo-500",
      features: ["Drag & Drop", "Validação automática", "Integração WhatsApp"],
      status: "Não configurado",
      setupTime: "3 minutos",
    },
    {
      id: "analytics",
      title: "Relatórios e BI",
      description: "Dashboards em tempo real e relatórios em PDF",
      icon: <BarChart3 className="h-6 w-6" />,
      connected: true,
      color: "bg-pink-500",
      features: ["Dashboards interativos", "PDF automático", "Métricas"],
      status: "Ativo - Gerando relatórios",
      setupTime: "1 minuto",
    },
    {
      id: "embed",
      title: "Chat no Seu Site",
      description: "Adicione chat com IA no seu site em 1 clique",
      icon: <Code className="h-6 w-6" />,
      connected: false,
      color: "bg-teal-500",
      features: ["Código automático", "Responsivo", "Customizável"],
      status: "Pronto para instalar",
      setupTime: "30 segundos",
    },
  ];

  const connectIntegration = (moduleId: string) => {
    if (moduleId === "settings") {
      navigate("/settings");
      return;
    }

    console.log(`Conectando ${moduleId}...`);

    // Simulate connection process
    setUser((prev) => ({
      ...prev,
      [`${moduleId}Connected`]: true,
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
      case "connected":
      case "healthy":
        return <Wifi className="h-4 w-4 text-green-600" />;
      case "offline":
      case "disconnected":
      case "error":
        return <WifiOff className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    }
  };

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-20 h-20 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">KRYONIX</h1>
          <p className="text-blue-200 text-lg">Carregando seu dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Olá, {user.name}!
                  </h1>
                  <p className="text-sm text-gray-600">{user.company}</p>
                </div>
              </div>
              <Badge
                variant={user.plan === "PREMIUM" ? "default" : "secondary"}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              >
                {user.plan}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              {user.trialDaysLeft > 0 && (
                <div className="flex items-center space-x-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {user.trialDaysLeft} dias restantes
                  </span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                {Object.entries(systemStatus).map(([key, status]) => (
                  <div key={key} className="flex items-center space-x-1">
                    {getStatusIcon(status)}
                    <span className="text-xs text-gray-600 capitalize">
                      {key}
                    </span>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/settings")}
              >
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Visão Geral</h2>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Atualizar
              </Button>
              <Button size="sm">
                <Play className="h-4 w-4 mr-2" />
                Iniciar Automação
              </Button>
            </div>
          </div>
        </div>

        {/* Metrics Overview - Estilo Power BI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">
                    Mensagens Processadas
                  </p>
                  <p className="text-3xl font-bold">
                    {metrics.messagesThisMonth.toLocaleString()}
                  </p>
                  <p className="text-green-100 text-xs mt-1">Este mês</p>
                </div>
                <MessageSquare className="h-10 w-10 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Leads Capturados</p>
                  <p className="text-3xl font-bold">{metrics.leadsGenerated}</p>
                  <p className="text-blue-100 text-xs mt-1">
                    ↗ +23% vs mês anterior
                  </p>
                </div>
                <Users className="h-10 w-10 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Agendamentos</p>
                  <p className="text-3xl font-bold">
                    {metrics.appointmentsScheduled}
                  </p>
                  <p className="text-purple-100 text-xs mt-1">
                    Taxa: {metrics.conversionRate}%
                  </p>
                </div>
                <Calendar className="h-10 w-10 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm">Receita Gerada</p>
                  <p className="text-3xl font-bold">
                    R$ {metrics.revenue.toLocaleString()}
                  </p>
                  <p className="text-yellow-100 text-xs mt-1">
                    Resp. média: {metrics.averageResponseTime}
                  </p>
                </div>
                <TrendingUp className="h-10 w-10 text-yellow-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Integration Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Módulos de Automação
            </h2>
            <div className="space-y-4">
              {integrationModules.map((module) => (
                <Card
                  key={module.id}
                  className={`transition-all duration-200 hover:shadow-md ${
                    module.connected ? "ring-2 ring-green-200" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`${module.color} p-3 rounded-lg text-white`}
                        >
                          {module.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900">
                              {module.title}
                            </h3>
                            {module.connected && (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mb-3">
                            {module.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {module.features.map((feature, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant={module.connected ? "outline" : "default"}
                        size="sm"
                        onClick={() => connectIntegration(module.id)}
                      >
                        {module.connected ? "Configurar" : "Conectar"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Atividades Recentes
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50"
                    >
                      <div className="flex-shrink-0">
                        {activity.type === "whatsapp" && (
                          <MessageSquare className="h-5 w-5 text-green-600" />
                        )}
                        {activity.type === "calendar" && (
                          <Calendar className="h-5 w-5 text-purple-600" />
                        )}
                        {activity.type === "payment" && (
                          <DollarSign className="h-5 w-5 text-yellow-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Ver Todas as Atividades
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="sm" className="justify-start">
                    <QrCode className="h-4 w-4 mr-2" />
                    Gerar QR Code
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Relatório PDF
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Arquivos
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    Nova Campanha
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

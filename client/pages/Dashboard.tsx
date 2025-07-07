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
} from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState({
    name: "João Silva",
    plan: "PRO",
    trialDaysLeft: 5,
    whatsappConnected: false,
    emailConnected: false,
    calendarConnected: false,
  });

  const [metrics, setMetrics] = useState({
    messagesThisMonth: 245,
    leadsGenerated: 32,
    appointmentsScheduled: 18,
    revenue: 2850,
  });

  const [activities, setActivities] = useState([
    {
      id: 1,
      type: "whatsapp",
      description: "Nova mensagem de cliente interessado",
      time: "2 min atrás",
    },
    {
      id: 2,
      type: "calendar",
      description: "Agendamento marcado para amanhã às 14h",
      time: "15 min atrás",
    },
    {
      id: 3,
      type: "payment",
      description: "Pagamento de R$ 150 recebido via PIX",
      time: "1 hora atrás",
    },
  ]);

  const integrationModules = [
    {
      id: "whatsapp",
      title: "WhatsApp Business",
      description: "Conecte seu WhatsApp e ative respostas automáticas com IA",
      icon: <MessageSquare className="h-6 w-6" />,
      connected: user.whatsappConnected,
      color: "bg-green-500",
      features: ["Respostas automáticas", "QR Code", "IA personalizada"],
    },
    {
      id: "email",
      title: "E-mail Marketing",
      description: "Automatize campanhas e respostas por e-mail",
      icon: <Mail className="h-6 w-6" />,
      connected: user.emailConnected,
      color: "bg-blue-500",
      features: ["Campanhas automáticas", "Templates", "Analytics"],
    },
    {
      id: "calendar",
      title: "Agendamentos",
      description: "Integre com Google Calendar para agendamentos automáticos",
      icon: <Calendar className="h-6 w-6" />,
      connected: user.calendarConnected,
      color: "bg-purple-500",
      features: ["Google Calendar", "Lembretes", "Timezone automático"],
    },
    {
      id: "payments",
      title: "Cobranças",
      description: "Gere PIX, boletos e links de pagamento",
      icon: <DollarSign className="h-6 w-6" />,
      connected: false,
      color: "bg-yellow-500",
      features: ["PIX automático", "Boletos", "Stripe integrado"],
    },
    {
      id: "forms",
      title: "Formulários",
      description: "Crie formulários inteligentes que captam leads",
      icon: <FileText className="h-6 w-6" />,
      connected: false,
      color: "bg-indigo-500",
      features: ["Formulários personalizados", "Auto-resposta", "Validação"],
    },
    {
      id: "ai",
      title: "IA Personalizada",
      description: "Configure prompts e treine a IA para seu negócio",
      icon: <Zap className="h-6 w-6" />,
      connected: false,
      color: "bg-orange-500",
      features: [
        "Prompts customizáveis",
        "Treinamento",
        "Respostas contextuais",
      ],
    },
  ];

  const connectIntegration = (moduleId: string) => {
    // Simulate connection process
    console.log(`Connecting ${moduleId}...`);

    if (moduleId === "whatsapp") {
      // Show QR code modal in real implementation
      setUser((prev) => ({ ...prev, whatsappConnected: true }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Olá, {user.name}!
              </h1>
              <Badge variant={user.plan === "PRO" ? "default" : "secondary"}>
                Plano {user.plan}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              {user.trialDaysLeft > 0 && (
                <div className="flex items-center space-x-2 text-orange-600">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {user.trialDaysLeft} dias restantes do trial
                  </span>
                </div>
              )}
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trial Alert */}
        {user.trialDaysLeft > 0 && (
          <Card className="mb-8 border-orange-200 bg-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-6 w-6 text-orange-600" />
                  <div>
                    <h3 className="font-semibold text-orange-900">
                      Período de Avaliação
                    </h3>
                    <p className="text-orange-700">
                      Você tem {user.trialDaysLeft} dias restantes para testar
                      todas as funcionalidades gratuitamente.
                    </p>
                  </div>
                </div>
                <Button>Escolher Plano</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Mensagens este mês</p>
                  <p className="text-2xl font-bold">
                    {metrics.messagesThisMonth}
                  </p>
                </div>
                <MessageSquare className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Leads gerados</p>
                  <p className="text-2xl font-bold">{metrics.leadsGenerated}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Agendamentos</p>
                  <p className="text-2xl font-bold">
                    {metrics.appointmentsScheduled}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Receita</p>
                  <p className="text-2xl font-bold">R$ {metrics.revenue}</p>
                </div>
                <DollarSign className="h-8 w-8 text-yellow-600" />
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

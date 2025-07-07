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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  DollarSign,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Bell,
  Eye,
  Settings,
} from "lucide-react";

const Admin = () => {
  const [metrics, setMetrics] = useState({
    totalUsers: 1247,
    activeUsers: 892,
    totalRevenue: 45650,
    monthlyRecurring: 18940,
    quotationsToday: 23,
    quotationsPending: 8,
    quotationsThisMonth: 156,
    conversionRate: 12.5,
  });

  const [recentUsers, setRecentUsers] = useState([
    {
      id: 1,
      name: "João Silva",
      email: "joao@empresa.com",
      plan: "PRO",
      status: "active",
      revenue: 49,
      joinedAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@loja.com",
      plan: "PREMIUM",
      status: "trial",
      revenue: 0,
      joinedAt: "2024-01-14",
    },
    {
      id: 3,
      name: "Carlos Pereira",
      email: "carlos@clinica.com",
      plan: "PRO",
      status: "active",
      revenue: 49,
      joinedAt: "2024-01-13",
    },
  ]);

  const [recentQuotations, setRecentQuotations] = useState([
    {
      id: 1,
      customerName: "Ana Costa",
      customerEmail: "ana@email.com",
      siteType: "E-commerce",
      estimatedPrice: 3200,
      status: "pending",
      createdAt: "2024-01-15T10:30:00",
    },
    {
      id: 2,
      customerName: "Roberto Lima",
      customerEmail: "roberto@empresa.com",
      siteType: "Institucional",
      estimatedPrice: 1500,
      status: "approved",
      createdAt: "2024-01-15T09:15:00",
    },
    {
      id: 3,
      customerName: "Fernanda Oliveira",
      customerEmail: "fernanda@studio.com",
      siteType: "Sistema",
      estimatedPrice: 8000,
      status: "in_development",
      createdAt: "2024-01-14T16:45:00",
    },
  ]);

  const [systemAlerts, setSystemAlerts] = useState([
    {
      id: 1,
      type: "error",
      message: "N8N workflow falhou para usuário #1234",
      timestamp: "2024-01-15T11:30:00",
      resolved: false,
    },
    {
      id: 2,
      type: "warning",
      message: "Alto volume de registros nas últimas 2h",
      timestamp: "2024-01-15T10:00:00",
      resolved: false,
    },
    {
      id: 3,
      type: "info",
      message: "Backup do banco realizado com sucesso",
      timestamp: "2024-01-15T06:00:00",
      resolved: true,
    },
  ]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Ativo", variant: "default" as const },
      trial: { label: "Trial", variant: "secondary" as const },
      expired: { label: "Expirado", variant: "destructive" as const },
      pending: { label: "Pendente", variant: "secondary" as const },
      approved: { label: "Aprovado", variant: "default" as const },
      rejected: { label: "Rejeitado", variant: "destructive" as const },
      in_development: {
        label: "Em Desenvolvimento",
        variant: "secondary" as const,
      },
      completed: { label: "Concluído", variant: "default" as const },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || {
      label: status,
      variant: "secondary" as const,
    };

    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Check if user has admin access
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token !== "admin-secret-2024") {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Painel Administrativo
              </h1>
              <Badge variant="destructive" className="text-xs">
                ACESSO RESTRITO
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Alertas ({systemAlerts.filter((a) => !a.resolved).length})
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Usuários Totais</p>
                  <p className="text-2xl font-bold">{metrics.totalUsers}</p>
                  <p className="text-xs text-green-600">
                    {metrics.activeUsers} ativos
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
                  <p className="text-sm text-gray-600">Receita Total</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(metrics.totalRevenue)}
                  </p>
                  <p className="text-xs text-green-600">
                    {formatCurrency(metrics.monthlyRecurring)} recorrente
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Orçamentos Hoje</p>
                  <p className="text-2xl font-bold">
                    {metrics.quotationsToday}
                  </p>
                  <p className="text-xs text-orange-600">
                    {metrics.quotationsPending} pendentes
                  </p>
                </div>
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Taxa de Conversão</p>
                  <p className="text-2xl font-bold">
                    {metrics.conversionRate}%
                  </p>
                  <p className="text-xs text-green-600">
                    {metrics.quotationsThisMonth} este mês
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="quotations">Orçamentos</TabsTrigger>
            <TabsTrigger value="alerts">Alertas do Sistema</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Usuários Recentes</CardTitle>
                <CardDescription>
                  Últimos usuários cadastrados na plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>E-mail</TableHead>
                      <TableHead>Plano</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Receita</TableHead>
                      <TableHead>Cadastrado em</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.plan}</Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>{formatCurrency(user.revenue)}</TableCell>
                        <TableCell>
                          {new Date(user.joinedAt).toLocaleDateString("pt-BR")}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quotations Tab */}
          <TabsContent value="quotations">
            <Card>
              <CardHeader>
                <CardTitle>Orçamentos de Sites</CardTitle>
                <CardDescription>
                  Últimos orçamentos gerados pela IA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>E-mail</TableHead>
                      <TableHead>Tipo de Site</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentQuotations.map((quotation) => (
                      <TableRow key={quotation.id}>
                        <TableCell className="font-medium">
                          {quotation.customerName}
                        </TableCell>
                        <TableCell>{quotation.customerEmail}</TableCell>
                        <TableCell>{quotation.siteType}</TableCell>
                        <TableCell className="font-semibold">
                          {formatCurrency(quotation.estimatedPrice)}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(quotation.status)}
                        </TableCell>
                        <TableCell>{formatDate(quotation.createdAt)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Alerts Tab */}
          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle>Alertas do Sistema</CardTitle>
                <CardDescription>
                  Monitoramento em tempo real da plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemAlerts.map((alert) => (
                    <Card
                      key={alert.id}
                      className={`border-l-4 ${
                        alert.type === "error"
                          ? "border-l-red-500 bg-red-50"
                          : alert.type === "warning"
                            ? "border-l-yellow-500 bg-yellow-50"
                            : "border-l-blue-500 bg-blue-50"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            {alert.type === "error" && (
                              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                            )}
                            {alert.type === "warning" && (
                              <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                            )}
                            {alert.type === "info" && (
                              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                            )}
                            <div>
                              <p className="font-medium text-gray-900">
                                {alert.message}
                              </p>
                              <p className="text-sm text-gray-500">
                                {formatDate(alert.timestamp)}
                              </p>
                            </div>
                          </div>
                          {!alert.resolved && (
                            <Button variant="outline" size="sm">
                              Resolver
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Métricas de Uso</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Mensagens IA processadas
                      </span>
                      <span className="font-semibold">12,547</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Workflows N8N executados
                      </span>
                      <span className="font-semibold">8,923</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Integrações WhatsApp ativas
                      </span>
                      <span className="font-semibold">245</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        E-mails enviados hoje
                      </span>
                      <span className="font-semibold">1,123</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance do Sistema</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Uptime</span>
                      <span className="font-semibold text-green-600">
                        99.98%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Tempo médio resposta
                      </span>
                      <span className="font-semibold">245ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Uso do banco de dados
                      </span>
                      <span className="font-semibold">67%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Erros nas últimas 24h
                      </span>
                      <span className="font-semibold text-red-600">3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;

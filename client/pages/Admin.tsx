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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
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
  UserPlus,
  Edit,
  Trash2,
  Download,
  RefreshCw,
  Server,
  Database,
  MessageSquare,
  Mail,
  Calendar,
  Shield,
  Activity,
  BarChart3,
  PieChart,
  Zap,
  Globe,
  Smartphone,
  Monitor,
  Cpu,
  HardDrive,
  Wifi,
  Ban,
  CheckCircle2,
  XCircle,
  UserCheck,
  DollarSign as Revenue,
  TrendingDown,
} from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  plan: string;
  status: string;
  revenue: number;
  joinedAt: string;
  lastActive: string;
  integrations: string[];
  country: string;
  city: string;
}

interface SystemMetrics {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  monthlyRecurring: number;
  quotationsToday: number;
  quotationsPending: number;
  quotationsThisMonth: number;
  conversionRate: number;
  systemUptime: number;
  apiResponseTime: number;
  databaseUsage: number;
  activeConnections: number;
  messagesProcessed: number;
  emailsSent: number;
  whatsappActive: number;
  n8nWorkflows: number;
}

const Admin = () => {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    totalUsers: 1247,
    activeUsers: 892,
    totalRevenue: 145650,
    monthlyRecurring: 48940,
    quotationsToday: 23,
    quotationsPending: 8,
    quotationsThisMonth: 156,
    conversionRate: 12.5,
    systemUptime: 99.98,
    apiResponseTime: 245,
    databaseUsage: 67,
    activeConnections: 1456,
    messagesProcessed: 12547,
    emailsSent: 8923,
    whatsappActive: 245,
    n8nWorkflows: 1123,
  });

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "João Silva",
      email: "joao@empresa.com",
      plan: "PROFESSIONAL",
      status: "active",
      revenue: 147,
      joinedAt: "2024-01-15",
      lastActive: "2024-01-20T10:30:00",
      integrations: ["WhatsApp", "Gmail", "Calendar"],
      country: "Brasil",
      city: "São Paulo",
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@loja.com",
      plan: "ENTERPRISE",
      status: "trial",
      revenue: 0,
      joinedAt: "2024-01-14",
      lastActive: "2024-01-20T09:15:00",
      integrations: ["WhatsApp", "Stripe"],
      country: "Brasil",
      city: "Rio de Janeiro",
    },
    {
      id: 3,
      name: "Carlos Pereira",
      email: "carlos@clinica.com",
      plan: "PROFESSIONAL",
      status: "active",
      revenue: 147,
      joinedAt: "2024-01-13",
      lastActive: "2024-01-19T16:45:00",
      integrations: ["WhatsApp", "Gmail", "Calendar", "N8N"],
      country: "Brasil",
      city: "Brasília",
    },
    {
      id: 4,
      name: "Ana Costa",
      email: "ana@startup.com",
      plan: "STARTER",
      status: "active",
      revenue: 97,
      joinedAt: "2024-01-12",
      lastActive: "2024-01-20T08:30:00",
      integrations: ["WhatsApp"],
      country: "Brasil",
      city: "Belo Horizonte",
    },
    {
      id: 5,
      name: "Roberto Lima",
      email: "roberto@consultoria.com",
      plan: "ENTERPRISE",
      status: "suspended",
      revenue: 0,
      joinedAt: "2024-01-10",
      lastActive: "2024-01-18T14:20:00",
      integrations: [],
      country: "Brasil",
      city: "Porto Alegre",
    },
  ]);

  const [quotations, setQuotations] = useState([
    {
      id: 1,
      customerName: "Ana Costa",
      customerEmail: "ana@email.com",
      customerPhone: "(11) 99999-9999",
      siteType: "E-commerce",
      features: ["Carrinho", "Pagamento", "Estoque"],
      estimatedPrice: 8500,
      status: "pending",
      createdAt: "2024-01-20T10:30:00",
      urgency: "alta",
      source: "Landing Page",
    },
    {
      id: 2,
      customerName: "Roberto Lima",
      customerEmail: "roberto@empresa.com",
      customerPhone: "(21) 88888-8888",
      siteType: "Institucional",
      features: ["Blog", "Contato", "Sobre"],
      estimatedPrice: 3200,
      status: "approved",
      createdAt: "2024-01-20T09:15:00",
      urgency: "media",
      source: "WhatsApp",
    },
    {
      id: 3,
      customerName: "Fernanda Oliveira",
      customerEmail: "fernanda@studio.com",
      customerPhone: "(31) 77777-7777",
      siteType: "Sistema Personalizado",
      features: ["Dashboard", "API", "Relatórios", "Integração"],
      estimatedPrice: 15000,
      status: "in_development",
      createdAt: "2024-01-19T16:45:00",
      urgency: "alta",
      source: "Indicação",
    },
  ]);

  const [systemAlerts, setSystemAlerts] = useState([
    {
      id: 1,
      type: "error",
      message:
        "N8N workflow falhou para usuário #1234 - Timeout na integração Gmail",
      timestamp: "2024-01-20T11:30:00",
      resolved: false,
      severity: "critical",
    },
    {
      id: 2,
      type: "warning",
      message: "Alto volume de registros nas últimas 2h - 150% acima da média",
      timestamp: "2024-01-20T10:00:00",
      resolved: false,
      severity: "medium",
    },
    {
      id: 3,
      type: "info",
      message: "Backup automático do banco de dados concluído com sucesso",
      timestamp: "2024-01-20T06:00:00",
      resolved: true,
      severity: "low",
    },
    {
      id: 4,
      type: "error",
      message: "Falha na sincronização WhatsApp para 3 usuários",
      timestamp: "2024-01-20T05:30:00",
      resolved: false,
      severity: "high",
    },
  ]);

  const [activities, setActivities] = useState([
    {
      id: 1,
      user: "João Silva",
      action: "Conectou WhatsApp",
      timestamp: "2024-01-20T10:45:00",
      ip: "192.168.1.100",
      device: "Desktop",
    },
    {
      id: 2,
      user: "Maria Santos",
      action: "Gerou novo orçamento",
      timestamp: "2024-01-20T10:30:00",
      ip: "10.0.0.50",
      device: "Mobile",
    },
    {
      id: 3,
      user: "Carlos Pereira",
      action: "Configurou automação de email",
      timestamp: "2024-01-20T09:15:00",
      ip: "172.16.0.25",
      device: "Desktop",
    },
  ]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: {
        label: "Ativo",
        variant: "default" as const,
        icon: CheckCircle2,
        color: "text-green-600",
      },
      trial: {
        label: "Trial",
        variant: "secondary" as const,
        icon: Clock,
        color: "text-yellow-600",
      },
      suspended: {
        label: "Suspenso",
        variant: "destructive" as const,
        icon: Ban,
        color: "text-red-600",
      },
      expired: {
        label: "Expirado",
        variant: "destructive" as const,
        icon: XCircle,
        color: "text-red-600",
      },
      pending: {
        label: "Pendente",
        variant: "secondary" as const,
        icon: Clock,
        color: "text-yellow-600",
      },
      approved: {
        label: "Aprovado",
        variant: "default" as const,
        icon: CheckCircle,
        color: "text-green-600",
      },
      rejected: {
        label: "Rejeitado",
        variant: "destructive" as const,
        icon: XCircle,
        color: "text-red-600",
      },
      in_development: {
        label: "Em Desenvolvimento",
        variant: "secondary" as const,
        icon: Cpu,
        color: "text-blue-600",
      },
      completed: {
        label: "Concluído",
        variant: "default" as const,
        icon: CheckCircle,
        color: "text-green-600",
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || {
      label: status,
      variant: "secondary" as const,
      icon: Clock,
      color: "text-gray-600",
    };

    const IconComponent = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <IconComponent className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getPlanBadge = (plan: string) => {
    const planConfig = {
      STARTER: { label: "Starter", color: "bg-blue-100 text-blue-800" },
      PROFESSIONAL: {
        label: "Professional",
        color: "bg-purple-100 text-purple-800",
      },
      ENTERPRISE: { label: "Enterprise", color: "bg-gold-100 text-yellow-800" },
    };

    const config = planConfig[plan as keyof typeof planConfig] || {
      label: plan,
      color: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
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

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) return "Agora mesmo";
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    if (diffInHours < 48) return "Ontem";
    return `${Math.floor(diffInHours / 24)} dias atrás`;
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    const matchesPlan = planFilter === "all" || user.plan === planFilter;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  const handleUserAction = (action: string, userId: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              status:
                action === "activate"
                  ? "active"
                  : action === "suspend"
                    ? "suspended"
                    : user.status,
            }
          : user,
      ),
    );
  };

  const resolveAlert = (alertId: number) => {
    setSystemAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === alertId ? { ...alert, resolved: true } : alert,
      ),
    );
  };

  // Check admin access
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token !== "admin-secret-2024") {
      window.location.href = "/";
    }
  }, []);

  // Auto-refresh metrics every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setMetrics((prev) => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 5) - 2,
        messagesProcessed:
          prev.messagesProcessed + Math.floor(Math.random() * 10),
        apiResponseTime: 200 + Math.floor(Math.random() * 100),
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-red-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    KRYONIX Admin
                  </h1>
                  <p className="text-sm text-gray-600">
                    Painel de Controle Avançado
                  </p>
                </div>
              </div>
              <Badge variant="destructive" className="text-xs animate-pulse">
                <Shield className="h-3 w-3 mr-1" />
                ACESSO RESTRITO
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Wifi className="h-4 w-4 text-green-500" />
                <span>Sistema Online</span>
              </div>
              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4 mr-2" />
                Alertas
                {systemAlerts.filter((a) => !a.resolved).length > 0 && (
                  <Badge className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                    {systemAlerts.filter((a) => !a.resolved).length}
                  </Badge>
                )}
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Atualizar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700 font-medium">
                    Usuários Totais
                  </p>
                  <p className="text-3xl font-bold text-blue-900">
                    {metrics.totalUsers.toLocaleString()}
                  </p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <p className="text-xs text-green-600 font-medium">
                      {metrics.activeUsers} ativos agora
                    </p>
                  </div>
                </div>
                <Users className="h-12 w-12 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700 font-medium">
                    Receita Total
                  </p>
                  <p className="text-3xl font-bold text-green-900">
                    {formatCurrency(metrics.totalRevenue)}
                  </p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <p className="text-xs text-green-600 font-medium">
                      {formatCurrency(metrics.monthlyRecurring)} MRR
                    </p>
                  </div>
                </div>
                <DollarSign className="h-12 w-12 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-700 font-medium">
                    Orçamentos
                  </p>
                  <p className="text-3xl font-bold text-purple-900">
                    {metrics.quotationsToday}
                  </p>
                  <div className="flex items-center mt-1">
                    <Clock className="h-3 w-3 text-orange-600 mr-1" />
                    <p className="text-xs text-orange-600 font-medium">
                      {metrics.quotationsPending} pendentes
                    </p>
                  </div>
                </div>
                <FileText className="h-12 w-12 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-700 font-medium">
                    Conversão
                  </p>
                  <p className="text-3xl font-bold text-yellow-900">
                    {metrics.conversionRate}%
                  </p>
                  <div className="flex items-center mt-1">
                    <BarChart3 className="h-3 w-3 text-blue-600 mr-1" />
                    <p className="text-xs text-blue-600 font-medium">
                      {metrics.quotationsThisMonth} este mês
                    </p>
                  </div>
                </div>
                <TrendingUp className="h-12 w-12 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Server className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Uptime</span>
                </div>
                <span className="text-lg font-bold text-green-600">
                  {metrics.systemUptime}%
                </span>
              </div>
              <Progress value={metrics.systemUptime} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">Resposta API</span>
                </div>
                <span className="text-lg font-bold text-blue-600">
                  {metrics.apiResponseTime}ms
                </span>
              </div>
              <Progress value={metrics.apiResponseTime / 10} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Database className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">Uso do BD</span>
                </div>
                <span className="text-lg font-bold text-purple-600">
                  {metrics.databaseUsage}%
                </span>
              </div>
              <Progress value={metrics.databaseUsage} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-medium">Conexões</span>
                </div>
                <span className="text-lg font-bold text-orange-600">
                  {metrics.activeConnections}
                </span>
              </div>
              <Progress
                value={(metrics.activeConnections / 2000) * 100}
                className="mt-2"
              />
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="quotations">Orçamentos</TabsTrigger>
            <TabsTrigger value="alerts">Alertas</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="system">Sistema</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>Atividade Recente</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <UserCheck className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.user}
                          </p>
                          <p className="text-sm text-gray-600">
                            {activity.action}
                          </p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-xs text-gray-500">
                              {formatRelativeTime(activity.timestamp)}
                            </span>
                            <span className="text-xs text-gray-500">
                              {activity.device === "Desktop" ? (
                                <Monitor className="h-3 w-3 inline mr-1" />
                              ) : (
                                <Smartphone className="h-3 w-3 inline mr-1" />
                              )}
                              {activity.device}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>Ações Rápidas</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="h-20 flex flex-col space-y-2">
                      <UserPlus className="h-6 w-6" />
                      <span className="text-sm">Novo Usuário</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col space-y-2"
                    >
                      <Download className="h-6 w-6" />
                      <span className="text-sm">Relatório</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col space-y-2"
                    >
                      <Mail className="h-6 w-6" />
                      <span className="text-sm">Email Broadcast</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col space-y-2"
                    >
                      <Settings className="h-6 w-6" />
                      <span className="text-sm">Configurações</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Enhanced Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Gestão de Usuários</CardTitle>
                    <CardDescription>
                      Controle completo de usuários da plataforma
                    </CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Novo Usuário
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Adicionar Novo Usuário</DialogTitle>
                        <DialogDescription>
                          Criar uma nova conta de usuário
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Nome</Label>
                            <Input id="name" placeholder="Nome completo" />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="email@exemplo.com"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="plan">Plano</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecionar plano" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="STARTER">
                                  Starter - R$ 97
                                </SelectItem>
                                <SelectItem value="PROFESSIONAL">
                                  Professional - R$ 147
                                </SelectItem>
                                <SelectItem value="ENTERPRISE">
                                  Enterprise - R$ 197
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="status">Status</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Status inicial" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="trial">Trial</SelectItem>
                                <SelectItem value="active">Ativo</SelectItem>
                                <SelectItem value="suspended">
                                  Suspenso
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <Button className="w-full">Criar Usuário</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex space-x-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="Buscar por nome ou email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos Status</SelectItem>
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="trial">Trial</SelectItem>
                      <SelectItem value="suspended">Suspenso</SelectItem>
                      <SelectItem value="expired">Expirado</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={planFilter} onValueChange={setPlanFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos Planos</SelectItem>
                      <SelectItem value="STARTER">Starter</SelectItem>
                      <SelectItem value="PROFESSIONAL">Professional</SelectItem>
                      <SelectItem value="ENTERPRISE">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Plano</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Receita</TableHead>
                      <TableHead>Última Atividade</TableHead>
                      <TableHead>Integrações</TableHead>
                      <TableHead>Localização</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getPlanBadge(user.plan)}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell className="font-semibold">
                          {formatCurrency(user.revenue)}
                        </TableCell>
                        <TableCell className="text-sm">
                          {formatRelativeTime(user.lastActive)}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {user.integrations.map((integration, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs"
                              >
                                {integration}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          <div>{user.city}</div>
                          <div className="text-gray-500">{user.country}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedUser(user);
                                setIsUserDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleUserAction("suspend", user.id)
                              }
                            >
                              <Ban className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced Quotations Tab */}
          <TabsContent value="quotations">
            <Card>
              <CardHeader>
                <CardTitle>Orçamentos de Sites</CardTitle>
                <CardDescription>
                  Gestão completa de orçamentos gerados pela IA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Contato</TableHead>
                      <TableHead>Projeto</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Urgência</TableHead>
                      <TableHead>Origem</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quotations.map((quotation) => (
                      <TableRow key={quotation.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {quotation.customerName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {quotation.customerEmail}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {quotation.customerPhone}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {quotation.siteType}
                            </div>
                            <div className="text-xs text-gray-500">
                              {quotation.features.join(", ")}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold text-green-600">
                          {formatCurrency(quotation.estimatedPrice)}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(quotation.status)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              quotation.urgency === "alta"
                                ? "destructive"
                                : quotation.urgency === "media"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {quotation.urgency}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{quotation.source}</Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {formatDate(quotation.createdAt)}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced System Alerts Tab */}
          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle>Monitoramento do Sistema</CardTitle>
                <CardDescription>
                  Alertas e notificações em tempo real
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
                      } ${alert.resolved ? "opacity-60" : ""}`}
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
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <p className="font-medium text-gray-900">
                                  {alert.message}
                                </p>
                                <Badge
                                  variant={
                                    alert.severity === "critical"
                                      ? "destructive"
                                      : alert.severity === "high"
                                        ? "destructive"
                                        : alert.severity === "medium"
                                          ? "secondary"
                                          : "outline"
                                  }
                                  className="text-xs"
                                >
                                  {alert.severity}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">
                                {formatDate(alert.timestamp)}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            {alert.resolved ? (
                              <Badge variant="default" className="text-xs">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Resolvido
                              </Badge>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => resolveAlert(alert.id)}
                              >
                                Resolver
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Métricas de Engajamento</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">
                          Mensagens IA
                        </span>
                      </div>
                      <span className="font-semibold">
                        {metrics.messagesProcessed.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={75} />

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-purple-600" />
                        <span className="text-sm text-gray-600">
                          Workflows N8N
                        </span>
                      </div>
                      <span className="font-semibold">
                        {metrics.n8nWorkflows.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={65} />

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-600">
                          WhatsApp Ativo
                        </span>
                      </div>
                      <span className="font-semibold">
                        {metrics.whatsappActive}
                      </span>
                    </div>
                    <Progress value={45} />

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-orange-600" />
                        <span className="text-sm text-gray-600">
                          E-mails Enviados
                        </span>
                      </div>
                      <span className="font-semibold">
                        {metrics.emailsSent.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={55} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="h-5 w-5" />
                    <span>Performance do Sistema</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Server className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-600">Uptime</span>
                      </div>
                      <span className="font-semibold text-green-600">
                        {metrics.systemUptime}%
                      </span>
                    </div>
                    <Progress
                      value={metrics.systemUptime}
                      className="bg-green-100"
                    />

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">
                          Resposta API
                        </span>
                      </div>
                      <span className="font-semibold">
                        {metrics.apiResponseTime}ms
                      </span>
                    </div>
                    <Progress value={100 - metrics.apiResponseTime / 10} />

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Database className="h-4 w-4 text-purple-600" />
                        <span className="text-sm text-gray-600">
                          Uso do Banco
                        </span>
                      </div>
                      <span className="font-semibold">
                        {metrics.databaseUsage}%
                      </span>
                    </div>
                    <Progress value={metrics.databaseUsage} />

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-orange-600" />
                        <span className="text-sm text-gray-600">
                          Conexões Ativas
                        </span>
                      </div>
                      <span className="font-semibold">
                        {metrics.activeConnections}
                      </span>
                    </div>
                    <Progress
                      value={(metrics.activeConnections / 2000) * 100}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Configuration Tab */}
          <TabsContent value="system">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Configurações do Sistema</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">
                        Modo de Manutenção
                      </Label>
                      <p className="text-xs text-gray-500">
                        Desabilita acesso de usuários
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Auto-backup</Label>
                      <p className="text-xs text-gray-500">
                        Backup automático diário
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">
                        Logs Detalhados
                      </Label>
                      <p className="text-xs text-gray-500">
                        Ativa logging avançado
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">
                        Cache Automático
                      </Label>
                      <p className="text-xs text-gray-500">
                        Otimização de performance
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="pt-4 border-t">
                    <Button className="w-full" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Backup Manual
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <HardDrive className="h-5 w-5" />
                    <span>Monitoramento de Recursos</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">CPU</span>
                      <span className="text-sm font-medium">34%</span>
                    </div>
                    <Progress value={34} />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Memória RAM</span>
                      <span className="text-sm font-medium">67%</span>
                    </div>
                    <Progress value={67} />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">
                        Armazenamento
                      </span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <Progress value={45} />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">
                        Banda de Rede
                      </span>
                      <span className="text-sm font-medium">23%</span>
                    </div>
                    <Progress value={23} />
                  </div>

                  <div className="pt-4 border-t">
                    <Button className="w-full" variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Atualizar Métricas
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* User Details Dialog */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Usuário</DialogTitle>
            <DialogDescription>
              Informações completas e ações disponíveis
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Nome
                  </Label>
                  <p className="text-sm text-gray-900">{selectedUser.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <p className="text-sm text-gray-900">{selectedUser.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Plano
                  </Label>
                  <div className="mt-1">{getPlanBadge(selectedUser.plan)}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Status
                  </Label>
                  <div className="mt-1">
                    {getStatusBadge(selectedUser.status)}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Receita Total
                  </Label>
                  <p className="text-sm font-semibold text-green-600">
                    {formatCurrency(selectedUser.revenue)}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Última Atividade
                  </Label>
                  <p className="text-sm text-gray-900">
                    {formatRelativeTime(selectedUser.lastActive)}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Localização
                  </Label>
                  <p className="text-sm text-gray-900">
                    {selectedUser.city}, {selectedUser.country}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Membro desde
                  </Label>
                  <p className="text-sm text-gray-900">
                    {new Date(selectedUser.joinedAt).toLocaleDateString(
                      "pt-BR",
                    )}
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Integrações Ativas
                </Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedUser.integrations.map((integration, idx) => (
                    <Badge key={idx} variant="outline">
                      {integration}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => handleUserAction("activate", selectedUser.id)}
                  disabled={selectedUser.status === "active"}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Ativar
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleUserAction("suspend", selectedUser.id)}
                  disabled={selectedUser.status === "suspended"}
                >
                  <Ban className="h-4 w-4 mr-2" />
                  Suspender
                </Button>
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Enviar Email
                </Button>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;

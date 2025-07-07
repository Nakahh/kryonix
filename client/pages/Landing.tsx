import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Check,
  MessageSquare,
  Calendar,
  Mail,
  DollarSign,
  BarChart3,
  Zap,
  Shield,
  Code,
  Cpu,
  Rocket,
  Award,
  Users,
  Clock,
  HeadphonesIcon,
  Star,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Timer de urgência
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 }; // Reset
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      icon: <Code className="h-8 w-8 text-blue-600" />,
      title: "Desenvolvimento Web",
      description:
        "Sites e sistemas web modernos com React, Node.js e tecnologias de ponta.",
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-green-600" />,
      title: "Automação com IA",
      description:
        "WhatsApp automático, chatbots inteligentes e automação de processos.",
    },
    {
      icon: <Cpu className="h-8 w-8 text-purple-600" />,
      title: "Inteligência Artificial",
      description: "Soluções personalizadas com IA para otimizar seu negócio.",
    },
    {
      icon: <Calendar className="h-8 w-8 text-yellow-600" />,
      title: "Sistemas de Gestão",
      description: "ERPs, CRMs e sistemas personalizados para sua empresa.",
    },
    {
      icon: <Rocket className="h-8 w-8 text-red-600" />,
      title: "DevOps & Cloud",
      description:
        "Deploy automático, infraestrutura na nuvem e monitoramento.",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-orange-600" />,
      title: "Relatórios e BI",
      description:
        "Dashboards interativos e business intelligence para decisões.",
    },
  ];

  const stats = [
    { number: "50+", label: "Projetos Entregues" },
    { number: "100%", label: "Clientes Satisfeitos" },
    { number: "5+", label: "Anos de Experiência" },
    { number: "24/7", label: "Suporte Disponível" },
  ];

  const testimonials = [
    {
      name: "João Silva",
      company: "TechStart",
      text: "A Kryonix transformou nossa ideia em uma plataforma incrível. Superou todas as expectativas!",
      rating: 5,
    },
    {
      name: "Maria Santos",
      company: "Digital Corp",
      text: "Profissionalismo e qualidade excepcionais. Recomendo para qualquer projeto de tecnologia.",
      rating: 5,
    },
    {
      name: "Carlos Pereira",
      company: "InnovaTech",
      text: "Entrega rápida e suporte contínuo. A automação que criaram economizou horas do nosso time.",
      rating: 5,
    },
  ];

  const basePlans = [
    {
      name: "TESTE GRÁTIS",
      price: 0,
      originalPrice: 0,
      period: "/7 dias",
      features: [
        "WhatsApp Business básico",
        "IA personalizada limitada",
        "Até 100 mensagens/mês",
        "Dashboard básico",
        "Suporte por e-mail",
      ],
      popular: false,
      isFree: true,
      badge: "RISCO ZERO",
    },
    {
      name: "STARTER",
      price: 99,
      originalPrice: 297,
      period: "/mês",
      features: [
        "WhatsApp Business completo",
        "IA personalizada avançada",
        "Mensagens ilimitadas",
        "Dashboard profissional",
        "Relatórios avançados",
        "Suporte por chat 24/7",
      ],
      popular: false,
      discount: "67% OFF",
      badge: "MAIS VENDIDO",
      savings: "R$ 2.376/ano",
    },
    {
      name: "PROFESSIONAL",
      price: 204,
      originalPrice: 497,
      period: "/mês",
      features: [
        "Tudo do Starter",
        "API personalizada ilimitada",
        "Webhooks avançados",
        "Integrações premium",
        "Backup automático em nuvem",
        "Consultor dedicado 24/7",
      ],
      popular: true,
      discount: "59% OFF",
      badge: "RECOMENDADO",
      savings: "R$ 3.516/ano",
    },
  ];

  const modules = [
    {
      id: 1,
      name: "WhatsApp Business Premium",
      price: 105,
      originalPrice: 297,
      period: "/mês",
      description:
        "🔥 AUTOMAÇÃO COMPLETA DE LEADS - Distribui e converte automaticamente",
      features: [
        "Resposta automática instantânea 24/7",
        "Distribuição inteligente para equipe",
        "Fallback humanizado após 15 minutos",
        "Histórico completo + Analytics",
        "Notificações em tempo real",
        "API Evolution Premium integrada",
      ],
      icon: <MessageSquare className="h-6 w-6 text-green-600" />,
      category: "Comunicação",
      discount: "65% OFF",
      urgent: true,
      value: "💰 Economiza R$ 15.000/mês em funcionários",
      testimonial: "Aumentou nossas vendas em 340% - João Silva, CEO",
    },
    {
      id: 2,
      name: "Meta Business Integration",
      price: 168,
      originalPrice: 447,
      period: "/mês",
      description:
        "📈 DOMÍNIO TOTAL DAS REDES SOCIAIS - Instagram + Facebook automático",
      features: [
        "Publicação automática multi-plataforma",
        "Stories + Reels automáticos",
        "Gestão de campanhas com IA",
        "Auto-posting inteligente",
        "Analytics preditivas avançadas",
        "Influencer tracking integrado",
      ],
      icon: <BarChart3 className="h-6 w-6 text-blue-600" />,
      category: "Marketing",
      discount: "62% OFF",
      value: "🚀 Alcance 500% mais clientes",
      testimonial: "R$ 50K faturamento/mês extra - Maria Santos",
    },
    {
      id: 3,
      name: "Google Calendar Pro",
      price: 63,
      originalPrice: 197,
      period: "/mês",
      description:
        "⏰ ZERO AGENDA PERDIDA - Agendamento inteligente automático",
      features: [
        "Sincronização tri-direcional calendários",
        "IA para melhor horário disponível",
        "Lembretes WhatsApp + Email + SMS",
        "Gestão de múltiplas agendas",
        "Relatórios de performance",
        "Zoom/Meet/Teams integrado",
      ],
      icon: <Calendar className="h-6 w-6 text-purple-600" />,
      category: "Produtividade",
      discount: "68% OFF",
      value: "⚡ 100% das reuniões confirmadas",
      testimonial: "Zero no-show desde que implantamos - Carlos Pereira",
    },
    {
      id: 4,
      name: "N8N Automation Premium",
      price: 126,
      originalPrice: 397,
      period: "/mês",
      description: "🤖 AUTOMAÇÃO ENTERPRISE - Processos 100% automatizados",
      features: [
        "Workflows ilimitados com IA",
        "Integração com 1000+ APIs",
        "Processamento de big data",
        "Alertas preditivos automáticos",
        "Backup em nuvem empresarial",
        "Consultor dedicado 24/7",
      ],
      icon: <Zap className="h-6 w-6 text-orange-600" />,
      category: "Automação",
      discount: "68% OFF",
      urgent: true,
      value: "💎 Automatiza 95% dos processos manuais",
      testimonial: "Economizamos 40h/semana - Ana Costa, Diretora",
    },
    {
      id: 5,
      name: "IA Advanced Analytics",
      price: 147,
      originalPrice: 497,
      period: "/mês",
      description: "🧠 INTELIGÊNCIA ARTIFICIAL PREDITIVA - Antecipa tendências",
      features: [
        "Machine Learning personalizado",
        "Previsão de vendas com 94% precisão",
        "Insights automáticos de comportamento",
        "Dashboards executivos em tempo real",
        "Alertas de oportunidades",
        "Consultoria em IA incluída",
      ],
      icon: <Cpu className="h-6 w-6 text-red-600" />,
      category: "Inteligência",
      discount: "70% OFF",
      urgent: true,
      value: "📊 Aumenta faturamento em 85%",
      testimonial: "ROI de 1200% no primeiro ano - Roberto Lima",
    },
    {
      id: 6,
      name: "E-mail Marketing Pro",
      price: 84,
      originalPrice: 247,
      period: "/mês",
      description: "💌 CONVERSÃO MÁXIMA - Emails que vendem automaticamente",
      features: [
        "Sequências automáticas de conversão",
        "Templates com 45% open rate",
        "Segmentação comportamental avançada",
        "A/B Testing automático",
        "SMS + Email + Push integrados",
        "Copywriter IA incluído",
      ],
      icon: <Mail className="h-6 w-6 text-indigo-600" />,
      category: "Marketing",
      discount: "66% OFF",
      value: "💰 ROI médio de 800%",
      testimonial: "R$ 25K extra/mês só com email - Fernanda Oliveira",
    },
    {
      id: 7,
      name: "CRM Inteligente",
      price: 105,
      originalPrice: 347,
      period: "/mês",
      description: "🎯 VENDAS EM PILOTO AUTOMÁTICO - CRM que vende sozinho",
      features: [
        "IA que qualifica leads automaticamente",
        "Scoring preditivo de conversão",
        "Pipeline visual com automações",
        "Forecasting de vendas preciso",
        "Integração total com todas ferramentas",
        "App mobile com notificações IA",
      ],
      icon: <Users className="h-6 w-6 text-emerald-600" />,
      category: "Vendas",
      discount: "70% OFF",
      value: "🔥 Converte 80% mais leads em clientes",
      testimonial: "Triplicamos as vendas - Paulo Silva, Gerente",
    },
    {
      id: 8,
      name: "Chatbot IA Avançado",
      price: 126,
      originalPrice: 397,
      period: "/mês",
      description: "🤖 ATENDIMENTO SUPER HUMANO - IA que vende 24/7",
      features: [
        "IA treinada especificamente para vendas",
        "Atendimento emocional humanizado",
        "Integração omnichannel completa",
        "Aprendizado contínuo supervisionado",
        "Transferência inteligente",
        "Analytics de conversão avançadas",
      ],
      icon: <Shield className="h-6 w-6 text-cyan-600" />,
      category: "Atendimento",
      discount: "68% OFF",
      urgent: true,
      value: "🚀 Atende 5000+ clientes simultâneos",
      testimonial: "89% dos clientes preferem nosso bot - Marina Costa",
    },
    {
      id: 9,
      name: "Lead Generation Turbo",
      price: 147,
      originalPrice: 447,
      period: "/mês",
      description:
        "🎣 MÁQUINA DE LEADS - Geração automática de prospects qualificados",
      features: [
        "IA busca leads qualificados automaticamente",
        "Enriquecimento de dados em tempo real",
        "Validação automática de contatos",
        "Integração com redes sociais",
        "Sistema de pontuação avançado",
        "Database ilimitado + LGPD compliance",
      ],
      icon: <Rocket className="h-6 w-6 text-pink-600" />,
      category: "Geração",
      discount: "67% OFF",
      urgent: true,
      value: "��� 500+ leads qualificados/mês",
      testimonial: "1000 leads qualificados no primeiro mês - Diego Santos",
    },
    {
      id: 10,
      name: "Voice AI Assistant",
      price: 189,
      originalPrice: 597,
      period: "/mês",
      description:
        "🎙️ ASSISTENTE DE VOZ IA - Atendimento telefônico 100% automatizado",
      features: [
        "Voz natural indistinguível de humano",
        "Atendimento telefônico 24/7",
        "Agendamento de consultas por voz",
        "Integração com telefonia empresarial",
        "Transcrição e análise automática",
        "Multi-idiomas com sotaque regional",
      ],
      icon: <HeadphonesIcon className="h-6 w-6 text-violet-600" />,
      category: "Atendimento",
      discount: "68% OFF",
      urgent: true,
      value: "📞 Atende 200 ligações simultâneas",
      testimonial: "Nossos clientes não conseguem distinguir - Lucas Ferreira",
    },
  ];

  // Estado para módulos selecionados
  const [selectedModules, setSelectedModules] = useState<number[]>([]);
  const [selectedBasePlan, setSelectedBasePlan] = useState(1); // Professional por padrão
  const [showCheckout, setShowCheckout] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 47,
    seconds: 32,
  });

  // Estados para IA Consultant
  const [aiMessages, setAiMessages] = useState([
    {
      type: "ai",
      text: "👋 Olá! Sou sua consultora de automação. Conte-me sobre seu negócio e vou recomendar os módulos ideais para você!",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState([]);

  // Funções para controlar seleção de módulos
  const toggleModule = (moduleId: number) => {
    setSelectedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId],
    );
  };

  const selectBasePlan = (planIndex: number) => {
    setSelectedBasePlan(planIndex);
  };

  const calculateTotal = () => {
    const basePlanPrice = basePlans[selectedBasePlan]?.price || 0;
    const modulesPrice = selectedModules.reduce((total, moduleId) => {
      const module = modules.find((m) => m.id === moduleId);
      return total + (module?.price || 0);
    }, 0);
    return basePlanPrice + modulesPrice;
  };

  const calculateOriginalTotal = () => {
    const basePlanPrice = basePlans[selectedBasePlan]?.originalPrice || 0;
    const modulesPrice = selectedModules.reduce((total, moduleId) => {
      const module = modules.find((m) => m.id === moduleId);
      return total + (module?.originalPrice || 0);
    }, 0);
    return basePlanPrice + modulesPrice;
  };

  const getSelectedModulesData = () => {
    return modules.filter((module) => selectedModules.includes(module.id));
  };

  const getTotalSavings = () => {
    return calculateOriginalTotal() - calculateTotal();
  };

  // Função para processar mensagem da IA
  const processAiMessage = async (userMessage: string) => {
    setIsAiTyping(true);

    // Simular processamento da IA
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const lowerMessage = userMessage.toLowerCase();
    let aiResponse = "";
    let recommendations = [];

    // Lógica simples de recomendação baseada em palavras-chave
    if (
      lowerMessage.includes("restaurante") ||
      lowerMessage.includes("lanchonete") ||
      lowerMessage.includes("comida")
    ) {
      aiResponse =
        "🍽️ Perfeito! Para restaurantes, recomendo: WhatsApp para pedidos automáticos, Google Calendar para reservas e E-mail Marketing para promoções. Quantas mesas você tem aproximadamente?";
      recommendations = [1, 3, 6]; // WhatsApp, Calendar, Email
    } else if (
      lowerMessage.includes("clínica") ||
      lowerMessage.includes("médico") ||
      lowerMessage.includes("consultório")
    ) {
      aiResponse =
        "🏥 Excelente! Para clínicas, sugiro: WhatsApp para agendamentos, Google Calendar para consultas, CRM para pacientes e Voice AI para atendimento telefônico. Quantos pacientes vocês atendem por dia?";
      recommendations = [1, 3, 7, 10]; // WhatsApp, Calendar, CRM, Voice AI
    } else if (
      lowerMessage.includes("loja") ||
      lowerMessage.includes("ecommerce") ||
      lowerMessage.includes("vendas")
    ) {
      aiResponse =
        "🛍️ Ótimo! Para lojas, indico: WhatsApp Business, Meta Business para redes sociais, IA Analytics para vendas e CRM para clientes. Você vende online ou físico?";
      recommendations = [1, 2, 5, 7]; // WhatsApp, Meta, IA Analytics, CRM
    } else if (
      lowerMessage.includes("salão") ||
      lowerMessage.includes("beleza") ||
      lowerMessage.includes("estética")
    ) {
      aiResponse =
        "💇‍♀️ Perfeito para salões! Recomendo: WhatsApp para agendamentos, Google Calendar para horários, Meta Business para mostrar trabalhos e E-mail Marketing para promoções. Quantos profissionais trabalham aí?";
      recommendations = [1, 3, 2, 6]; // WhatsApp, Calendar, Meta, Email
    } else if (
      lowerMessage.includes("número") ||
      lowerMessage.includes("mesa") ||
      lowerMessage.includes("paciente") ||
      lowerMessage.includes("profissional")
    ) {
      aiResponse =
        "📊 Com base no volume que você me disse, vejo que seu negócio tem potencial para automação completa! Vou adicionar também o Chatbot IA para atender 24/7 e N8N para automatizar processos. Isso vai economizar muito tempo da sua equipe!";
      recommendations = [...aiRecommendations, 4, 8]; // Adiciona N8N e Chatbot
    } else {
      aiResponse =
        "🤔 Interessante! Me fale mais detalhes sobre seu negócio. Que tipo de empresa é? Quantos clientes vocês atendem por dia? Assim posso fazer uma recomendação mais precisa!";
    }

    setAiMessages((prev) => [
      ...prev,
      { type: "user", text: userMessage },
      { type: "ai", text: aiResponse },
    ]);

    if (recommendations.length > 0) {
      setAiRecommendations(recommendations);
      setSelectedModules(recommendations);
    }

    setIsAiTyping(false);
  };

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim()) {
      processAiMessage(userInput);
      setUserInput("");
    }
  };

  const businessTypes = [
    "Clínicas e Consultórios",
    "Salões de Beleza",
    "Restaurantes e Lanchonetes",
    "Lojas e E-commerce",
    "Prestadores de Serviços",
    "Academias e Personal Trainers",
    "Advogados e Contadores",
    "Corretores de Imóveis",
  ];

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8 relative">
            <div className="w-24 h-24 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="https://cdn.builder.io/api/v1/assets/48d3800139714cc4a8c7b3af42e151ce/logo-kryonix-abc9fe?format=webp&width=800"
                alt="KRYONIX Logo"
                className="h-12 w-auto animate-pulse"
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">KRYONIX</h1>
          <p className="text-blue-200 text-lg">
            Transformando ideias em soluções digitais
          </p>
          <div className="mt-8 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <img
                src="https://cdn.builder.io/api/v1/assets/48d3800139714cc4a8c7b3af42e151ce/logo-kryonix-abc9fe?format=webp&width=800"
                alt="KRYONIX Logo"
                className="h-8 sm:h-10 w-auto"
              />
              <div className="hidden sm:block">
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  KRYONIX
                </span>
                <p className="text-xs text-gray-600 hidden md:block">
                  Tecnologia de Ponta
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6 xl:space-x-8">
              <a
                href="#sobre"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Sobre
              </a>
              <a
                href="#servicos"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Serviços
              </a>
              <button
                onClick={() => navigate("/dashboard")}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center"
              >
                <BarChart3 className="h-4 w-4 mr-1" />
                Dashboard
              </button>
              <button
                onClick={() => navigate("/settings")}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center"
              >
                <Settings className="h-4 w-4 mr-1" />
                Configurações
              </button>
              <a
                href="#depoimentos"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Depoimentos
              </a>
            </nav>

            {/* Mobile Navigation */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center space-x-2 sm:space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/login")}
                className="flex items-center"
              >
                <Users className="h-4 w-4 mr-1" />
                Entrar
              </Button>
              <Button
                onClick={() => navigate("/register")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 flex items-center"
                size="sm"
              >
                <Rocket className="h-4 w-4 mr-1" />
                Começar Teste
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-2">
              <a
                href="#sobre"
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sobre
              </a>
              <a
                href="#servicos"
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Serviços
              </a>
              <button
                onClick={() => {
                  navigate("/dashboard");
                  setMobileMenuOpen(false);
                }}
                className="flex items-center w-full py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Dashboard
              </button>
              <button
                onClick={() => {
                  navigate("/settings");
                  setMobileMenuOpen(false);
                }}
                className="flex items-center w-full py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </button>
              <a
                href="#depoimentos"
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Depoimentos
              </a>
              <div className="pt-4 border-t space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigate("/login");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center"
                >
                  <Users className="h-4 w-4 mr-1" />
                  Entrar
                </Button>
                <Button
                  onClick={() => {
                    navigate("/register");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center"
                  size="sm"
                >
                  <Rocket className="h-4 w-4 mr-1" />
                  Começar Teste
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="mb-8">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Rocket className="w-4 h-4 mr-2" />
              Desenvolvimento de software de alta qualidade
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Transformando ideias em
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block mt-2">
              soluções digitais
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Especialistas em React, Node.js, IA e automação. Criamos soluções
            digitais que transformam negócios e melhoram a vida das pessoas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Button
              size="lg"
              className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full sm:w-auto"
              onClick={() =>
                window.open("https://wa.me/5517981805327", "_blank")
              }
            >
              <MessageSquare className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Conversar no WhatsApp
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 w-full sm:w-auto"
              onClick={() =>
                window.open("https://instagram.com/kryon.ix", "_blank")
              }
            >
              @kryon.ix
            </Button>
          </div>
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto">
            <div className="flex items-center justify-center">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
              Full Stack Developer
            </div>
            <div className="flex items-center justify-center">
              <Cpu className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-600" />
              AI Specialist
            </div>
            <div className="flex items-center justify-center">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-orange-600" />
              Automation Expert
            </div>
          </div>
        </div>
      </section>

      {/* Sobre a Kryonix */}
      <section id="sobre" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Sobre a Kryonix
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa Missão
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                A Kryonix nasceu com o propósito de democratizar a tecnologia
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Criamos soluções digitais que transformam negócios e melhoram a
                vida das pessoas. Liderada por{" "}
                <strong>Vitor Jayme Fernandes Ferreira</strong>, nossa equipe
                combina expertise técnica com visão estratégica para entregar
                projetos que superam expectativas.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Especializamos em desenvolvimento full-stack, inteligência
                artificial e automação, sempre utilizando as tecnologias mais
                modernas do mercado.
              </p>
              <div className="flex space-x-4">
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() =>
                    window.open("https://wa.me/5517981805327", "_blank")
                  }
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open("https://instagram.com/kryon.ix", "_blank")
                  }
                >
                  Instagram
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F48d3800139714cc4a8c7b3af42e151ce%2F7069598011f34443acf1743c5cd69264?format=webp&width=800"
                      alt="Vitor Jayme Fernandes Ferreira - CEO KRYONIX"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Vitor Jayme Fernandes Ferreira
                  </h3>
                  <p className="text-blue-600 font-semibold mb-4">
                    CEO & Founder KRYONIX
                  </p>
                  <p className="text-gray-600 text-sm">
                    Especialista em desenvolvimento Full Stack e Inteligência
                    Artificial
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por que escolher a Kryonix */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Por que escolher a Kryonix?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Qualidade Garantida</h3>
                <p className="text-gray-600">Código limpo e documentado</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Entrega Rápida</h3>
                <p className="text-gray-600">Projetos no prazo</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <HeadphonesIcon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Suporte Completo</h3>
                <p className="text-gray-600">Acompanhamento pós-entrega</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nossos Serviços
            </h2>
            <p className="text-xl text-gray-600">
              Soluções completas para seu negócio digital
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Conheça nosso CEO
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden shadow-xl">
              <div className="grid md:grid-cols-2">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F48d3800139714cc4a8c7b3af42e151ce%2F7069598011f34443acf1743c5cd69264?format=webp&width=800"
                        alt="Vitor Jayme Fernandes Ferreira - CEO KRYONIX"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Vitor Jayme</h3>
                    <p className="text-blue-100">CEO Kryonix</p>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Vitor Jayme Fernandes Ferreira
                  </h3>
                  <p className="text-blue-600 font-semibold mb-4">
                    CEO & Founder
                  </p>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Desenvolvedor Full Stack especialista em React, Node.js e
                    Inteligência Artificial. Apaixonado por criar soluções
                    inovadoras que transformam negócios.
                  </p>
                  <div className="flex space-x-4">
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() =>
                        window.open("https://wa.me/5517981805327", "_blank")
                      }
                    >
                      WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        window.open("https://instagram.com/kryon.ix", "_blank")
                      }
                    >
                      Instagram
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-gray-600">
              Resultados que falam por si só
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Consultant */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🤖 Consultora IA Especializada
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Não sabe quais módulos precisa? Nossa IA analisa seu negócio e
              recomenda a solução perfeita em segundos!
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="shadow-2xl border-0 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
                <h3 className="text-2xl font-bold mb-2">
                  💬 Consultoria Gratuita com IA
                </h3>
                <p className="text-purple-100">
                  Conte sobre seu negócio e receba recomendações personalizadas
                </p>
              </div>

              <CardContent className="p-6">
                {/* Chat Messages */}
                <div className="h-80 overflow-y-auto mb-6 space-y-4 bg-gray-50 p-4 rounded-lg">
                  {aiMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                          message.type === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-800 border shadow-sm"
                        }`}
                      >
                        {message.type === "ai" && (
                          <div className="flex items-center mb-2">
                            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-2">
                              <span className="text-white text-xs">🤖</span>
                            </div>
                            <span className="text-xs font-semibold text-purple-600">
                              Consultora IA
                            </span>
                          </div>
                        )}
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </div>
                  ))}

                  {isAiTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white text-gray-800 border shadow-sm max-w-xs px-4 py-3 rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-2">
                            <span className="text-white text-xs">🤖</span>
                          </div>
                          <span className="text-xs font-semibold text-purple-600">
                            Consultora IA
                          </span>
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Form */}
                <form onSubmit={handleAiSubmit} className="flex space-x-2">
                  <Input
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Ex: Tenho uma clínica odontológica com 3 dentistas..."
                    className="flex-1"
                    disabled={isAiTyping}
                  />
                  <Button
                    type="submit"
                    disabled={isAiTyping || !userInput.trim()}
                    className="bg-gradient-to-r from-purple-600 to-blue-600"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </form>

                {/* Quick Suggestions */}
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">
                    💡 Exemplos rápidos:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Tenho um restaurante de 20 mesas",
                      "Clínica com 50 pacientes/dia",
                      "Loja online de roupas",
                      "Salão de beleza com 4 profissionais",
                    ].map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setUserInput(suggestion);
                          processAiMessage(suggestion);
                        }}
                        className="text-xs"
                        disabled={isAiTyping}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* AI Recommendations */}
                {aiRecommendations.length > 0 && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-bold text-green-900 mb-2">
                      ✅ Módulos Recomendados pela IA:
                    </h4>
                    <div className="space-y-2">
                      {aiRecommendations.map((moduleId) => {
                        const module = modules.find((m) => m.id === moduleId);
                        return module ? (
                          <div
                            key={moduleId}
                            className="flex items-center justify-between bg-white p-3 rounded border"
                          >
                            <div className="flex items-center space-x-2">
                              {module.icon}
                              <span className="font-medium">{module.name}</span>
                            </div>
                            <span className="text-green-600 font-bold">
                              R$ {module.price}/mês
                            </span>
                          </div>
                        ) : null;
                      })}
                    </div>
                    <div className="mt-3 text-center">
                      <Button
                        onClick={() => {
                          document
                            .getElementById("pricing-section")
                            ?.scrollIntoView({
                              behavior: "smooth",
                            });
                        }}
                        className="bg-gradient-to-r from-green-600 to-blue-600"
                      >
                        Ver Plano Personalizado Abaixo
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing-section" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🚀 Monte Sua Plataforma de Automação
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              <strong className="text-red-600">OFERTA RELÂMPAGO:</strong>{" "}
              Construa seu plano personalizado com até{" "}
              <strong className="text-green-600">70% OFF</strong> + teste de 7
              dias grátis.
              <br />
              Mais de <strong>2.847 empresas</strong> já transformaram seus
              negócios!
            </p>

            {/* Timer de Urgência */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 rounded-2xl max-w-2xl mx-auto mb-6 shadow-2xl">
              <h3 className="text-2xl font-bold mb-2">⏰ OFERTA EXPIRA EM:</h3>
              <div className="flex justify-center space-x-4 text-center">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl">
                  <div className="text-3xl font-bold">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </div>
                  <div className="text-sm">HORAS</div>
                </div>
                <div className="text-3xl font-bold self-center">:</div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl">
                  <div className="text-3xl font-bold">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </div>
                  <div className="text-sm">MIN</div>
                </div>
                <div className="text-3xl font-bold self-center">:</div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl">
                  <div className="text-3xl font-bold">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                  <div className="text-sm">SEG</div>
                </div>
              </div>
              <p className="text-sm mt-3 opacity-90">
                🔥 Após o prazo, volta ao preço normal (até 300% mais caro)
              </p>
            </div>

            {/* Badges de Prova Social */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                <Award className="w-4 h-4 mr-2" />⭐ 4.9/5 - 1.247 avaliações
              </div>
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                🔒 Garantia 60 dias
              </div>
              <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                <Users className="w-4 h-4 mr-2" />
                👥 2.847+ empresas ativas
              </div>
            </div>
          </div>

          {!showCheckout ? (
            <>
              {/* Base Plans */}
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
                  1️⃣ Escolha seu Plano Base
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {basePlans.map((plan, index) => (
                    <Card
                      key={index}
                      className={`relative cursor-pointer transition-all duration-300 ${
                        selectedBasePlan === index
                          ? "border-blue-500 shadow-lg scale-105 bg-blue-50"
                          : "hover:shadow-md"
                      } ${plan.popular ? "border-blue-400" : ""} ${plan.isFree ? "border-green-400" : ""}`}
                      onClick={() => selectBasePlan(index)}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                            Mais Popular
                          </span>
                        </div>
                      )}
                      {plan.isFree && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                            Teste Grátis
                          </span>
                        </div>
                      )}
                      {plan.discount && (
                        <div className="absolute -top-2 -right-2">
                          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            {plan.discount}
                          </span>
                        </div>
                      )}
                      <CardHeader className="text-center">
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                        <div className="py-4">
                          {plan.originalPrice > plan.price && (
                            <div className="text-lg text-gray-500 line-through">
                              R$ {plan.originalPrice}
                            </div>
                          )}
                          <span className="text-3xl font-bold text-gray-900">
                            R$ {plan.price}
                          </span>
                          <span className="text-gray-600">{plan.period}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3 mb-6">
                          {plan.features.map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className="flex items-center"
                            >
                              <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                              <span className="text-sm text-gray-700">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <div
                          className={`w-full p-2 rounded text-center text-sm font-medium ${
                            selectedBasePlan === index
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {selectedBasePlan === index
                            ? "✓ Selecionado"
                            : "Clique para Selecionar"}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Modules */}
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">
                  2️⃣ Adicione os Módulos que Precisa
                </h3>
                <p className="text-center text-gray-600 mb-8">
                  Cada módulo turbina seu negócio. Selecione os que fazem
                  sentido para você.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                  {modules.map((module) => (
                    <Card
                      key={module.id}
                      className={`relative cursor-pointer transition-all duration-300 ${
                        selectedModules.includes(module.id)
                          ? "border-green-500 shadow-xl bg-gradient-to-br from-green-50 to-green-100 scale-105"
                          : "hover:shadow-lg hover:scale-102"
                      } ${module.urgent ? "border-2 border-red-400 shadow-lg" : ""}`}
                      onClick={() => toggleModule(module.id)}
                    >
                      {module.urgent && (
                        <div className="absolute -top-3 -left-3 z-10">
                          <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-bounce shadow-lg">
                            🔥 MAIS VENDIDO
                          </span>
                        </div>
                      )}
                      {module.discount && (
                        <div className="absolute -top-3 -right-3 z-10">
                          <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            {module.discount}
                          </span>
                        </div>
                      )}

                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-3 mb-3">
                          {module.icon}
                          <div>
                            <CardTitle className="text-lg font-bold">
                              {module.name}
                            </CardTitle>
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                              {module.category}
                            </span>
                          </div>
                        </div>

                        <div className="text-center mb-3">
                          <div className="text-lg text-gray-500 line-through">
                            R$ {module.originalPrice}/mês
                          </div>
                          <div className="text-3xl font-bold text-blue-600">
                            R$ {module.price}
                          </div>
                          <div className="text-sm text-green-600 font-bold bg-green-100 px-2 py-1 rounded-full mt-1">
                            {module.value}
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <CardDescription className="text-sm mb-4 text-center font-medium">
                          {module.description}
                        </CardDescription>

                        <ul className="space-y-2 mb-4">
                          {module.features
                            .slice(0, 3)
                            .map((feature, featureIndex) => (
                              <li
                                key={featureIndex}
                                className="flex items-center"
                              >
                                <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                                <span className="text-sm text-gray-700">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          {module.features.length > 3 && (
                            <li className="text-sm text-blue-600 text-center font-semibold">
                              +{module.features.length - 3} recursos premium
                              extras
                            </li>
                          )}
                        </ul>

                        {/* Depoimento */}
                        {module.testimonial && (
                          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
                            <p className="text-xs italic text-gray-700">
                              "{module.testimonial}"
                            </p>
                          </div>
                        )}

                        <div
                          className={`w-full p-3 rounded-lg text-center text-sm font-bold transition-all ${
                            selectedModules.includes(module.id)
                              ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                              : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                          }`}
                        >
                          {selectedModules.includes(module.id)
                            ? "✅ ADICIONADO AO SEU PLANO"
                            : "🚀 ADICIONAR AGORA"}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Summary Bar */}
              <div className="sticky bottom-0 bg-white border-t-2 border-blue-600 shadow-lg p-6 mx-auto max-w-4xl rounded-t-2xl">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <div className="text-lg font-bold text-gray-900">
                      Plano: {basePlans[selectedBasePlan]?.name} +{" "}
                      {selectedModules.length} módulos
                    </div>
                    <div className="text-sm text-gray-600">
                      Economia total:{" "}
                      <span className="text-green-600 font-bold">
                        R$ {getTotalSavings()}/mês
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-lg text-gray-500 line-through">
                        R$ {calculateOriginalTotal()}/mês
                      </div>
                      <div className="text-3xl font-bold text-blue-600">
                        R$ {calculateTotal()}/mês
                      </div>
                    </div>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8"
                      onClick={() => setShowCheckout(true)}
                      disabled={
                        selectedModules.length === 0 && selectedBasePlan === 0
                      }
                    >
                      Finalizar Plano
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Checkout Final */
            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden shadow-2xl">
                <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 text-center">
                  <h2 className="text-3xl font-bold mb-2">
                    🎉 Parabéns! Seu Plano Está Pronto
                  </h2>
                  <p className="text-green-100">
                    Você montou uma solução completa de automação para seu
                    negócio!
                  </p>
                </div>

                <CardContent className="p-8">
                  {/* Resumo do Plano */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      📋 Resumo do Seu Plano:
                    </h3>

                    {/* Plano Base */}
                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-blue-900">
                            {basePlans[selectedBasePlan]?.name}
                          </h4>
                          <p className="text-sm text-blue-700">
                            Plano base com todas as funcionalidades essenciais
                          </p>
                        </div>
                        <div className="text-right">
                          {basePlans[selectedBasePlan]?.originalPrice >
                            basePlans[selectedBasePlan]?.price && (
                            <div className="text-sm text-gray-500 line-through">
                              R$ {basePlans[selectedBasePlan]?.originalPrice}
                              /mês
                            </div>
                          )}
                          <div className="text-lg font-bold text-blue-900">
                            R$ {basePlans[selectedBasePlan]?.price}/mês
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Módulos Selecionados */}
                    {getSelectedModulesData().length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-bold text-gray-900">
                          🧩 Módulos Adicionais:
                        </h4>
                        {getSelectedModulesData().map((module) => (
                          <div
                            key={module.id}
                            className="bg-green-50 p-3 rounded-lg"
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-3">
                                {module.icon}
                                <div>
                                  <h5 className="font-semibold text-green-900">
                                    {module.name}
                                  </h5>
                                  <p className="text-xs text-green-700">
                                    {module.value}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm text-gray-500 line-through">
                                  R$ {module.originalPrice}/mês
                                </div>
                                <div className="text-lg font-bold text-green-900">
                                  R$ {module.price}/mês
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Cálculo Final */}
                  <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <div className="space-y-2">
                      <div className="flex justify-between text-lg">
                        <span>Valor original:</span>
                        <span className="line-through text-gray-500">
                          R$ {calculateOriginalTotal()}/mês
                        </span>
                      </div>
                      <div className="flex justify-between text-lg">
                        <span>Sua economia:</span>
                        <span className="text-green-600 font-bold">
                          -R$ {getTotalSavings()}/mês
                        </span>
                      </div>
                      <div className="border-t pt-2 flex justify-between text-2xl font-bold">
                        <span>Total final:</span>
                        <span className="text-blue-600">
                          R$ {calculateTotal()}/mês
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Benefícios Extras */}
                  <div className="bg-yellow-50 p-6 rounded-lg mb-8 border border-yellow-200">
                    <h3 className="text-lg font-bold text-yellow-900 mb-3">
                      🎁 Bônus Exclusivos Inclusos:
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm">
                          7 dias de teste grátis - sem compromisso
                        </span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm">
                          Setup completo gratuito (valor R$ 500)
                        </span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm">
                          Treinamento personalizado da equipe
                        </span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm">
                          Suporte prioritário 24/7 no primeiro mês
                        </span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm">
                          Garantia de 30 dias - dinheiro de volta
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Urgência Final */}
                  <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 rounded-lg mb-6 text-center">
                    <h3 className="text-xl font-bold mb-2">
                      ⚠️ ÚLTIMA CHANCE!
                    </h3>
                    <p className="mb-3">
                      Esta oferta expira em{" "}
                      {String(timeLeft.hours).padStart(2, "0")}:
                      {String(timeLeft.minutes).padStart(2, "0")}:
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </p>
                    <p className="text-sm opacity-90">
                      Após o prazo, o desconto some e você pagará até{" "}
                      <strong>
                        R$ {(calculateOriginalTotal() * 1.5).toLocaleString()}
                        /mês
                      </strong>
                    </p>
                  </div>

                  {/* Social Proof Extrema */}
                  <div className="bg-green-50 p-6 rounded-lg mb-8 border border-green-200">
                    <h3 className="text-lg font-bold text-green-900 mb-4 text-center">
                      🎉 Últimas Empresas que Adquiriram (Hoje):
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>• TechStart Ltda - São Paulo</span>
                        <span className="text-green-600">há 7 min</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• Clínica Dr. Silva - Rio de Janeiro</span>
                        <span className="text-green-600">há 12 min</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• MegaStore Online - Brasília</span>
                        <span className="text-green-600">há 18 min</span>
                      </div>
                      <div className="text-center mt-3 font-semibold text-green-700">
                        +47 empresas adquiriram hoje!
                      </div>
                    </div>
                  </div>

                  {/* Garantias Stack */}
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-sm font-bold">Garantia 60 Dias</div>
                      <div className="text-xs text-gray-600">
                        Dinheiro de volta
                      </div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="text-sm font-bold">Setup Gratuito</div>
                      <div className="text-xs text-gray-600">
                        Valor R$ 2.500
                      </div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-sm font-bold">Suporte VIP</div>
                      <div className="text-xs text-gray-600">
                        Consultor dedicado
                      </div>
                    </div>
                  </div>

                  {/* CTAs Finais */}
                  <div className="text-center space-y-4">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-xl py-8 animate-pulse shadow-2xl"
                      onClick={() => navigate("/register")}
                    >
                      🚀 GARANTIR MINHA VAGA - 14 DIAS GRÁTIS
                    </Button>
                    <p className="text-lg font-bold text-green-600">
                      Economia total: R$ {getTotalSavings()}/mês = R${" "}
                      {(getTotalSavings() * 12).toLocaleString()}/ano
                    </p>
                    <p className="text-sm text-gray-600">
                      ✅ Sem cartão de crédito • ✅ Cancele quando quiser • ✅
                      Setup + treinamento gratuito
                    </p>

                    <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-300">
                      <p className="text-sm text-yellow-800 font-semibold">
                        🎁 <strong>BÔNUS ESPECIAL:</strong> Primeiras 50
                        empresas ganham consultoria estratégica gratuita (valor
                        R$ 5.000)
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setShowCheckout(false)}
                        className="border-gray-300"
                      >
                        ← Voltar e Editar
                      </Button>
                      <Button
                        variant="outline"
                        className="border-green-500 text-green-600 hover:bg-green-50"
                        onClick={() =>
                          window.open("https://wa.me/5517981805327", "_blank")
                        }
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Falar com Especialista (GRÁTIS)
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Perguntas Frequentes
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Como funciona o período gratuito?",
                a: "Você tem 7 dias para testar todas as funcionalidades da plataforma. Não é necessário cartão de crédito para começar.",
              },
              {
                q: "Preciso saber programar?",
                a: "Não! A plataforma é 100% visual. Você só precisa responder algumas perguntas e tudo é configurado automaticamente.",
              },
              {
                q: "Funciona com qualquer tipo de negócio?",
                a: "Sim! Nossa IA se adapta a qualquer segmento: clínicas, lojas, restaurantes, serviços e muito mais.",
              },
              {
                q: "Como é feita a integração com WhatsApp?",
                a: "Simples! Você escaneia um QR Code e sua conta é conectada. A partir daí, a IA responde automaticamente.",
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para transformar sua ideia em realidade?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Entre em contato conosco e vamos conversar sobre seu próximo
            projeto. Transformamos ideias em soluções digitais de sucesso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-3"
              onClick={() =>
                window.open("https://wa.me/5517981805327", "_blank")
              }
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              WhatsApp: (17) 9 8180-5327
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600"
              onClick={() =>
                window.open("https://instagram.com/kryon.ix", "_blank")
              }
            >
              Instagram: @kryon.ix
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="https://cdn.builder.io/api/v1/assets/48d3800139714cc4a8c7b3af42e151ce/logo-kryonix-abc9fe?format=webp&width=800"
                  alt="KRYONIX Logo"
                  className="h-10 w-auto"
                />
                <div>
                  <span className="text-2xl font-bold">KRYONIX</span>
                  <p className="text-xs text-gray-400">Tecnologia de Ponta</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Transformando ideias em soluções digitais inovadoras.
                Desenvolvimento de software de alta qualidade.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Serviços</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Desenvolvimento Web</li>
                <li>Aplicativos Mobile</li>
                <li>Inteligência Artificial</li>
                <li>Automação</li>
                <li>DevOps & Cloud</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <ul className="space-y-2 text-gray-400">
                <li>(17) 9 8180-5327</li>
                <li>
                  <a
                    href="https://wa.me/5517981805327"
                    className="hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/kryon.ix"
                    className="hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @kryon.ix
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#sobre"
                    className="hover:text-white transition-colors"
                  >
                    Sobre
                  </a>
                </li>
                <li>
                  <a
                    href="#servicos"
                    className="hover:text-white transition-colors"
                  >
                    Serviços
                  </a>
                </li>
                <li>
                  <a
                    href="#depoimentos"
                    className="hover:text-white transition-colors"
                  >
                    Depoimentos
                  </a>
                </li>
                <li>
                  <a
                    href="/dashboard"
                    className="hover:text-white transition-colors"
                  >
                    Dashboard
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Kryonix. Todos os direitos reservados.</p>
            <p className="mt-2 text-sm">CEO: Vitor Jayme Fernandes Ferreira</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

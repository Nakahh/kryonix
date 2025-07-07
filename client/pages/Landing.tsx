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
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
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

  const plans = [
    {
      name: "TESTE GRÁTIS",
      price: "R$ 0",
      period: "/7 dias",
      features: [
        "WhatsApp Business básico",
        "IA personalizada limitada",
        "Até 100 mensagens/mês",
        "Suporte por e-mail",
        "Teste todas as funcionalidades",
        "Sem compromisso",
      ],
      popular: false,
      isFree: true,
    },
    {
      name: "STARTER",
      price: "R$ 97",
      period: "/mês",
      features: [
        "WhatsApp Business Integration",
        "IA personalizada para seu negócio",
        "Google Calendar automático",
        "Formulários de captação",
        "Relatórios básicos",
        "Suporte por e-mail",
      ],
      popular: false,
    },
    {
      name: "PROFESSIONAL",
      price: "R$ 147",
      period: "/mês",
      features: [
        "Tudo do Starter",
        "N8N Automation completa",
        "Integração com múltiplas APIs",
        "Workflows automáticos",
        "Backup de configurações",
        "Suporte técnico especializado",
      ],
      popular: true,
    },
    {
      name: "ENTERPRISE",
      price: "R$ 197",
      period: "/mês",
      features: [
        "Tudo do Professional",
        "Meta Business Integration",
        "Instagram + Facebook automático",
        "Analytics avançadas",
        "Campanhas personalizadas",
        "Suporte prioritário 24/7",
      ],
      popular: false,
    },
  ];

  const premiumServices = [
    {
      name: "WhatsApp Business Integration",
      price: "R$ 197",
      period: "/mês",
      status: "INACTIVE",
      description:
        "Integração completa com Evolution API para automação de leads",
      features: [
        "Resposta automática de leads",
        "Distribuição inteligente para corretores",
        "Fallback após 15 minutos",
        "Histórico completo de conversas",
        "Notificações em tempo real",
        "N8N Integration Premium",
      ],
      icon: <MessageSquare className="h-8 w-8 text-green-600" />,
    },
    {
      name: "Meta Business Integration",
      price: "R$ 197",
      period: "/mês",
      status: "INACTIVE",
      description:
        "Integração com Facebook e Instagram para publicação automática",
      features: [
        "Publicação automática Instagram/Facebook",
        "Estatísticas em tempo real",
        "Gestão de campanhas",
        "Auto-posting de imóveis",
        "Analytics avançadas",
        "N8N Integration Premium",
      ],
      icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    },
    {
      name: "Google Calendar Integration",
      price: "R$ 97",
      period: "/mês",
      status: "INACTIVE",
      description: "Agendamento automático de visitas com sincronização",
      features: [
        "Sincronização com Google Calendar",
        "Agendamento automático de visitas",
        "Lembretes por email e WhatsApp",
        "Gestão de disponibilidade",
        "Relatórios de agendamentos",
        "N8N Integration",
      ],
      icon: <Calendar className="h-8 w-8 text-purple-600" />,
    },
    {
      name: "N8N Automation Integration",
      price: "R$ 147",
      period: "/mês",
      status: "INACTIVE",
      description: "Automação completa de processos e integrações com APIs",
      features: [
        "Workflows automáticos",
        "Integração com múltiplas APIs",
        "Processamento de dados",
        "Notificações automáticas",
        "Backup de workflows",
        "Suporte técnico especializado",
      ],
      icon: <Zap className="h-8 w-8 text-orange-600" />,
    },
  ];

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
              <a
                href="#projetos"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Projetos
              </a>
              <a
                href="#depoimentos"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Depoimentos
              </a>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/login")}
                className="hidden sm:inline-flex"
              >
                Entrar
              </Button>
              <Button
                onClick={() => navigate("/register")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-sm sm:text-base px-3 sm:px-4"
                size="sm"
              >
                <span className="hidden sm:inline">Começar Projeto</span>
                <span className="sm:hidden">Começar</span>
              </Button>
            </div>
          </div>
        </div>
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

      {/* Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Escolha Seu Plano
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Comece grátis e escale conforme seu negócio cresce
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto px-4">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${plan.popular ? "border-blue-500 shadow-lg scale-105" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Mais Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="py-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => navigate("/register")}
                  >
                    {plan.name === "GRATUITO"
                      ? "Começar Grátis"
                      : "Escolher Plano"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
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

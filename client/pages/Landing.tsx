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
      name: "GRATUITO",
      price: "R$ 0",
      period: "7 dias grátis",
      features: [
        "IA básica (100 mensagens/mês)",
        "1 integração WhatsApp",
        "Formulários simples",
        "Google Sheets básico",
        "Suporte por comunidade",
      ],
      popular: false,
    },
    {
      name: "PROFISSIONAL",
      price: "R$ 49",
      period: "/mês",
      features: [
        "IA avançada (mensagens ilimitadas)",
        "WhatsApp + E-mail + Calendário",
        "Relatórios em PDF",
        "Cobranças automáticas",
        "Formulários personalizados",
        "Suporte por e-mail",
      ],
      popular: true,
    },
    {
      name: "PREMIUM",
      price: "R$ 99",
      period: "/mês",
      features: [
        "Tudo do Profissional",
        "Multi-atendimento WhatsApp",
        "Campanhas de e-mail",
        "Integração completa Google",
        "Upload ilimitado",
        "Dashboard avançado",
        "Suporte prioritário",
      ],
      popular: false,
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">AutoBiz</span>
          </div>
          <div className="space-x-4">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Entrar
            </Button>
            <Button onClick={() => navigate("/register")}>
              Começar Grátis
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Automatize Seu Negócio com
            <span className="text-blue-600"> Inteligência Artificial</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A primeira plataforma que cria e automatiza todo o atendimento e
            operação do seu negócio. WhatsApp, e-mail, agendamentos, cobranças e
            muito mais - tudo em um só lugar.
          </p>
          <div className="space-x-4">
            <Button
              size="lg"
              className="text-lg px-8 py-3"
              onClick={() => navigate("/register")}
            >
              <Shield className="mr-2 h-5 w-5" />
              Teste Grátis por 7 Dias
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3"
              onClick={() => navigate("/quotation")}
            >
              Quero um Site
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Sem cartão de crédito • Sem compromisso • Resultados em minutos
          </p>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Como Funciona?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Crie sua conta",
                desc: "Cadastro rápido e simples",
              },
              {
                step: "2",
                title: "Responda 3 perguntas",
                desc: "Sobre seu tipo de negócio",
              },
              {
                step: "3",
                title: "IA cria tudo automaticamente",
                desc: "Integrações prontas em segundos",
              },
              {
                step: "4",
                title: "Comece a automatizar",
                desc: "Atenda clientes 24/7 com IA",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Tudo que Você Precisa em Uma Plataforma
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="h-full hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Para Quem É */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Perfeito Para Qualquer Negócio
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {businessTypes.map((type, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg text-center hover:bg-blue-50 transition-colors"
              >
                <p className="font-semibold text-gray-800">{type}</p>
              </div>
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
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto Para Automatizar Seu Negócio?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de empresários que já automatizaram seus
            negócios e aumentaram suas vendas.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-3"
            onClick={() => navigate("/register")}
          >
            Começar Agora - Grátis por 7 Dias
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">AutoBiz</span>
              </div>
              <p className="text-gray-400">
                Automatize seu negócio com inteligência artificial.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Funcionalidades
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Preços
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Integrações
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Status
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Carreira
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AutoBiz. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

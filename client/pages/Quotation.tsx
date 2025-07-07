import React, { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Globe,
  ShoppingCart,
  Settings,
  CreditCard,
  LifeBuoy,
  Calculator,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Quotation = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [quotationData, setQuotationData] = useState({
    // Contact Info
    name: "",
    email: "",
    phone: "",
    company: "",

    // Project Details
    siteType: "",
    pages: 1,
    hasAdminPanel: false,
    hasPaymentIntegration: false,
    hasSupport: false,
    hasResponsiveDesign: true,
    hasHosting: false,
    hasSEO: false,
    additionalFeatures: "",

    // Estimated Price
    estimatedPrice: 0,
  });

  const siteTypes = [
    {
      id: "institutional",
      title: "Site Institucional",
      description: "Site para apresentar sua empresa e serviços",
      icon: <Globe className="h-6 w-6" />,
      basePrice: 800,
    },
    {
      id: "ecommerce",
      title: "Loja Virtual",
      description: "E-commerce completo para vender online",
      icon: <ShoppingCart className="h-6 w-6" />,
      basePrice: 2500,
    },
    {
      id: "system",
      title: "Sistema Personalizado",
      description: "Sistema sob medida para seu negócio",
      icon: <Settings className="h-6 w-6" />,
      basePrice: 5000,
    },
  ];

  const additionalFeatures = [
    { id: "adminPanel", label: "Painel Administrativo", price: 800 },
    {
      id: "paymentIntegration",
      label: "Integração com Pagamentos",
      price: 600,
    },
    { id: "support", label: "Suporte e Manutenção (6 meses)", price: 500 },
    { id: "hosting", label: "Hospedagem Premium (1 ano)", price: 300 },
    { id: "seo", label: "Otimização SEO Avançada", price: 400 },
  ];

  const calculatePrice = () => {
    let price = 0;

    // Base price for site type
    const selectedType = siteTypes.find(
      (type) => type.id === quotationData.siteType,
    );
    if (selectedType) {
      price += selectedType.basePrice;
    }

    // Additional pages (first 5 pages included)
    if (quotationData.pages > 5) {
      price += (quotationData.pages - 5) * 150;
    }

    // Additional features
    if (quotationData.hasAdminPanel) price += 800;
    if (quotationData.hasPaymentIntegration) price += 600;
    if (quotationData.hasSupport) price += 500;
    if (quotationData.hasHosting) price += 300;
    if (quotationData.hasSEO) price += 400;

    return price;
  };

  const handleNext = () => {
    if (step === 2) {
      const price = calculatePrice();
      setQuotationData((prev) => ({ ...prev, estimatedPrice: price }));
    }
    setStep(step + 1);
  };

  const handleFinalize = async () => {
    try {
      // In a real app, send quotation data to backend
      const response = await fetch("/api/quotations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quotationData),
      });

      if (response.ok) {
        // Redirect to login if not authenticated, then to payment
        navigate("/login?redirect=payment&quotationId=" + Date.now());
      }
    } catch (error) {
      console.error("Error creating quotation:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Orçamento Inteligente para Seu Site
          </h1>
          <p className="text-xl text-gray-600">
            Nossa IA vai fazer algumas perguntas para gerar um orçamento
            personalizado
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <React.Fragment key={stepNumber}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= stepNumber
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step > stepNumber ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    stepNumber
                  )}
                </div>
                {stepNumber < 4 && (
                  <ArrowRight
                    className={`h-4 w-4 ${
                      step > stepNumber ? "text-blue-600" : "text-gray-400"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            {step === 1 && (
              <div>
                <CardHeader className="p-0 mb-6">
                  <CardTitle>Informações de Contato</CardTitle>
                  <CardDescription>
                    Precisamos de algumas informações para gerar seu orçamento
                  </CardDescription>
                </CardHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      value={quotationData.name}
                      onChange={(e) =>
                        setQuotationData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={quotationData.email}
                      onChange={(e) =>
                        setQuotationData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefone/WhatsApp</Label>
                    <Input
                      id="phone"
                      value={quotationData.phone}
                      onChange={(e) =>
                        setQuotationData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Empresa</Label>
                    <Input
                      id="company"
                      value={quotationData.company}
                      onChange={(e) =>
                        setQuotationData((prev) => ({
                          ...prev,
                          company: e.target.value,
                        }))
                      }
                      placeholder="Nome da sua empresa"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <CardHeader className="p-0 mb-6">
                  <CardTitle>Tipo de Site</CardTitle>
                  <CardDescription>
                    Selecione o tipo de site que melhor descreve seu projeto
                  </CardDescription>
                </CardHeader>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {siteTypes.map((type) => (
                    <Card
                      key={type.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        quotationData.siteType === type.id
                          ? "ring-2 ring-blue-500 bg-blue-50"
                          : ""
                      }`}
                      onClick={() =>
                        setQuotationData((prev) => ({
                          ...prev,
                          siteType: type.id,
                        }))
                      }
                    >
                      <CardContent className="p-6 text-center">
                        <div className="mb-4 flex justify-center">
                          {type.icon}
                        </div>
                        <h3 className="font-semibold mb-2">{type.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {type.description}
                        </p>
                        <p className="text-lg font-bold text-blue-600">
                          A partir de R$ {type.basePrice.toLocaleString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="pages">Quantas páginas o site terá?</Label>
                    <Input
                      id="pages"
                      type="number"
                      min="1"
                      value={quotationData.pages}
                      onChange={(e) =>
                        setQuotationData((prev) => ({
                          ...prev,
                          pages: parseInt(e.target.value) || 1,
                        }))
                      }
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      As primeiras 5 páginas estão incluídas no preço base
                    </p>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <CardHeader className="p-0 mb-6">
                  <CardTitle>Funcionalidades Extras</CardTitle>
                  <CardDescription>
                    Selecione as funcionalidades adicionais que você precisa
                  </CardDescription>
                </CardHeader>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="adminPanel"
                      checked={quotationData.hasAdminPanel}
                      onCheckedChange={(checked) =>
                        setQuotationData((prev) => ({
                          ...prev,
                          hasAdminPanel: checked as boolean,
                        }))
                      }
                    />
                    <Label htmlFor="adminPanel" className="flex-1">
                      <div className="flex justify-between">
                        <span>Painel Administrativo</span>
                        <span className="text-blue-600 font-semibold">
                          +R$ 800
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Para gerenciar conteúdo do site
                      </p>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="paymentIntegration"
                      checked={quotationData.hasPaymentIntegration}
                      onCheckedChange={(checked) =>
                        setQuotationData((prev) => ({
                          ...prev,
                          hasPaymentIntegration: checked as boolean,
                        }))
                      }
                    />
                    <Label htmlFor="paymentIntegration" className="flex-1">
                      <div className="flex justify-between">
                        <span>Integração com Pagamentos</span>
                        <span className="text-blue-600 font-semibold">
                          +R$ 600
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        PIX, cartão, boleto via Stripe
                      </p>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="support"
                      checked={quotationData.hasSupport}
                      onCheckedChange={(checked) =>
                        setQuotationData((prev) => ({
                          ...prev,
                          hasSupport: checked as boolean,
                        }))
                      }
                    />
                    <Label htmlFor="support" className="flex-1">
                      <div className="flex justify-between">
                        <span>Suporte e Manutenção</span>
                        <span className="text-blue-600 font-semibold">
                          +R$ 500
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">6 meses inclusos</p>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hosting"
                      checked={quotationData.hasHosting}
                      onCheckedChange={(checked) =>
                        setQuotationData((prev) => ({
                          ...prev,
                          hasHosting: checked as boolean,
                        }))
                      }
                    />
                    <Label htmlFor="hosting" className="flex-1">
                      <div className="flex justify-between">
                        <span>Hospedagem Premium</span>
                        <span className="text-blue-600 font-semibold">
                          +R$ 300
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">1 ano incluído</p>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="seo"
                      checked={quotationData.hasSEO}
                      onCheckedChange={(checked) =>
                        setQuotationData((prev) => ({
                          ...prev,
                          hasSEO: checked as boolean,
                        }))
                      }
                    />
                    <Label htmlFor="seo" className="flex-1">
                      <div className="flex justify-between">
                        <span>Otimização SEO</span>
                        <span className="text-blue-600 font-semibold">
                          +R$ 400
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Para aparecer no Google
                      </p>
                    </Label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="additionalFeatures">
                    Funcionalidades Específicas (opcional)
                  </Label>
                  <Textarea
                    id="additionalFeatures"
                    value={quotationData.additionalFeatures}
                    onChange={(e) =>
                      setQuotationData((prev) => ({
                        ...prev,
                        additionalFeatures: e.target.value,
                      }))
                    }
                    placeholder="Descreva outras funcionalidades que você precisa..."
                    rows={3}
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="text-center">
                <div className="mb-8">
                  <Calculator className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Orçamento Calculado!
                  </h2>
                  <p className="text-gray-600">
                    Com base nas informações fornecidas, aqui está seu orçamento
                    personalizado:
                  </p>
                </div>

                <Card className="max-w-md mx-auto mb-8">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">
                        Valor Total do Projeto
                      </p>
                      <p className="text-5xl font-bold text-blue-600 mb-4">
                        R$ {quotationData.estimatedPrice.toLocaleString()}
                      </p>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Entrada (30%)</span>
                          <span>
                            R${" "}
                            {(
                              quotationData.estimatedPrice * 0.3
                            ).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Restante (na entrega)</span>
                          <span>
                            R${" "}
                            {(
                              quotationData.estimatedPrice * 0.7
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <p className="text-gray-600">
                    Prazo de entrega estimado:{" "}
                    <span className="font-semibold">15-30 dias úteis</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    O orçamento final pode variar conforme análise detalhada do
                    projeto
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
          >
            Voltar
          </Button>

          {step < 4 ? (
            <Button
              onClick={handleNext}
              disabled={
                (step === 1 && (!quotationData.name || !quotationData.email)) ||
                (step === 2 && !quotationData.siteType)
              }
            >
              Próximo
            </Button>
          ) : (
            <Button onClick={handleFinalize} size="lg" className="px-8">
              Finalizar Orçamento
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quotation;

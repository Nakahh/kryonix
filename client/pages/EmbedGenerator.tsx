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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Copy,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Settings,
  Palette,
  MessageSquare,
  Zap,
} from "lucide-react";

const EmbedGenerator = () => {
  const [config, setConfig] = useState({
    businessName: "",
    welcomeMessage: "Olá! Como posso ajudar você?",
    primaryColor: "#3B82F6",
    position: "bottom-right",
    chatTitle: "Chat Automático",
    showOnPages: "all",
    responseTime: "instant",
    workingHours: "24/7",
  });

  const [generatedCode, setGeneratedCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const generateEmbedCode = () => {
    setIsGenerating(true);

    // Simulate code generation
    setTimeout(() => {
      const embedCode = `<!-- KRYONIX Chat Widget - Início -->
<div id="kryonix-chat-widget"></div>
<script type="text/javascript">
  (function() {
    // Configurações do chat
    window.KryonixChatConfig = {
      businessName: "${config.businessName}",
      welcomeMessage: "${config.welcomeMessage}",
      primaryColor: "${config.primaryColor}",
      position: "${config.position}",
      chatTitle: "${config.chatTitle}",
      workingHours: "${config.workingHours}",
      apiKey: "kx_" + Math.random().toString(36).substr(2, 16),
      webhookUrl: "https://sua-plataforma.kryonix.com.br/webhook",
      enableAI: true,
      enableNotifications: true,
      enableFileUpload: true,
      maxFileSize: "5MB",
      allowedFileTypes: ["image/jpeg", "image/png", "application/pdf"],
      theme: {
        fontFamily: "Inter, sans-serif",
        borderRadius: "12px",
        shadowColor: "rgba(0, 0, 0, 0.1)"
      },
      features: {
        typing: true,
        readReceipts: true,
        emojiSupport: true,
        autoResponse: true
      }
    };

    // Carregar script do widget
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://cdn.kryonix.com.br/chat-widget-v2.min.js';
    script.onload = function() {
      if (typeof KryonixChat !== 'undefined') {
        KryonixChat.init(window.KryonixChatConfig);
        console.log('✅ KRYONIX Chat Widget carregado com sucesso!');
      }
    };
    script.onerror = function() {
      console.error('❌ Erro ao carregar KRYONIX Chat Widget');
    };
    
    // Inserir no head do documento
    var firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);

    // CSS customizado
    var style = document.createElement('style');
    style.textContent = \`
      #kryonix-chat-widget {
        position: fixed;
        ${config.position.includes("right") ? "right: 20px;" : "left: 20px;"}
        ${config.position.includes("bottom") ? "bottom: 20px;" : "top: 20px;"}
        z-index: 999999;
        font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
      }
      
      .kryonix-chat-button {
        background: linear-gradient(135deg, ${config.primaryColor}, #8B5CF6) !important;
        border-radius: 50% !important;
        width: 60px !important;
        height: 60px !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        transition: all 0.3s ease !important;
      }
      
      .kryonix-chat-button:hover {
        transform: scale(1.1) !important;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2) !important;
      }
      
      .kryonix-chat-window {
        border-radius: 16px !important;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1) !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
        backdrop-filter: blur(10px) !important;
      }
      
      @media (max-width: 768px) {
        .kryonix-chat-window {
          width: calc(100vw - 20px) !important;
          height: calc(100vh - 100px) !important;
          border-radius: 12px !important;
        }
      }
    \`;
    document.head.appendChild(style);
  })();
</script>
<!-- KRYONIX Chat Widget - Fim -->`;

      setGeneratedCode(embedCode);
      setPreviewUrl(
        `https://sua-plataforma.kryonix.com.br/preview?config=${btoa(JSON.stringify(config))}`,
      );
      setIsGenerating(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
  };

  const positions = [
    { value: "bottom-right", label: "Inferior Direito" },
    { value: "bottom-left", label: "Inferior Esquerdo" },
    { value: "top-right", label: "Superior Direito" },
    { value: "top-left", label: "Superior Esquerdo" },
  ];

  const colors = [
    { value: "#3B82F6", label: "Azul", color: "bg-blue-500" },
    { value: "#10B981", label: "Verde", color: "bg-green-500" },
    { value: "#8B5CF6", label: "Roxo", color: "bg-purple-500" },
    { value: "#F59E0B", label: "Amarelo", color: "bg-yellow-500" },
    { value: "#EF4444", label: "Vermelho", color: "bg-red-500" },
    { value: "#6B7280", label: "Cinza", color: "bg-gray-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Code className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Gerador de Código Embed
              </h1>
            </div>
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              KRYONIX Pro
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Configurações Básicas</span>
                </CardTitle>
                <CardDescription>
                  Configure as informações principais do seu chat
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="businessName">Nome do Negócio</Label>
                  <Input
                    id="businessName"
                    value={config.businessName}
                    onChange={(e) =>
                      setConfig({ ...config, businessName: e.target.value })
                    }
                    placeholder="Ex: Minha Empresa"
                  />
                </div>

                <div>
                  <Label htmlFor="chatTitle">Título do Chat</Label>
                  <Input
                    id="chatTitle"
                    value={config.chatTitle}
                    onChange={(e) =>
                      setConfig({ ...config, chatTitle: e.target.value })
                    }
                    placeholder="Ex: Atendimento Online"
                  />
                </div>

                <div>
                  <Label htmlFor="welcomeMessage">
                    Mensagem de Boas-vindas
                  </Label>
                  <Textarea
                    id="welcomeMessage"
                    value={config.welcomeMessage}
                    onChange={(e) =>
                      setConfig({ ...config, welcomeMessage: e.target.value })
                    }
                    rows={3}
                    placeholder="Mensagem que aparecerá quando o chat abrir"
                  />
                </div>

                <div>
                  <Label htmlFor="workingHours">Horário de Funcionamento</Label>
                  <Input
                    id="workingHours"
                    value={config.workingHours}
                    onChange={(e) =>
                      setConfig({ ...config, workingHours: e.target.value })
                    }
                    placeholder="Ex: Seg-Sex 9h às 18h"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="h-5 w-5" />
                  <span>Aparência</span>
                </CardTitle>
                <CardDescription>Personalize o visual do chat</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Cor Principal</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {colors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() =>
                          setConfig({ ...config, primaryColor: color.value })
                        }
                        className={`flex items-center space-x-2 p-2 rounded border ${
                          config.primaryColor === color.value
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200"
                        }`}
                      >
                        <div className={`w-4 h-4 rounded ${color.color}`}></div>
                        <span className="text-sm">{color.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Posição na Tela</Label>
                  <Select
                    value={config.position}
                    onValueChange={(value) =>
                      setConfig({ ...config, position: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map((pos) => (
                        <SelectItem key={pos.value} value={pos.value}>
                          {pos.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={generateEmbedCode}
              disabled={isGenerating || !config.businessName}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
              size="lg"
            >
              {isGenerating ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Gerando...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4" />
                  <span>Gerar Código</span>
                </div>
              )}
            </Button>
          </div>

          {/* Generated Code Panel */}
          <div className="space-y-6">
            {generatedCode ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Código Gerado</span>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyToClipboard}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copiar
                        </Button>
                        {previewUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={previewUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Preview
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={generatedCode}
                      readOnly
                      rows={20}
                      className="font-mono text-xs"
                    />
                  </CardContent>
                </Card>

                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Instruções de Instalação</AlertTitle>
                  <AlertDescription>
                    <ol className="list-decimal list-inside space-y-1 mt-2">
                      <li>Copie todo o código acima</li>
                      <li>Cole antes da tag &lt;/body&gt; do seu site</li>
                      <li>Salve e publique as alterações</li>
                      <li>O chat aparecerá automaticamente</li>
                      <li>Teste enviando uma mensagem</li>
                    </ol>
                  </AlertDescription>
                </Alert>

                <Alert>
                  <MessageSquare className="h-4 w-4" />
                  <AlertTitle>Recursos Incluídos</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li>Resposta automática com IA</li>
                      <li>Design responsivo</li>
                      <li>Notificações sonoras</li>
                      <li>Upload de arquivos</li>
                      <li>Histórico de conversas</li>
                      <li>Integração com WhatsApp</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Code className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Configure seu chat
                  </h3>
                  <p className="text-gray-600">
                    Preencha as configurações ao lado e clique em "Gerar Código"
                    para criar seu chat personalizado.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmbedGenerator;

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Olá! 👋 Sou sua assistente virtual. Como posso ajudar você hoje?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses = {
    greeting: ["oi", "olá", "hello", "hi", "bom dia", "boa tarde", "boa noite"],
    pricing: ["preço", "valor", "quanto custa", "plano", "custo"],
    features: ["funcionalidades", "recursos", "o que faz", "como funciona"],
    whatsapp: ["whatsapp", "zap", "número", "conectar whatsapp"],
    trial: ["teste grátis", "trial", "gratuito", "experimentar"],
    quotation: ["orçamento", "site", "criar site", "desenvolvimento"],
  };

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (
      predefinedResponses.greeting.some((word) => lowerMessage.includes(word))
    ) {
      return "Olá! Bem-vindo à AutoBiz! 🚀 Somos a plataforma que automatiza seu negócio com IA. Como posso ajudar você hoje?";
    }

    if (
      predefinedResponses.pricing.some((word) => lowerMessage.includes(word))
    ) {
      return "Nossos planos são: 💳\n\n• GRATUITO: 7 dias para testar\n• PROFISSIONAL: R$ 49/mês\n• PREMIUM: R$ 99/mês\n\nQuer saber mais sobre algum plano específico?";
    }

    if (
      predefinedResponses.features.some((word) => lowerMessage.includes(word))
    ) {
      return "Nossa plataforma oferece: ⚡\n\n• WhatsApp automático com IA\n• E-mail marketing\n• Agendamentos inteligentes\n• Cobranças automáticas\n• Relatórios em PDF\n• Formulários personalizados\n\nTudo 100% automatizado!";
    }

    if (
      predefinedResponses.whatsapp.some((word) => lowerMessage.includes(word))
    ) {
      return "Para conectar seu WhatsApp é super simples! 📱\n\n1. Faça seu cadastro gratuito\n2. Entre no painel\n3. Escaneie o QR Code\n4. Pronto! Sua IA já estará respondendo clientes 24/7\n\nQuer começar agora?";
    }

    if (predefinedResponses.trial.some((word) => lowerMessage.includes(word))) {
      return "Sim! Oferecemos 7 dias TOTALMENTE GRÁTIS! 🎉\n\nVocê pode testar todas as funcionalidades sem pagar nada. Não precisamos nem do seu cartão de crédito.\n\nQuer começar seu teste agora?";
    }

    if (
      predefinedResponses.quotation.some((word) => lowerMessage.includes(word))
    ) {
      return "Criamos sites personalizados! 🌐\n\nNossa IA faz algumas perguntas e gera um orçamento na hora:\n• Sites institucionais\n• Lojas virtuais\n• Sistemas personalizados\n\nQuer fazer um orçamento grátis?";
    }

    // Default response
    return "Interessante! 🤔 Para uma resposta mais específica, recomendo falar com nossa equipe de vendas ou começar seu teste grátis de 7 dias. Posso ajudar com mais alguma coisa?";
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(
      () => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: getAIResponse(inputMessage),
          isBot: true,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
      },
      1000 + Math.random() * 1000,
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickActions = [
    { label: "Ver Preços", action: "quanto custa" },
    { label: "Começar Grátis", action: "teste grátis" },
    { label: "WhatsApp", action: "conectar whatsapp" },
    { label: "Orçamento Site", action: "orçamento site" },
  ];

  const handleQuickAction = (action: string) => {
    setInputMessage(action);
    setTimeout(() => sendMessage(), 100);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-blue-600 hover:bg-blue-700"
          size="lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        <div className="absolute -top-2 -left-2">
          <Badge className="bg-red-500 text-white animate-pulse">1</Badge>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card
        className={`w-80 shadow-xl transition-all duration-300 ${
          isMinimized ? "h-16" : "h-96"
        }`}
      >
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm">Assistente AutoBiz</CardTitle>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-500">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8 p-0"
              >
                {isMinimized ? (
                  <Maximize2 className="h-4 w-4" />
                ) : (
                  <Minimize2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-4 pt-0 flex flex-col h-80">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-lg text-sm ${
                      message.isBot
                        ? "bg-gray-100 text-gray-900"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.isBot && (
                        <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      )}
                      {!message.isBot && (
                        <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="whitespace-pre-line">
                        {message.content}
                      </div>
                    </div>
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg text-sm">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-2">Ações rápidas:</p>
                <div className="flex flex-wrap gap-1">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-7"
                      onClick={() => handleQuickAction(action.action)}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="flex-1 text-sm"
                disabled={isTyping}
              />
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isTyping}
                size="sm"
                className="px-3"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ChatBubble;

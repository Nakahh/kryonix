# 🚀 KRYONIX - Plataforma SaaS de Automação com IA

Uma plataforma completa para automatizar negócios com Inteligência Artificial, WhatsApp, e-mail, agendamentos e muito mais.

## ✨ Características Principais

- **🤖 IA Personalizada**: Configure prompts específicos para seu negócio
- **📱 WhatsApp Automático**: Conecte via QR Code e responda clientes 24/7
- **📧 E-mail Marketing**: Campanhas automáticas e follow-up de leads
- **📅 Agendamentos**: Integração com Google Calendar
- **💰 Pagamentos**: PIX, cartão e boleto via Stripe
- **📊 Dashboard Moderno**: Interface estilo Power BI
- **🔧 Configuração Visual**: Tudo pelo dashboard, sem código
- **📱 Chat Embed**: Adicione no seu site em 1 clique
- **📈 Relatórios PDF**: Geração automática de relatórios

## 🎯 Para Quem É

- **Clínicas e Consultórios**: Agendamentos automáticos
- **Salões de Beleza**: Confirmações e lembretes
- **Restaurantes**: Pedidos e reservas pelo WhatsApp
- **Lojas Online**: Atendimento e vendas automatizadas
- **Prestadores de Serviços**: Orçamentos e agendamentos
- **Qualquer Negócio**: Automação personalizada

## 🚀 Instalação Rápida

### 1. Pré-requisitos

```bash
# Instale Node.js 18+
# Instale Docker e Docker Compose
# Clone o repositório
git clone https://github.com/seu-usuario/kryonix-saas
cd kryonix-saas
```

### 2. Configuração do Ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite com suas chaves de API (será configurado pelo dashboard)
nano .env
```

### 3. Inicie o Sistema

```bash
# Suba todos os serviços
docker-compose up -d

# Aguarde alguns segundos e acesse:
# Frontend: http://localhost:3000
# N8N: http://localhost:5678
# Admin: http://localhost:3000/admin?token=admin-secret-2024
```

## 🔧 URLs de Acesso

| Serviço            | URL                                                 | Credenciais            |
| ------------------ | --------------------------------------------------- | ---------------------- |
| **Site Principal** | http://localhost:3000                               | -                      |
| **Dashboard**      | http://localhost:3000/dashboard                     | Faça login             |
| **Configurações**  | http://localhost:3000/settings                      | Painel admin           |
| **Gerador Embed**  | http://localhost:3000/embed                         | Código do chat         |
| **N8N Workflows**  | http://localhost:5678                               | admin / admin_n8n_2024 |
| **Admin Secreto**  | http://localhost:3000/admin?token=admin-secret-2024 | Token especial         |

## 📋 Configuração Pelo Dashboard

### 1. Acesse as Configurações

1. Vá para http://localhost:3000/settings
2. Configure uma por uma as integrações
3. Teste cada conexão com o botão "Testar"

### 2. APIs Necessárias (Todas Gratuitas)

#### 🤖 OpenAI (IA)

1. Acesse [platform.openai.com](https://platform.openai.com)
2. Crie uma conta e vá em "API Keys"
3. Gere uma nova chave
4. Cole no campo "OpenAI API Key"
5. Clique em "Testar"

#### 📊 Google APIs (Calendar + Sheets)

1. Vá para [console.cloud.google.com](https://console.cloud.google.com)
2. Crie um novo projeto
3. Ative as APIs:
   - Google Calendar API
   - Google Sheets API
4. Crie credenciais OAuth 2.0
5. Cole Client ID e Client Secret
6. Teste a conexão

#### 💳 Stripe (Pagamentos)

1. Acesse [dashboard.stripe.com](https://dashboard.stripe.com)
2. Vá em "Developers" > "API keys"
3. Copie a "Secret key" (test mode)
4. Configure webhook para pagamentos
5. Cole no dashboard e teste

#### 📧 Resend (E-mails)

1. Vá para [resend.com](https://resend.com)
2. Crie uma conta gratuita
3. Gere uma API Key
4. Cole no dashboard
5. Teste o envio

### 3. Configure o N8N

1. Acesse http://localhost:5678
2. Faça login com `admin` / `admin_n8n_2024`
3. Importe o workflow de `n8n-workflows/saas-automation-template.json`
4. Configure as credenciais (OpenAI, Google, etc)
5. Ative o workflow
6. Copie a URL do webhook gerada

## 🎨 Personalizando Seu Chat

### 1. Gerador de Código

1. Acesse http://localhost:3000/embed
2. Configure:
   - Nome do seu negócio
   - Mensagem de boas-vindas
   - Cores e posição
   - Horários de funcionamento
3. Clique em "Gerar Código"
4. Copie e cole no seu site

### 2. Exemplo de Código Gerado

```html
<!-- KRYONIX Chat Widget -->
<div id="kryonix-chat-widget"></div>
<script>
  window.KryonixChatConfig = {
    businessName: "Minha Empresa",
    welcomeMessage: "Olá! Como posso ajudar?",
    primaryColor: "#3B82F6",
    position: "bottom-right",
  };
  // Script de carregamento automático
</script>
<!-- Fim KRYONIX Chat Widget -->
```

## 📱 WhatsApp - Conexão Rápida

### 1. No Dashboard

1. Vá para a seção "WhatsApp Business"
2. Clique em "Conectar"
3. Escaneie o QR Code com seu WhatsApp
4. Aguarde confirmação
5. Teste enviando uma mensagem

### 2. Configurar Respostas

1. Configure o prompt da IA na seção "IA Personalizada"
2. Exemplo para clínica:

```
Você é assistente da Clínica Saúde Total.
Responda perguntas sobre consultas,
agende horários e seja sempre educado.
Horários: Segunda a Sexta das 8h às 18h.
```

## 📊 Relatórios e Métricas

### Dashboard Automático

O dashboard mostra em tempo real:

- **Mensagens processadas** este mês
- **Leads capturados** via chat
- **Agendamentos** confirmados
- **Receita gerada** via automação
- **Taxa de conversão** de leads
- **Tempo médio** de resposta

### Relatórios PDF

1. Clique em "Gerar Relatório PDF"
2. Escolha o período
3. Download automático com:
   - Resumo de atividades
   - Gráficos de performance
   - Lista de leads e conversões

## 🔒 Segurança e Backup

### Configurações Seguras

```bash
# Altere senhas padrão
docker-compose down
# Edite docker-compose.yml com senhas fortes
docker-compose up -d

# Configure backup automático do banco
# Logs em /var/log/kryonix/
```

### Acesso Admin

- URL: `/admin?token=admin-secret-2024`
- **IMPORTANTE**: Altere o token em produção
- Monitore: usuários, pagamentos, erros
- Notificações via Discord/Slack

## 🆘 Resolução de Problemas

### N8N não conecta

```bash
docker-compose logs n8n
# Verifique se está rodando na porta 5678
curl http://localhost:5678/healthz
```

### WhatsApp desconecta

1. Gere novo QR Code no dashboard
2. Escaneie novamente
3. Verifique logs do WppConnect

### OpenAI não responde

1. Verifique créditos na conta OpenAI
2. Teste API Key no dashboard
3. Monitore rate limits

### Erro de banco de dados

```bash
docker-compose down
docker-compose up postgres -d
# Aguarde 30 segundos
docker-compose up -d
```

## 🚀 Deploy em Produção

### VPS Recomendado

- **Mínimo**: 2GB RAM, 2 CPUs, 20GB SSD
- **Recomendado**: 4GB RAM, 4 CPUs, 40GB SSD
- **OS**: Ubuntu 22.04 LTS

### Configuração SSL

```bash
# Instale Nginx
sudo apt install nginx certbot

# Configure SSL com Let's Encrypt
sudo certbot --nginx -d seudominio.com

# Configure proxy reverso
# /etc/nginx/sites-available/kryonix
```

### Monitoramento

- **Uptime**: UptimeRobot ou similar
- **Logs**: Centralizados via Docker
- **Alertas**: Discord/Slack webhooks
- **Backup**: Automático diário do PostgreSQL

## 📞 Suporte KRYONIX

**CEO**: Vitor Jayme Fernandes Ferreira

- **WhatsApp**: (17) 9 8180-5327
- **Instagram**: @kryon.ix
- **E-mail**: contato@kryonix.com.br

### Comunidade

- **Discord**: [Link da comunidade]
- **Documentação**: [docs.kryonix.com.br]
- **Tutoriais**: [YouTube Channel]

## 🏆 Cases de Sucesso

### Clínica Dr. Silva

- **Resultado**: 300% mais agendamentos
- **ROI**: Pagou o investimento em 2 semanas
- **Automação**: 90% das consultas agendadas via WhatsApp

### Loja Fashion Store

- **Resultado**: R$ 50k em vendas pelo chat
- **Conversão**: 25% dos visitantes viraram clientes
- **Automação**: Catálogo automático via IA

## 📝 Licença

Este projeto é propriedade da **KRYONIX** - Todos os direitos reservados.

Para licenciamento comercial, entre em contato:

- **WhatsApp**: (17) 9 8180-5327
- **E-mail**: comercial@kryonix.com.br

---

**KRYONIX** - Transformando ideias em soluções digitais 🚀

_Desenvolvido com ❤️ por Vitor Jayme Fernandes Ferreira_

# 🚀 AutoBiz SaaS - Guia Completo de Instalação

## Visão Geral do Sistema

O AutoBiz é uma plataforma SaaS completa que permite a qualquer pessoa automatizar seu negócio com IA, incluindo:

- **Landing Page** com marketing e conversão
- **Sistema de Orçamentos** automatizado com IA
- **Dashboard do Usuário** com módulos de automação
- **Painel Admin Secreto** para monitoramento
- **Chat IA** flutuante em todas as páginas
- **Integração N8N** para workflows automáticos
- **WhatsApp, E-mail, Calendar** e muito mais

## 📋 Pré-requisitos

### Software Necessário

- Docker & Docker Compose
- Node.js 18+ (para desenvolvimento)
- Git

### Contas Externas (Todas Gratuitas)

1. **OpenAI** - Para IA conversacional
2. **Google Cloud** - Calendar, Sheets, OAuth
3. **Stripe** - Pagamentos (PIX, cartão)
4. **Resend** - Envio de e-mails
5. **Cloudinary** - Upload de arquivos (opcional)

## 🔧 Instalação Rápida

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/autobiz-saas
cd autobiz-saas
```

### 2. Configure Variáveis de Ambiente

```bash
cp .env.example .env
# Edite o arquivo .env com suas chaves de API
```

### 3. Inicie com Docker

```bash
docker-compose up -d
```

### 4. Configure o Banco de Dados

```bash
# Entre no container da API
docker exec -it autobiz-api bash

# Execute as migrações do Prisma
npx prisma migrate deploy
npx prisma generate
npx prisma db seed
```

## 🌐 URLs de Acesso

Após a instalação, você terá acesso aos seguintes serviços:

| Serviço               | URL                                                 | Credenciais                       |
| --------------------- | --------------------------------------------------- | --------------------------------- |
| **Site Público**      | http://localhost:3000                               | -                                 |
| **Dashboard Usuário** | http://localhost:3000/dashboard                     | Criar conta                       |
| **Admin Secreto**     | http://localhost:3000/admin?token=admin-secret-2024 | Token especial                    |
| **N8N**               | http://localhost:5678                               | admin / admin_n8n_2024            |
| **PgAdmin**           | http://localhost:5050                               | admin@autobiz.com / admin_pg_2024 |
| **API**               | http://localhost:3001                               | -                                 |

## ⚙️ Configuração das Integrações

### 1. OpenAI (IA)

1. Acesse [OpenAI Platform](https://platform.openai.com)
2. Crie uma API Key
3. Adicione em `.env`: `OPENAI_API_KEY="sk-..."`

### 2. Google APIs

1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie um projeto novo
3. Ative as APIs:
   - Google Calendar API
   - Google Sheets API
   - Google OAuth2
4. Crie credenciais OAuth 2.0
5. Adicione em `.env`:
   ```
   GOOGLE_CLIENT_ID="seu-client-id"
   GOOGLE_CLIENT_SECRET="seu-client-secret"
   ```

### 3. Stripe (Pagamentos)

1. Acesse [Stripe Dashboard](https://dashboard.stripe.com)
2. Pegue as chaves de API (test mode)
3. Configure webhook para: `http://seu-dominio.com/api/webhooks/stripe`
4. Adicione em `.env`:
   ```
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   ```

### 4. Resend (E-mail)

1. Acesse [Resend](https://resend.com)
2. Crie uma API Key
3. Adicione em `.env`: `RESEND_API_KEY="re_..."`

## 🤖 Configuração do N8N

### 1. Importar Workflow Base

1. Acesse http://localhost:5678
2. Faça login com: `admin` / `admin_n8n_2024`
3. Clique em "Import workflow"
4. Cole o conteúdo de `n8n-workflows/saas-automation-template.json`

### 2. Configurar Credenciais

No N8N, configure:

- **OpenAI**: Sua API Key
- **Google**: OAuth credentials
- **Email**: Configurações SMTP
- **HTTP Request**: URLs da sua API

### 3. Ativar o Workflow

1. Clique em "Active" no workflow importado
2. Copie a URL do webhook gerada
3. Configure no backend em `N8N_WEBHOOK_URL`

## 👥 Testando o Sistema

### 1. Teste o Fluxo Completo de Usuário

1. Acesse http://localhost:3000
2. Clique em "Criar Conta"
3. Preencha os dados e crie uma conta
4. No dashboard, teste conectar o WhatsApp
5. Configure a IA personalizada
6. Teste o chat bubble

### 2. Teste o Sistema de Orçamentos

1. Na homepage, clique em "Quero um Site"
2. Preencha o formulário guiado
3. Veja o orçamento gerado pela IA
4. Complete o processo de "pagamento"
5. Verifique se o alerta aparece no painel admin

### 3. Teste o Painel Admin

1. Acesse http://localhost:3000/admin?token=admin-secret-2024
2. Veja métricas, usuários e orçamentos
3. Monitore alertas do sistema

## 🔒 Segurança em Produção

### 1. Configurações Obrigatórias

```bash
# Gere senhas seguras
openssl rand -base64 32  # Para JWT_SECRET
openssl rand -base64 32  # Para database passwords

# Configure SSL/HTTPS
# Use certificados Let's Encrypt com Nginx
```

### 2. Variáveis de Ambiente Seguras

- **NUNCA** commite arquivos `.env`
- Use gerenciadores de secrets em produção
- Altere todas as senhas padrão

### 3. Firewall e Rede

- Exponha apenas as portas 80 e 443
- Configure rate limiting no Nginx
- Use VPC privada para bancos de dados

## 📊 Monitoramento

### 1. Logs do Sistema

```bash
# Ver logs em tempo real
docker-compose logs -f api
docker-compose logs -f n8n
```

### 2. Métricas do Banco

- Use PgAdmin em http://localhost:5050
- Monitor queries lentas
- Configure backups automáticos

### 3. Alertas

- Configure webhooks no Discord/Slack
- Monitor uptime com serviços externos
- Configure alertas de erro via e-mail

## 🚀 Deploy em Produção

### 1. VPS/Cloud

```bash
# Em um VPS Ubuntu 22.04
sudo apt update && sudo apt install docker.io docker-compose git

# Clone e configure
git clone seu-repositorio
cd autobiz-saas
cp .env.example .env
# Configure suas APIs no .env

# Inicie em produção
docker-compose up -d
```

### 2. Domínio e SSL

1. Aponte seu domínio para o IP do VPS
2. Configure SSL com Let's Encrypt
3. Atualize URLs no `.env`

### 3. Monitoramento Contínuo

- Configure backup automático do banco
- Monitor de uptime (UptimeRobot)
- Logs centralizados (opcional)

## 🆘 Resolução de Problemas

### Erro: "Cannot connect to database"

```bash
# Verifique se o PostgreSQL está rodando
docker-compose ps
docker-compose logs postgres
```

### Erro: "N8N webhook not responding"

```bash
# Reinicie o N8N
docker-compose restart n8n
# Verifique se o workflow está ativo
```

### Erro: "OpenAI API rate limit"

```bash
# Verifique se sua API key é válida
# Monitore usage no OpenAI dashboard
```

## 📞 Suporte

Se encontrar problemas:

1. **Verifique os logs**: `docker-compose logs [serviço]`
2. **Issues no GitHub**: Crie uma issue detalhada
3. **Documentação**: Consulte a documentação das APIs
4. **Comunidade**: Discord/Telegram da comunidade

## 🎉 Próximos Passos

Após a instalação:

1. **Personalize o branding** nas páginas
2. **Configure integrações específicas** do seu negócio
3. **Crie workflows customizados** no N8N
4. **Configure backup automático**
5. **Monitore métricas de uso**

Parabéns! Seu sistema AutoBiz SaaS está funcionando! 🚀

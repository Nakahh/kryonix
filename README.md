# 🚀 KRYONIX - Plataforma SaaS de Automação com IA

Uma plataforma completa de automação empresarial com inteligência artificial, WhatsApp Business, integrações avançadas e workflows automáticos.

## 🌟 Características Principais

- ✅ **Consultora IA Integrada** - Recomenda módulos personalizados
- ✅ **WhatsApp Business Premium** - Automação completa de leads
- ✅ **Meta Business Integration** - Instagram + Facebook automático
- ✅ **N8N Automation** - Workflows empresariais avançados
- ✅ **CRM Inteligente** - Gestão de clientes com IA
- ✅ **Voice AI Assistant** - Atendimento telefônico automatizado
- ✅ **Dashboard Analytics** - Métricas em tempo real
- ✅ **Sistema Modular** - Pague apenas pelo que usar

## 🎯 Deploy Rápido (3 comandos)

```bash
# 1. Clone o projeto
git clone <seu-repositorio> kryonix && cd kryonix

# 2. Configure as variáveis (edite o .env)
cp .env.example .env

# 3. Execute o deploy automatizado
bash deploy.sh
```

## 💻 Deploy Manual Local

### Pré-requisitos

- Node.js 18+
- Docker & Docker Compose
- Git

### Instalação

```bash
# 1. Clone e instale dependências
git clone <repositorio> kryonix
cd kryonix
npm install

# 2. Configure ambiente
cp .env.example .env
# Edite o .env com suas chaves de API

# 3. Inicie serviços
docker-compose up -d
npm run dev
```

### URLs de Acesso

- **App Principal**: http://localhost:3001
- **Admin Panel**: http://localhost:3001/admin?token=admin-secret-2024
- **N8N Workflows**: http://localhost:5678 (admin/admin123)
- **PgAdmin**: http://localhost:5050 (admin@kryonix.com/admin123)

## 🌩️ Deploy na AWS EC2 (Grátis)

### Tutorial Completo

Veja o arquivo [DEPLOY_TUTORIAL.md](./DEPLOY_TUTORIAL.md) para instruções completas de deploy na AWS EC2 com tier gratuito.

### Resumo Rápido

1. **Criar instância EC2** (t2.micro - grátis)
2. **SSH na instância**: `ssh -i key.pem ubuntu@IP`
3. **Clonar projeto**: `git clone <repo> && cd kryonix`
4. **Executar deploy**: `bash deploy.sh`

## 🔧 Configuração de APIs

### APIs Obrigatórias

```bash
# OpenAI (para IA)
OPENAI_API_KEY=sk-...

# Resend (para emails)
RESEND_API_KEY=re_...

# Stripe (para pagamentos)
STRIPE_SECRET_KEY=sk_test_...
```

### APIs Opcionais

```bash
# Google (Calendar/Drive)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Meta (Instagram/Facebook)
META_APP_ID=...
META_APP_SECRET=...
```

## 🤖 Como Funciona a IA Consultant

A IA analisa a descrição do negócio e recomenda módulos automaticamente:

1. **Cliente descreve negócio**: "Tenho uma clínica com 3 dentistas"
2. **IA processa e pergunta**: "Quantos pacientes atendem por dia?"
3. **IA recomenda módulos**: WhatsApp + Calendar + CRM + Voice AI
4. **Cliente vê plano personalizado** com preços

### Exemplos de Uso

```
🏥 "Clínica odontológica" → WhatsApp + Calendar + CRM
🍽️ "Restaurante 20 mesas" → WhatsApp + Meta + Email
🛍️ "Loja online" → WhatsApp + Meta + IA Analytics + CRM
💇 "Salão de beleza" → WhatsApp + Calendar + Meta + Email
```

## 📊 Módulos Disponíveis

| Módulo                    | Preço/mês | Funcionalidade                  |
| ------------------------- | --------- | ------------------------------- |
| WhatsApp Business Premium | R$ 105    | Automação completa de leads     |
| Meta Business Integration | R$ 168    | Instagram + Facebook automático |
| Google Calendar Pro       | R$ 63     | Agendamentos automáticos        |
| N8N Automation Premium    | R$ 126    | Workflows empresariais          |
| IA Advanced Analytics     | R$ 147    | Análise preditiva com IA        |
| E-mail Marketing Pro      | R$ 84     | Campanhas automatizadas         |
| CRM Inteligente           | R$ 105    | Gestão de clientes com IA       |
| Chatbot IA Avançado       | R$ 126    | Atendimento 24/7                |
| Lead Generation Turbo     | R$ 147    | Geração automática de leads     |
| Voice AI Assistant        | R$ 189    | Atendimento telefônico IA       |

## 🎨 Estrutura do Projeto

```
kryonix/
├── client/                 # Frontend React
│   ├── pages/             # Páginas da aplicação
│   ├── components/        # Componentes reutilizáveis
│   └── lib/              # Utilitários
├── server/                # Backend Node.js
│   ├── routes/           # Rotas da API
│   └── prisma/           # Schema do banco
├── docker-compose.yml    # Serviços (PostgreSQL, N8N)
├── deploy.sh            # Script de deploy automático
└── DEPLOY_TUTORIAL.md   # Tutorial completo AWS
```

## 🔐 Segurança

- ✅ **Autenticação JWT** para usuários
- ✅ **Token de admin** para painel administrativo
- ✅ **Validação de entrada** em todas as rotas
- ✅ **Rate limiting** para APIs
- ✅ **Logs de auditoria** para ações críticas
- ✅ **Backup automático** do banco de dados

## 📱 Responsividade

- ✅ **Mobile First** - Otimizado para celular
- ✅ **Tablet** - Interface adaptada
- ✅ **Desktop** - Experiência completa
- ✅ **Menu Mobile** - Navegação intuitiva

## 🛠️ Comandos Úteis

### Desenvolvimento

```bash
npm run dev          # Inicia desenvolvimento
npm run build        # Build para produção
npm run test         # Executa testes
```

### Produção

```bash
pm2 start ecosystem.config.js    # Inicia com PM2
pm2 status                       # Status da aplicação
pm2 logs                         # Ver logs
pm2 restart all                  # Reiniciar
```

### Docker

```bash
docker-compose up -d             # Inicia serviços
docker-compose logs postgres     # Logs do banco
docker-compose restart n8n       # Reinicia N8N
```

## 📈 Monitoramento

### Métricas Disponíveis

- 👥 **Usuários ativos** em tempo real
- 💰 **Receita** e MRR (Monthly Recurring Revenue)
- 📊 **Conversão** de leads em clientes
- 🤖 **Workflows N8N** executados
- 📧 **Emails** enviados
- 📱 **WhatsApp** mensagens processadas

### Health Checks

- **API**: `GET /api/ping`
- **Banco**: `GET /api/health/database`
- **N8N**: `GET /api/health/n8n`

## 🚀 Atualizações

### Deploy de Atualizações

```bash
# Na instância/servidor
cd /caminho/para/kryonix
git pull origin main
npm run build
pm2 restart all
```

### Backup

```bash
# Backup automático do banco
docker exec kryonix_postgres pg_dump -U kryonix_user kryonix > backup_$(date +%Y%m%d).sql
```

## 📞 Suporte

### Desenvolvedor

- **CEO**: Vitor Jayme Fernandes Ferreira
- **WhatsApp**: (17) 9 8180-5327
- **Instagram**: @kryon.ix
- **Email**: contato@kryonix.com

### Documentação

- [Tutorial AWS EC2](./DEPLOY_TUTORIAL.md)
- [Configuração N8N](./docs/n8n-setup.md)
- [API Reference](./docs/api.md)

## 📄 Licença

© 2024 KRYONIX - Todos os direitos reservados.

Desenvolvido com ❤️ por **Vitor Jayme Fernandes Ferreira**

---

⭐ **Se este projeto te ajudou, deixe uma estrela!**

🚀 **Transforme seu negócio com automação inteligente!**

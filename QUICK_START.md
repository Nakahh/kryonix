# ⚡ QUICK START - KRYONIX

## 🚀 Deploy Local em 2 Minutos

```bash
# 1. Clone e acesse o diretório
git clone <seu-repo> kryonix && cd kryonix

# 2. Execute o deploy automático
bash deploy.sh

# 3. Acesse a aplicação
open http://localhost:3001
```

## 🌐 Deploy AWS EC2 em 5 Minutos

### 1. Criar Instância EC2

- **Tipo**: t2.micro (Free Tier)
- **OS**: Ubuntu 22.04 LTS
- **Security Group**: Portas 22, 80, 443, 3001, 5678

### 2. Conectar e Deploy

```bash
# SSH na instância
ssh -i sua-chave.pem ubuntu@SEU_IP

# Clone e deploy
git clone <seu-repo> kryonix
cd kryonix
bash deploy.sh
```

### 3. Acessar

- **App**: `http://SEU_IP:3001`
- **Admin**: `http://SEU_IP:3001/admin?token=admin-secret-2024`
- **N8N**: `http://SEU_IP:5678`

## 🔑 Configuração Mínima

### .env Essencial

```bash
# APIs obrigatórias
OPENAI_API_KEY=sk-your-key
RESEND_API_KEY=re_your-key
STRIPE_SECRET_KEY=sk_test_your-key

# Banco (padrão)
DATABASE_URL="postgresql://kryonix_user:senha123@localhost:5432/kryonix"
```

## 📋 Checklist de Deploy

- [ ] Node.js 18+ instalado
- [ ] Docker & Docker Compose instalados
- [ ] Arquivo .env configurado
- [ ] Portas 3001, 5678, 5432 liberadas
- [ ] PM2 instalado globalmente

## 🛠️ Comandos Essenciais

```bash
# Status dos serviços
pm2 status
docker-compose ps

# Ver logs
pm2 logs kryonix-server
docker-compose logs postgres

# Restart aplicação
pm2 restart kryonix-server

# Restart banco/N8N
docker-compose restart postgres n8n

# Backup banco
npm run backup

# Update aplicação
git pull && npm run update
```

## 🔧 Troubleshooting

### App não inicia

```bash
# Verificar logs
pm2 logs kryonix-server

# Verificar banco
docker-compose ps postgres

# Reiniciar tudo
pm2 restart all
docker-compose restart
```

### Banco não conecta

```bash
# Verificar container
docker-compose logs postgres

# Testar conexão
docker exec -it kryonix_postgres psql -U kryonix_user -d kryonix
```

### N8N não abre

```bash
# Verificar container
docker-compose logs n8n

# Restart N8N
docker-compose restart n8n
```

## 📱 URLs Importantes

| Serviço       | URL Local                                           | URL Produção                                     |
| ------------- | --------------------------------------------------- | ------------------------------------------------ |
| App Principal | http://localhost:3001                               | http://SEU_IP:3001                               |
| Admin Panel   | http://localhost:3001/admin?token=admin-secret-2024 | http://SEU_IP:3001/admin?token=admin-secret-2024 |
| N8N Workflows | http://localhost:5678                               | http://SEU_IP:5678                               |
| PgAdmin       | http://localhost:5050                               | http://SEU_IP:5050                               |

## 👨‍💻 Para Desenvolvedores

### Desenvolvimento

```bash
# Modo desenvolvimento
npm run dev

# Build cliente
npm run build

# Prisma Studio
npm run db:studio
```

### Testes

```bash
# Todos os testes
npm test

# Health check
npm run health
```

## 📞 Suporte Rápido

**Vitor Jayme Fernandes Ferreira**

- 📱 WhatsApp: (17) 9 8180-5327
- 📸 Instagram: @kryon.ix

---

🚀 **KRYONIX - Transformando negócios com IA!**

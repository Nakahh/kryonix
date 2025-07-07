# 🚀 Tutorial Completo: Deploy KRYONIX na AWS EC2

## 📋 Pré-requisitos

1. **Conta AWS gratuita** criada
2. **VSCode** instalado
3. **Git** instalado
4. **Node.js 18+** instalado localmente

## 🎯 Passo 1: Preparar o Ambiente Local

### 1.1 Clone o Projeto

```bash
git clone <seu-repositorio>
cd kryonix-platform
```

### 1.2 Instalar Dependências

```bash
# Instalar dependências do servidor
cd server
npm install

# Instalar dependências do cliente
cd ../client
npm install

# Voltar para raiz
cd ..
```

### 1.3 Configurar Variáveis de Ambiente

Crie o arquivo `.env` na raiz do projeto:

```bash
# Banco de dados
DATABASE_URL="postgresql://user:password@localhost:5432/kryonix"
POSTGRES_USER=kryonix_user
POSTGRES_PASSWORD=sua_senha_segura
POSTGRES_DB=kryonix

# APIs
OPENAI_API_KEY=sk-sua-chave-openai
GOOGLE_CLIENT_ID=seu-google-client-id
GOOGLE_CLIENT_SECRET=seu-google-client-secret
STRIPE_SECRET_KEY=sk_test_sua-chave-stripe
RESEND_API_KEY=re_sua-chave-resend

# N8N
N8N_WEBHOOK_URL=http://localhost:5678/webhook
N8N_API_KEY=sua-chave-n8n

# Admin
ADMIN_SECRET_TOKEN=admin-secret-2024

# Servidor
PORT=3001
NODE_ENV=production
```

## 🌩️ Passo 2: Criar Instância EC2 na AWS

### 2.1 Acessar Console AWS

1. Acesse [AWS Console](https://console.aws.amazon.com)
2. Navegue para **EC2 Dashboard**

### 2.2 Lançar Nova Instância

1. Clique em **"Launch Instance"**
2. **Name**: `kryonix-server`
3. **AMI**: Ubuntu Server 22.04 LTS (Free tier eligible)
4. **Instance Type**: t2.micro (Free tier)
5. **Key Pair**:
   - Clique "Create new key pair"
   - Nome: `kryonix-key`
   - Type: RSA
   - Format: .pem
   - **BAIXE O ARQUIVO .pem** (importante!)

### 2.3 Configurar Security Group

1. **Security Group Name**: `kryonix-sg`
2. **Inbound Rules**:
   ```
   Type: SSH, Port: 22, Source: My IP
   Type: HTTP, Port: 80, Source: Anywhere (0.0.0.0/0)
   Type: HTTPS, Port: 443, Source: Anywhere (0.0.0.0/0)
   Type: Custom TCP, Port: 3001, Source: Anywhere (0.0.0.0/0)
   Type: Custom TCP, Port: 5678, Source: Anywhere (0.0.0.0/0)
   Type: Custom TCP, Port: 5432, Source: My IP
   ```

### 2.4 Configure Storage

- **Size**: 8 GB (Free tier)
- **Volume Type**: gp2

### 2.5 Launch Instance

1. Clique **"Launch Instance"**
2. Aguarde inicializar (2-3 minutos)
3. Anote o **Public IPv4 address**

## 🔐 Passo 3: Conectar via SSH

### 3.1 Configurar Permissões da Chave (Linux/Mac)

```bash
chmod 400 ~/Downloads/kryonix-key.pem
```

### 3.2 Conectar via SSH

```bash
ssh -i ~/Downloads/kryonix-key.pem ubuntu@SEU_IP_PUBLICO
```

**Windows (usar Git Bash ou WSL)**

## ⚙️ Passo 4: Configurar Servidor Ubuntu

### 4.1 Atualizar Sistema

```bash
sudo apt update && sudo apt upgrade -y
```

### 4.2 Instalar Node.js 18

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 4.3 Instalar PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

### 4.4 Instalar Docker e Docker Compose

```bash
# Docker
sudo apt install apt-transport-https ca-certificates curl software-properties-common -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
sudo apt install docker-ce -y
sudo usermod -aG docker ubuntu

# Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Relogar para aplicar permissões
exit
```

### 4.5 Reconectar SSH

```bash
ssh -i ~/Downloads/kryonix-key.pem ubuntu@SEU_IP_PUBLICO
```

## 📁 Passo 5: Deploy da Aplicação

### 5.1 Clonar Projeto

```bash
git clone <seu-repositorio> kryonix
cd kryonix
```

### 5.2 Configurar Variáveis de Ambiente

```bash
nano .env
```

Cole as variáveis do Passo 1.3, ajustando:

```bash
DATABASE_URL="postgresql://kryonix_user:sua_senha_segura@localhost:5432/kryonix"
N8N_WEBHOOK_URL=http://SEU_IP_PUBLICO:5678/webhook
NODE_ENV=production
```

### 5.3 Instalar Dependências

```bash
# Servidor
cd server
npm install --production
cd ..

# Cliente
cd client
npm install
npm run build
cd ..
```

### 5.4 Iniciar Banco de Dados

```bash
docker-compose up -d postgres
```

### 5.5 Configurar Banco

```bash
cd server
npx prisma generate
npx prisma db push
cd ..
```

### 5.6 Iniciar N8N

```bash
docker-compose up -d n8n
```

## 🚀 Passo 6: Iniciar Aplicação

### 6.1 Criar Arquivo de Configuração PM2

```bash
nano ecosystem.config.js
```

```javascript
module.exports = {
  apps: [
    {
      name: "kryonix-server",
      script: "server/index.js",
      cwd: "/home/ubuntu/kryonix",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      log_file: "/home/ubuntu/logs/combined.log",
      out_file: "/home/ubuntu/logs/out.log",
      error_file: "/home/ubuntu/logs/error.log",
      log_date_format: "YYYY-MM-DD HH:mm Z",
    },
  ],
};
```

### 6.2 Criar Diretório de Logs

```bash
mkdir -p /home/ubuntu/logs
```

### 6.3 Iniciar com PM2

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup ubuntu
```

## 🌐 Passo 7: Configurar Nginx (Opcional)

### 7.1 Instalar Nginx

```bash
sudo apt install nginx -y
```

### 7.2 Configurar Proxy Reverso

```bash
sudo nano /etc/nginx/sites-available/kryonix
```

```nginx
server {
    listen 80;
    server_name SEU_IP_PUBLICO;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /n8n {
        proxy_pass http://localhost:5678;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 7.3 Ativar Site

```bash
sudo ln -s /etc/nginx/sites-available/kryonix /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 🔧 Passo 8: Configurações Finais

### 8.1 Configurar Firewall

```bash
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 3001
sudo ufw allow 5678
sudo ufw --force enable
```

### 8.2 Verificar Status

```bash
# Status PM2
pm2 status

# Status Docker
docker ps

# Status Nginx
sudo systemctl status nginx

# Logs da aplicação
pm2 logs kryonix-server
```

## 🎯 Passo 9: Acessar Aplicação

### 9.1 URLs de Acesso

- **Aplicação Principal**: `http://SEU_IP_PUBLICO` ou `http://SEU_IP_PUBLICO:3001`
- **N8N Dashboard**: `http://SEU_IP_PUBLICO:5678`
- **Admin Panel**: `http://SEU_IP_PUBLICO/admin?token=admin-secret-2024`

### 9.2 Configurar N8N

1. Acesse `http://SEU_IP_PUBLICO:5678`
2. Crie conta de administrador
3. Configure webhooks usando IP público

## 🛠️ Comandos Úteis de Manutenção

### Logs e Debug

```bash
# Ver logs da aplicação
pm2 logs kryonix-server

# Ver logs do Docker
docker-compose logs postgres
docker-compose logs n8n

# Monitorar recursos
htop
df -h
```

### Restart Serviços

```bash
# Restart aplicação
pm2 restart kryonix-server

# Restart banco
docker-compose restart postgres

# Restart N8N
docker-compose restart n8n

# Restart Nginx
sudo systemctl restart nginx
```

### Atualizar Aplicação

```bash
cd /home/ubuntu/kryonix
git pull origin main
cd client && npm run build
pm2 restart kryonix-server
```

## 🔒 Segurança Adicional

### SSL com Let's Encrypt (Opcional)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d SEU_DOMINIO.com
sudo systemctl reload nginx
```

### Backup Automático

```bash
# Criar script de backup
nano ~/backup.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
docker exec postgres_container pg_dump -U kryonix_user kryonix > ~/backups/backup_$DATE.sql
aws s3 cp ~/backups/backup_$DATE.sql s3://seu-bucket/backups/
```

## 📊 Monitoramento

### 9.1 Configurar Alertas

```bash
# Instalar monitoramento básico
npm install -g @pm2/io
pm2 install pm2-server-monit
```

### 9.2 Status Health Check

```bash
# Criar script de health check
nano ~/health-check.sh
```

```bash
#!/bin/bash
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/api/ping)
if [ $response != "200" ]; then
    echo "Server is down, restarting..."
    pm2 restart kryonix-server
fi
```

## 🎉 Sucesso!

Sua plataforma KRYONIX está agora rodando na AWS EC2!

**URLs importantes:**

- **App**: `http://SEU_IP_PUBLICO`
- **Admin**: `http://SEU_IP_PUBLICO/admin?token=admin-secret-2024`
- **N8N**: `http://SEU_IP_PUBLICO:5678`

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique logs: `pm2 logs kryonix-server`
2. Status serviços: `pm2 status && docker ps`
3. WhatsApp: (17) 9 8180-5327

---

**Desenvolvido por KRYONIX - Transformando negócios com tecnologia!** 🚀

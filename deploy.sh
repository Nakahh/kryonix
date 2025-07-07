#!/bin/bash

# 🚀 Script de Deploy Automatizado KRYONIX
# Execute com: bash deploy.sh

set -e  # Para em caso de erro

echo "🚀 Iniciando deploy da plataforma KRYONIX..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para logs coloridos
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar se está no diretório correto
if [ ! -f "package.json" ] && [ ! -d "client" ] && [ ! -d "server" ]; then
    log_error "Execute este script na raiz do projeto KRYONIX"
    exit 1
fi

# Verificar se .env existe
if [ ! -f ".env" ]; then
    log_warning "Arquivo .env não encontrado. Criando template..."
    cat > .env << EOF
# Banco de dados
DATABASE_URL="postgresql://kryonix_user:SuaSenhaSegura123@localhost:5432/kryonix"
POSTGRES_USER=kryonix_user
POSTGRES_PASSWORD=SuaSenhaSegura123
POSTGRES_DB=kryonix

# APIs (CONFIGURE SUAS CHAVES)
OPENAI_API_KEY=sk-your-openai-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
STRIPE_SECRET_KEY=sk_test_your-stripe-key
RESEND_API_KEY=re_your-resend-key

# N8N
N8N_WEBHOOK_URL=http://localhost:5678/webhook
N8N_API_KEY=your-n8n-api-key

# Admin
ADMIN_SECRET_TOKEN=admin-secret-2024

# Servidor
PORT=3001
NODE_ENV=production
EOF
    log_warning "Configure suas chaves de API no arquivo .env antes de continuar!"
    read -p "Pressione Enter após configurar o .env..."
fi

# Função para verificar se comando existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Verificar dependências
log_info "Verificando dependências..."

if ! command_exists node; then
    log_error "Node.js não encontrado. Instale Node.js 18+ primeiro."
    exit 1
fi

if ! command_exists npm; then
    log_error "NPM não encontrado. Instale NPM primeiro."
    exit 1
fi

if ! command_exists docker; then
    log_error "Docker não encontrado. Instale Docker primeiro."
    exit 1
fi

if ! command_exists docker-compose; then
    log_error "Docker Compose não encontrado. Instale Docker Compose primeiro."
    exit 1
fi

log_success "Todas as dependências encontradas!"

# Instalar dependências
log_info "Instalando dependências do servidor..."
cd server
npm install --production
cd ..

log_info "Instalando dependências do cliente..."
cd client
npm install
log_info "Buildando aplicação cliente..."
npm run build
cd ..

log_success "Dependências instaladas!"

# Verificar e criar docker-compose.yml se não existir
if [ ! -f "docker-compose.yml" ]; then
    log_info "Criando docker-compose.yml..."
    cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: kryonix_postgres
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  n8n:
    image: n8nio/n8n:latest
    container_name: kryonix_n8n
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=admin123
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=n8n
      - DB_POSTGRESDB_USER=${POSTGRES_USER}
      - DB_POSTGRESDB_PASSWORD=${POSTGRES_PASSWORD}
      - N8N_ENCRYPTION_KEY=your-encryption-key-here
    volumes:
      - n8n_data:/home/node/.n8n
    depends_on:
      - postgres
    restart: unless-stopped

  pgadmin:
    image: dpage/pgadmin4
    container_name: kryonix_pgadmin
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@kryonix.com
      PGADMIN_DEFAULT_PASSWORD: admin123
    ports:
      - "5050:80"
    depends_on:
      - postgres
    restart: unless-stopped

volumes:
  postgres_data:
  n8n_data:
EOF
    log_success "docker-compose.yml criado!"
fi

# Iniciar serviços Docker
log_info "Iniciando banco de dados PostgreSQL..."
docker-compose up -d postgres

log_info "Aguardando banco de dados inicializar..."
sleep 10

# Configurar banco de dados
log_info "Configurando banco de dados..."
cd server
if command_exists npx; then
    npx prisma generate
    npx prisma db push
else
    npm run prisma:generate
    npm run prisma:push
fi
cd ..

log_success "Banco de dados configurado!"

# Iniciar N8N
log_info "Iniciando N8N..."
docker-compose up -d n8n

# Verificar se PM2 está instalado
if ! command_exists pm2; then
    log_info "Instalando PM2..."
    sudo npm install -g pm2
fi

# Criar arquivo de configuração PM2
log_info "Criando configuração PM2..."
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: "kryonix-server",
      script: "./server/index.js",
      cwd: process.cwd(),
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      error_file: "./logs/error.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true,
    },
  ],
};
EOF

# Criar diretório de logs
mkdir -p logs

# Iniciar aplicação com PM2
log_info "Iniciando aplicação com PM2..."
pm2 start ecosystem.config.js
pm2 save

log_success "Deploy concluído com sucesso!"

echo ""
echo "🎉 KRYONIX está rodando!"
echo ""
echo "📋 Informações de acesso:"
echo "🌐 Aplicação: http://localhost:3001"
echo "🔧 Admin: http://localhost:3001/admin?token=admin-secret-2024"
echo "🤖 N8N: http://localhost:5678 (admin/admin123)"
echo "🗄️ PgAdmin: http://localhost:5050 (admin@kryonix.com/admin123)"
echo ""
echo "📊 Comandos úteis:"
echo "pm2 status          - Ver status da aplicação"
echo "pm2 logs            - Ver logs em tempo real"
echo "pm2 restart all     - Reiniciar aplicação"
echo "docker-compose ps   - Ver status dos containers"
echo ""
echo "🚀 Desenvolvido por KRYONIX - Vitor Jayme Fernandes Ferreira"
echo "📱 WhatsApp: (17) 9 8180-5327"
echo "📸 Instagram: @kryon.ix"

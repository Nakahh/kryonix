-- Inicialização do banco de dados KRYONIX
-- Este script é executado automaticamente quando o PostgreSQL inicia

-- Criar banco para N8N se não existir
SELECT 'CREATE DATABASE n8n'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'n8n')\gexec

-- Criar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Configurações de timezone
SET timezone = 'America/Sao_Paulo';

-- Log de inicialização
INSERT INTO pg_catalog.pg_stat_statements_info VALUES (1, CURRENT_TIMESTAMP, 'KRYONIX Database initialized successfully')
ON CONFLICT DO NOTHING;

-- Comentário de finalização
COMMENT ON DATABASE kryonix IS 'KRYONIX SaaS Platform Database - Initialized on ' || CURRENT_TIMESTAMP;

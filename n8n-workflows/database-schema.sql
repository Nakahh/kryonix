-- Schema SQL para KRYONIX N8N Workflows
-- Execute este script no PostgreSQL para criar todas as tabelas necessárias

-- Tabela para sessões de consultoria IA
CREATE TABLE IF NOT EXISTS consultant_sessions (
    id SERIAL PRIMARY KEY,
    user_ip VARCHAR(45),
    user_message TEXT NOT NULL,
    ai_response TEXT NOT NULL,
    recommended_modules JSONB,
    total_price INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para usuários
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    plan VARCHAR(50) DEFAULT 'STARTER',
    status VARCHAR(20) DEFAULT 'active',
    company VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    user_data JSONB
);

-- Tabela para leads
CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    lead_id VARCHAR(100) UNIQUE,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    message TEXT,
    source VARCHAR(50),
    utm_source VARCHAR(100),
    utm_campaign VARCHAR(100),
    lead_score INTEGER DEFAULT 0,
    urgency VARCHAR(20) DEFAULT 'low',
    status VARCHAR(50) DEFAULT 'new',
    assigned_to INTEGER,
    interest_level INTEGER DEFAULT 0,
    last_interaction TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_email UNIQUE(email)
);

-- Tabela para follow-ups de leads
CREATE TABLE IF NOT EXISTS lead_followups (
    id SERIAL PRIMARY KEY,
    lead_id VARCHAR(100) REFERENCES leads(lead_id),
    follow_up_date TIMESTAMP NOT NULL,
    urgency VARCHAR(20),
    reminder_text TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para mensagens do WhatsApp
CREATE TABLE IF NOT EXISTS whatsapp_messages (
    id SERIAL PRIMARY KEY,
    phone_number VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    intent VARCHAR(50),
    response TEXT,
    user_id INTEGER,
    direction VARCHAR(10) DEFAULT 'inbound',
    message_type VARCHAR(20) DEFAULT 'text',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para equipe de vendas
CREATE TABLE IF NOT EXISTS team_members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    whatsapp VARCHAR(20),
    role VARCHAR(50) DEFAULT 'sales',
    expertise TEXT[],
    current_leads INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para eventos do calendário
CREATE TABLE IF NOT EXISTS calendar_events (
    id SERIAL PRIMARY KEY,
    request_id VARCHAR(100) UNIQUE,
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(20),
    service_type VARCHAR(50),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    google_event_id VARCHAR(255),
    meet_link TEXT,
    status VARCHAR(20) DEFAULT 'scheduled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para campanhas de email
CREATE TABLE IF NOT EXISTS email_campaigns (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    email_template TEXT NOT NULL,
    from_email VARCHAR(255) DEFAULT 'marketing@kryonix.com',
    campaign_type VARCHAR(50),
    target_segment VARCHAR(50),
    objective VARCHAR(255),
    status VARCHAR(20) DEFAULT 'draft',
    send_date TIMESTAMP,
    sent_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Tabela para logs de emails enviados
CREATE TABLE IF NOT EXISTS email_logs (
    id SERIAL PRIMARY KEY,
    email_id VARCHAR(100) UNIQUE NOT NULL,
    campaign_id INTEGER REFERENCES email_campaigns(id),
    recipient_email VARCHAR(255) NOT NULL,
    recipient_name VARCHAR(255),
    subject VARCHAR(255),
    status VARCHAR(20) DEFAULT 'sent',
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivered_at TIMESTAMP,
    opened_at TIMESTAMP,
    clicked_at TIMESTAMP
);

-- Tabela para eventos de email (aberturas, cliques, etc.)
CREATE TABLE IF NOT EXISTS email_events (
    id SERIAL PRIMARY KEY,
    email_id VARCHAR(100),
    recipient_email VARCHAR(255),
    event_type VARCHAR(50),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_agent TEXT,
    ip_address VARCHAR(45),
    event_data JSONB
);

-- Tabela para configurações da API
CREATE TABLE IF NOT EXISTS api_configs (
    id SERIAL PRIMARY KEY,
    config_key VARCHAR(100) UNIQUE NOT NULL,
    config_value TEXT,
    is_encrypted BOOLEAN DEFAULT false,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para métricas e analytics
CREATE TABLE IF NOT EXISTS analytics_metrics (
    id SERIAL PRIMARY KEY,
    metric_type VARCHAR(50) NOT NULL,
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(10,2),
    dimensions JSONB,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER,
    campaign_id INTEGER
);

-- Tabela para atividades do sistema
CREATE TABLE IF NOT EXISTS system_activities (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    activity_type VARCHAR(50) NOT NULL,
    description TEXT,
    metadata JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir dados iniciais da equipe
INSERT INTO team_members (name, email, whatsapp, role, expertise) VALUES
('Vitor Jayme Fernandes Ferreira', 'contato@kryonix.com', '5517981805327', 'ceo', ARRAY['automacao', 'ia', 'desenvolvimento']),
('Equipe Vendas KRYONIX', 'vendas@kryonix.com', '5517981805327', 'sales', ARRAY['consultoria', 'onboarding'])
ON CONFLICT (email) DO NOTHING;

-- Inserir configurações iniciais da API
INSERT INTO api_configs (config_key, config_value, description) VALUES
('whatsapp_webhook_url', 'https://your-n8n-instance.com/webhook/whatsapp-kryonix', 'URL do webhook do WhatsApp'),
('ia_consultant_webhook_url', 'https://your-n8n-instance.com/webhook/ia-consultant-kryonix', 'URL do webhook da consultoria IA'),
('lead_webhook_url', 'https://your-n8n-instance.com/webhook/lead-kryonix', 'URL do webhook de leads'),
('calendar_webhook_url', 'https://your-n8n-instance.com/webhook/scheduling-kryonix', 'URL do webhook de agendamento'),
('email_webhook_url', 'https://your-n8n-instance.com/webhook/email-events-kryonix', 'URL do webhook de eventos de email')
ON CONFLICT (config_key) DO NOTHING;

-- Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_whatsapp_messages_phone ON whatsapp_messages(phone_number);
CREATE INDEX IF NOT EXISTS idx_whatsapp_messages_created_at ON whatsapp_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_calendar_events_start_time ON calendar_events(start_time);
CREATE INDEX IF NOT EXISTS idx_email_logs_campaign_id ON email_logs(campaign_id);
CREATE INDEX IF NOT EXISTS idx_email_events_email_id ON email_events(email_id);
CREATE INDEX IF NOT EXISTS idx_analytics_metrics_timestamp ON analytics_metrics(timestamp);

-- Criar views úteis para relatórios
CREATE OR REPLACE VIEW leads_summary AS
SELECT 
    DATE(created_at) as date,
    source,
    COUNT(*) as total_leads,
    AVG(lead_score) as avg_score,
    COUNT(*) FILTER (WHERE status = 'converted') as converted_leads
FROM leads 
GROUP BY DATE(created_at), source;

CREATE OR REPLACE VIEW email_campaign_stats AS
SELECT 
    c.id,
    c.name,
    c.sent_count,
    COUNT(e.id) FILTER (WHERE e.event_type = 'opened') as opens,
    COUNT(e.id) FILTER (WHERE e.event_type = 'clicked') as clicks,
    ROUND(
        (COUNT(e.id) FILTER (WHERE e.event_type = 'opened')::DECIMAL / NULLIF(c.sent_count, 0)) * 100, 
        2
    ) as open_rate,
    ROUND(
        (COUNT(e.id) FILTER (WHERE e.event_type = 'clicked')::DECIMAL / NULLIF(c.sent_count, 0)) * 100, 
        2
    ) as click_rate
FROM email_campaigns c
LEFT JOIN email_logs l ON c.id = l.campaign_id
LEFT JOIN email_events e ON l.email_id = e.email_id
GROUP BY c.id, c.name, c.sent_count;

-- Comentários das tabelas
COMMENT ON TABLE consultant_sessions IS 'Sessões de consultoria com IA para recomendação de módulos';
COMMENT ON TABLE leads IS 'Leads capturados através de diferentes canais';
COMMENT ON TABLE whatsapp_messages IS 'Histórico de mensagens do WhatsApp Business';
COMMENT ON TABLE calendar_events IS 'Eventos agendados através do sistema';
COMMENT ON TABLE email_campaigns IS 'Campanhas de email marketing';
COMMENT ON TABLE team_members IS 'Equipe de vendas e atendimento';

-- Trigger para atualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar trigger nas tabelas com updated_at
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'api_configs' AND column_name = 'updated_at') THEN
        DROP TRIGGER IF EXISTS update_api_configs_updated_at ON api_configs;
        CREATE TRIGGER update_api_configs_updated_at 
            BEFORE UPDATE ON api_configs 
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

COMMIT;

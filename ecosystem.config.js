module.exports = {
  apps: [
    {
      name: "kryonix-server",
      script: "./server/index.js",
      cwd: process.cwd(),
      instances: "max", // Use todos os cores disponíveis
      exec_mode: "cluster", // Modo cluster para melhor performance
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
      env_development: {
        NODE_ENV: "development",
        PORT: 3001,
        DEBUG: "kryonix:*",
      },
      env_staging: {
        NODE_ENV: "staging",
        PORT: 3001,
      },
      // Configurações de recursos
      max_memory_restart: "1G",
      node_args: "--max-old-space-size=1024",

      // Logs
      error_file: "./logs/error.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,

      // Auto restart
      autorestart: true,
      watch: false, // Não usar watch em produção
      max_restarts: 5,
      min_uptime: "10s",

      // Configurações avançadas
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 8000,

      // Health check
      health_check_grace_period: 3000,

      // Variáveis de ambiente específicas
      env_vars: {
        NODE_OPTIONS: "--max-old-space-size=1024",
        UV_THREADPOOL_SIZE: "128",
      },
    },
  ],

  // Configuração de deploy
  deploy: {
    production: {
      user: "ubuntu",
      host: ["your-server-ip"],
      ref: "origin/main",
      repo: "git@github.com:your-repo/kryonix.git",
      path: "/home/ubuntu/kryonix",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && npm run build && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
      env: {
        NODE_ENV: "production",
      },
    },
    staging: {
      user: "ubuntu",
      host: ["staging-server-ip"],
      ref: "origin/develop",
      repo: "git@github.com:your-repo/kryonix.git",
      path: "/home/ubuntu/kryonix-staging",
      "post-deploy":
        "npm install && npm run build && pm2 reload ecosystem.config.js --env staging",
      env: {
        NODE_ENV: "staging",
      },
    },
  },

  // Configurações globais do PM2
  pmx_http: {
    http: true,
    http_password: "kryonix-monitoring-2024",
    http_code: 401,
  },

  // Módulos PM2
  module_conf: {
    "pm2-logrotate": {
      max_size: "10M",
      retain: 30,
      compress: true,
      dateFormat: "YYYY-MM-DD_HH-mm-ss",
      workerInterval: 30,
      rotateInterval: "0 0 * * *",
      rotateModule: true,
    },
    "pm2-server-monit": {
      drive: true,
      network: true,
      memory: true,
      cpu: true,
    },
  },
};

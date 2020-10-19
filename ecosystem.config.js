module.exports = {
  apps : [{
      name: 'sirretInvader',
      script: './src/app.js',
      instances: 4,
      autorestart: false,
      watch: false,
      max_memory_restart: '1G',
  }, ],
};

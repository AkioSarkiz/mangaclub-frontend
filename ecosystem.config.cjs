module.exports = {
  apps: [
    {
      name: 'mangaclub-frontend',
      cwd: '/var/www/mangaclub-frontend/current',
      script: 'npm',
      args: 'run start',

      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};

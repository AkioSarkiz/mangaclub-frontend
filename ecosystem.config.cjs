module.exports = {
  apps: [
    {
      name: "mangaclub_frontend",
      cwd: "/var/www/mangaclub-frontend/current",
      script: "npm",
      args: "run start",

      env: {
        NODE_ENV: "production",
      },
    },
  ],
};

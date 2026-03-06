module.exports = {
  apps: [
    {
      name: "frontend",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      cwd: "/var/www/Stream-Lab-Frontend",
      exec_mode: "cluster",
      instances: "max",
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};

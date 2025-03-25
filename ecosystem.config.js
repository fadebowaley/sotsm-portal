module.exports = {
  apps: [
    {
      name: "halocrm",
      cwd: "./halocrm",
      script: "yarn",
      args: "dev",
      env: {
        NODE_ENV: "development",
      },
    },
    {
      name: "haloface",
      cwd: "./haloface",
      script: "sh",
      args: "-c 'sleep 5 && pnpm run dev'", // Wait 10s before starting
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};

const path = require("path");

module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  env: {
    NEXT_PUBLIC_RESOURSE_API_URL: process.env.NEXT_PUBLIC_RESOURSE_API_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    FRONT_OFFICE_SLACK_CONNECT_URL: process.env.FRONT_OFFICE_SLACK_CONNECT_URL,
  },
};

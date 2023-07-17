const path = require("path");

module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  async rewrites() {
    return [
      {
        source: "/get",
        // destination: "http://localhost:8080/user/authorize",
        destination: "https://auth.curiboard.com/auth/verify",
      },
    ];
  },
};

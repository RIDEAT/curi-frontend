const path = require("path");

module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  env: {},
  async redirects() {
    return [
      // {
      //   source: "/",
      //   destination: "https://www.curiboard.com",
      //   permanent: false,
      // },
      {
        source: "/workspace/:slug/help",
        destination: "https://v4pqp.channel.io/home",
        permanent: false,
      },
      {
        source: "/workspace/:slug",
        destination: "/workspace/:slug/workflow",
        permanent: false,
      },
    ];
  },
};

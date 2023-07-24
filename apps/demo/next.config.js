const path = require("path");

module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  images: {
    domains: ["avatars.githubusercontent.com", "images.unsplash.com"],
  },
};

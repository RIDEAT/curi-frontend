module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  async rewrites() {
    return [
      {
        source: "/get",
        destination: "http://localhost:8080/user/authorize",
        // destination: "https://auth.curiboard.com/auth/authorize",
      },
    ];
  },
};

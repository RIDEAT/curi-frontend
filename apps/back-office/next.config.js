module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  async rewrites() {
    return [
      {
        source: "/get",
        destination:
          "http://a6aa5857b0c794013aec177362b0c9fe-308833843.ap-northeast-2.elb.amazonaws.com:8080/user/authorize",
        // destination: "http://localhost:8080/user/authorize",
      },
    ];
  },
};

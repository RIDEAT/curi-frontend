const path = require("path");

module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  images: {
    domains: ["d3qwomveubih9v.cloudfront.net", "d104q3ppxju555.cloudfront.net"],
  },
  env: {
    NEXT_PUBLIC_GOOGLE_OAUTH_URL: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_URL,
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID:
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID:
      process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    NEXT_PUBLIC_RESOURSE_API_URL: process.env.NEXT_PUBLIC_RESOURSE_API_URL,
    NEXT_PUBLIC_AUTH_API_URL: process.env.NEXT_PUBLIC_AUTH_API_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    HACKLE_BROWSER_SDK_KEY: process.env.HACKLE_BROWSER_SDK_KEY,
    BACK_OFFICE_SLACK_CONNECT_URL: process.env.BACK_OFFICE_SLACK_CONNECT_URL,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false,
      },
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

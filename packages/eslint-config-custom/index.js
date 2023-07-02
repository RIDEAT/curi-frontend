module.exports = {
  extends: ["next", "turbo", "prettier"],
  plugins: ["jest"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
  env: {
    "jest/globals": true,
  },
};

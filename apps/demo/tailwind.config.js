// module.exports = require("ui/tailwind.config");
const baseConfig = require("ui/tailwind.config");

module.exports = {
  ...baseConfig,
  plugins: [
    // Tailwind plugins
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    require("tailwind-scrollbar-hide"),
  ],
};

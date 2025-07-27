const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://vps-3696213-x.dattaweb.com/",
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents(on, config) {
      // eventos opcionales
    }
  },
  viewportWidth: 1280,
  viewportHeight: 800,
});
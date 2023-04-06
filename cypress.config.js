const { defineConfig } = require('cypress');
//const allureWriter = require('@shelex/cypress-allure-plugin/writer');
module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results/mochawesome',
    inline: true,
    overwrite: true,
    charts: true,
    html: true,
    json: false,
    reportPageTitle: 'E2E Report',
    timestamp: 'mmddyyyy_HHMMss',
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://app.brighthr.com',
  },
});

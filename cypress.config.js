const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    defaultCommandTimeout: 60000,
    retries: 3,
    pageLoadTimeout: 60000,
    viewportWidth: 1400,
    viewportHeight: 900,
    chromeWebSecurity: false,
    experimentalSessionAndOrigin: true,
    trashAssetsBeforeRuns: false,
    watchForFileChanges: false,
    video: true,
    videoCompression: 10,
    chromeWebSecurity: false,
  },

  includeShadowDom: true,
});

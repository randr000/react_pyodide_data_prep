const { defineConfig } = require("cypress");
const { rmdirSync, mkdirSync } = require("fs");

module.exports = defineConfig({
  env: {
    testDataPath: '/home/raul/react_pyodide_data_prep/test_data/'
  },

  defaultCommandTimeout: 30_000,
  
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        deleteDownloads() {
          // Delete downloads directory and then recreate it
          rmdirSync('cypress/downloads', {recursive: true});
          mkdirSync('cypress/downloads');
          return null;
        }
      });
    },
    baseUrl: 'http://localhost:3000/react_pyodide_data_prep',
    testIsolation: false
  },
});

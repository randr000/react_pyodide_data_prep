const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    testDataPath: '/home/raul/react_pyodide_data_prep/test_data/'
  },

  defaultCommandTimeout: 30_000,
  
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000/react_pyodide_data_prep',
    testIsolation: false
  },
});

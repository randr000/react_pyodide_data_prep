import CONSTANTS from "../../src/js/app-constants";

describe('Initial Page Render', () => {
  
    it('Should have all of the initial elements render on the screen',() => {
      cy.visit('/');

      const elements = ['Pyodide is Loading', CONSTANTS.APP_TITLE, 'Upload', 'Download', 'Filter Columns', 'Filter Rows', 'Join', 'Union'];
      elements.forEach(name => cy.contains(name).should('exist'));

      // Test if spinner shows up
      cy.get('[data-testid=pyodide-loading-spinner]').should('exist');

      // Pyodide is Loading disappears
      cy.contains('Pyodide is Loading', {timeout: 10_000}).should('not.exist');

      // Test if spinner disappears
      cy.get('[data-testid=pyodide-loading-spinner]', {timeout: 10_000}).should('not.exist');

    });
});
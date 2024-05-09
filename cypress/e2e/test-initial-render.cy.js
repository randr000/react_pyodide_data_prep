import CONSTANTS from "../../src/js/app-constants";

it('Should have all of the initial elements render on the screen',() => {

  const elements = ['Pyodide is Loading', CONSTANTS.APP_TITLE, 'Upload', 'Download', 'Filter Columns', 'Filter Rows', 'Join', 'Union', 'Remove All'];
  elements.forEach(name => cy.contains(name).should('exist'));

  // Test if spinner shows up
  cy.get('[data-testid=pyodide-loading-spinner]').should('exist');

  cy.assertPyodideIsLoaded();

});
import CONSTANTS from "../../src/js/app-constants";
import { initialRenderTestTitle } from "./cy-constants";

it(initialRenderTestTitle,() => {

  // Test if App title shows up
  cy.contains(CONSTANTS.APP_TITLE);

  // Test if Pyodide is Loading message shows up
  cy.contains('Pyodide is Loading');
  
  // Test if spinner shows up
  cy.get('[data-testid=pyodide-loading-spinner]').should('exist');

  const elements = ['Upload', 'Download', 'Filter Columns', 'Filter Rows', 'Join', 'Union', 'Remove All'];
  elements.forEach(name => cy.get('nav').contains('button', name).should('exist'));

  cy.assertPyodideIsLoaded();

});
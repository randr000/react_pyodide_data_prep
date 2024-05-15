import CONSTANTS from "../../src/js/app-constants";
import { initialRenderTestTitle, navbarComponentBtns, navbarUtilityBtns } from "./cy-constants";

it(initialRenderTestTitle,() => {

  // Test if App title shows up
  cy.contains(CONSTANTS.APP_TITLE);

  // Test if Pyodide is Loading message shows up
  cy.contains('Pyodide is Loading');
  
  // Test if spinner shows up
  cy.get('[data-testid=pyodide-loading-spinner]').should('exist');

  const elements = [...navbarComponentBtns, ...navbarUtilityBtns];
  elements.forEach(name => cy.get('nav').contains('button', name).should('exist'));

  cy.assertPyodideIsLoaded();

});
import CONSTANTS from "../../src/js/app-constants";
import { initialRenderTestTitle, navbarComponentBtns, navbarUtilityBtns } from "./cy-constants";

describe('test-initial-render', () => {
  it(initialRenderTestTitle,() => {

    // Test if App title shows up
    cy.contains(CONSTANTS.APP_TITLE);

    const elements = [...navbarComponentBtns, ...navbarUtilityBtns];
    elements.forEach(name => cy.get('nav').contains('button', name).should('exist'));

    // cy.assertPyodideIsLoaded();

  });
});
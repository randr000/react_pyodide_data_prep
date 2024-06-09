// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import 'cypress-real-events';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { initialRenderTestTitle } from '../e2e/cy-constants';

before(() => {
    cy.visit('/');
    // if (Cypress.currentTest.title !== initialRenderTestTitle) {
    //     cy.assertPyodideIsLoaded();
    // }
    cy.assertPyodideIsLoaded();
    cy.wait(30000);
});

beforeEach(() => {
    cy.clickNavBarButton('Remove All');

    // Delete downloads directory and then recreate it
    cy.task('deleteDownloads');

    // Adjust viewport size
    cy.viewport(2000, 1000);
});

after(() => {
    // Delete downloads directory and then recreate it
    cy.task('deleteDownloads');
    cy.clickNavBarButton('Remove All');
});
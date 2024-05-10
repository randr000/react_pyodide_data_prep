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
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { initialRenderTestTitle } from '../e2e/cy-constants';

before(() => {
    cy.visit('/');
    if (Cypress.currentTest.title !== initialRenderTestTitle) {
        cy.assertPyodideIsLoaded();
    }
});

beforeEach(() => {
    // Delete downloads directory and then recreate it
    cy.task('deleteDownloads');
});

afterEach(() => {
    cy.clickNavBarButton('Remove All');
});

after(() => {
    // Delete downloads directory and then recreate it
    cy.task('deleteDownloads');
});
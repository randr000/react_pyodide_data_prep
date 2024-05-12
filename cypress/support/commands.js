// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { wait } from "@testing-library/user-event/dist/utils";

const testDataPath = Cypress.env('testDataPath');

// Asserts that displayed table data is equal to the json data in the test data file whose name was passed
Cypress.Commands.add('assertTable', (fName, table='table', path=testDataPath) => {
    cy.readFile(`${path}${fName}`)
      .then(expected => {
        const columns = expected.columns;
        const rows = expected.data;
        cy.log(JSON.stringify(columns))

        cy.get(table).find('th').each((th, idx) => {
          expect(th.text()).to.equal(columns[idx]);
        });

        cy.get(table).find('td').each((td, idx) => {
          const rowIdx = Math.ceil((idx + 1) / columns.length) - 1;
          const colIdx = idx % columns.length;
          const test = Number.isNaN(+td.text()) ? td.text() : Number(td.text());
          expect(test).to.equal(rows[rowIdx][colIdx]);
        });
    });
});

Cypress.Commands.add('uploadFile', (fName, dataTestId=false, path=testDataPath) => {
    if (dataTestId) {
        cy.get(`[data-testid=${dataTestId}]`).find('input[type=file]').selectFile(`${path}${fName}`, {force: true});
    } else cy.get('input[type=file]').selectFile(`${path}${fName}`, {force: true});
});

Cypress.Commands.add('assertValidUpload', (fName, isValid=true, dataTestId=false, path=testDataPath) => {
    cy.uploadFile(fName, dataTestId, path);
    if (isValid) cy.contains(fName).should('exist');
    else cy
      .contains('Invalid filetype. Please make sure filename extension is equal to .csv, .xlsx, .txt, or .json!')
      .should('exist');
});

// Assumes Pyodide is loaded when loading message and spinner disappear, used to make sure Pyodide is loaded before other tests can run
Cypress.Commands.add('assertPyodideIsLoaded', () => {
    const timeout = 30_000;

    // Pyodide is Loading disappears
    cy.contains('Pyodide is Loading', {timeout: timeout}).should('not.exist');

    // Test if spinner disappears
    cy.get('[data-testid=pyodide-loading-spinner]', {timeout: timeout}).should('not.exist');
});

Cypress.Commands.add('clickNavBarButton', (title) => {
    cy.get('nav').contains('button', title).click();
});

// Connect two data components by passing their component IDs
Cypress.Commands.add('connectDataComponents', (btm, top, options={}) => {
  cy.get(`#${btm}-btm`).click(options);
  cy.get(`#${top}-top`).click(options);
});

// Validate download
Cypress.Commands.add('validateDownload', (compTitle, compId, fName, fExt) => {
  cy.get(`[data-testid=${compTitle}-${compId}`).find('.bi-file-earmark-arrow-down').click();
  cy.get(`[data-testid=${compTitle}-${compId}`).find('.download-pill').find('input[type=text]').clear().type(fName);
  cy.get(`[data-testid=${compTitle}-${compId}`).find('.download-pill').find('input[type=checkbox]').check(fExt);
  cy.get(`[data-testid=${compTitle}-${compId}`).find('.bi-box-arrow-down').click();
  cy.readFile(`cypress/downloads/${fName}.${fExt}`).should('exist');
});
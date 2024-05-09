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
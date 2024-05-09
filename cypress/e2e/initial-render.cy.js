import { wait } from "@testing-library/user-event/dist/utils";
import CONSTANTS from "../../src/js/app-constants";

describe('App End to End Test', () => {

  const path = Cypress.env('testDataPath');


  it('Should have all of the initial elements render on the screen',() => {

    const elements = ['Pyodide is Loading', CONSTANTS.APP_TITLE, 'Upload', 'Download', 'Filter Columns', 'Filter Rows', 'Join', 'Union', 'Remove All'];
    elements.forEach(name => cy.contains(name).should('exist'));

    // Test if spinner shows up
    cy.get('[data-testid=pyodide-loading-spinner]').should('exist');

    cy.assertPyodideIsLoaded();

  });

  it('Should show correct component after clicking on its corresponding button on NavBar and then not show it after clicking on delete button', () => {
    
    const dataComponentTitles = ['Upload', 'Download', 'Filter Columns', 'Union'];
    dataComponentTitles.forEach(title => {
      cy.contains(title).click();
      cy.contains('h5', title).should('exist');
      cy.get('.bi-x-circle').trigger('mouseover', {force: true}).click();
      cy.contains('h5', title).should('not.exist');
    });
  });

  it('Should drag a data component', () => {

    cy.contains('Upload').click();
    cy.contains('h5', 'Upload')
      .then(target => {
        const coords = target[0].getBoundingClientRect();
        
        cy.contains('h5', 'Upload')
          .trigger('mousedown')
          .trigger('mousemove', {clientX: 500, clientY: 500})
          .trigger('mouseup');

        cy.contains('h5', 'Upload').then(target => {
          const newCoords = target[0].getBoundingClientRect();
          expect(newCoords.x).to.be.greaterThan(coords.x);
          expect(newCoords.y).to.be.greaterThan(coords.y);
        });
      });
  });

  it('Should connect two data components with an arrow and then delete it', () => {
    cy.contains('Upload').click();

    cy.contains('h5', 'Upload')
      .trigger('mousedown').trigger('mousemove', {clientX: 500, clientY: 500}).trigger('mouseup');

    cy.contains('Download').click();

    cy.contains('h5', 'Download')
      .trigger('mousedown').trigger('mousemove', {clientX: 200, clientY: 200}).trigger('mouseup');

    cy.get('#0-btm').click();
    cy.get('#1-top').click();
    cy.get('#del-0-btm_1-top').should('exist');
    cy.get('#del-0-btm_1-top').trigger('mouseover', {force: true}).click();
    cy.get('#del-0-btm_1-top').should('not.exist');
  });

  it('Should connect multiple arrows to a component allowing multiple sources without producing duplicate arrows', () => {
    cy.contains('button', 'Upload').click();
    cy.get('[data-testid=Upload-0]').trigger('mousedown').trigger('mousemove', {clientX: 600, clientY: 300}).trigger('mouseup');
    cy.contains('button', 'Upload').click();
    cy.get('[data-testid=Upload-1]').trigger('mousedown').trigger('mousemove', {clientX: 350, clientY: 300}).trigger('mouseup');
    cy.contains('button', 'Upload').click();
    cy.get('[data-testid=Upload-2]').trigger('mousedown').trigger('mousemove', {clientX: 100, clientY: 300}).trigger('mouseup');
    cy.contains('button', 'Union').click();
    cy.get('[data-testid=Union-3]').trigger('mousedown').trigger('mousemove', {clientX: 350, clientY: 2000}).trigger('mouseup');

    cy.get('#0-btm').click({force: true});
    cy.get('#3-top').click({force: true});

    cy.get('#0-btm').click({force: true});
    cy.get('#3-top').click({force: true});

    cy.get('#1-btm').click({force: true});
    cy.get('#3-top').click({force: true});

    cy.get('#2-btm').click({force: true});
    cy.get('#3-top').click({force: true});

    cy.get('#del-0-btm_3-top').should('exist');
    cy.get('#del-0-btm_3-top').should('have.length', 1);
    cy.get('#del-1-btm_3-top').should('exist');
    cy.get('#del-2-btm_3-top').should('exist');

    cy.get('#del-0-btm_3-top').trigger('mouseover', {force: true}).click();
    cy.get('#del-0-btm_3-top').should('not.exist');

    cy.get('#del-1-btm_3-top').trigger('mouseover', {force: true}).click();
    cy.get('#del-1-btm_3-top').should('not.exist');

    cy.get('#del-2-btm_3-top').trigger('mouseover', {force: true}).click();
    cy.get('#del-2-btm_3-top').should('not.exist');
  });

  it('Should upload file and alert if it is a valid filetype or not', () => {
    cy.contains('Upload').click();
    cy.assertValidUpload('city-populations.csv');
    cy.assertValidUpload('city-populations.txt');
    cy.assertValidUpload('city-populations.xlsx');
    cy.assertValidUpload('invalid-file.pdf', false);
    cy.assertValidUpload('city-populations-records.json');
    cy.assertValidUpload('city-populations-split.json');
  });

  it('Should have the data components display the table data correctly', () => {
    cy.get('button').contains('Upload').click();
    cy.uploadFile('city-populations.xlsx');
    cy.assertTable('city-populations-split.json');
  });

  it('Should filter data columns correctly', () => {
    cy.get('button').contains('Upload').click();
    cy.uploadFile('city-populations.xlsx');
    cy.get('button').contains('Filter Columns').click();
    cy.get('#0-btm').click();
    cy.get('#1-top').click();

    cy.get('input[type=checkbox]').uncheck('state', {force: true});
    cy.assertTable('city-populations-filtered-out-state-split.json', '[data-testid=table-1]');
    cy.get('input[type=checkbox]').check({force: true});

    cy.get('input[type=checkbox]').uncheck('city', {force: true});
    cy.assertTable('city-populations-filtered-out-city-split.json', '[data-testid=table-1]');
    cy.get('input[type=checkbox]').check({force: true});

    cy.get('input[type=checkbox]').uncheck(['state', 'city'], {force: true});
    cy.assertTable('city-populations-filtered-out-state-and-city-split.json', '[data-testid=table-1]');
    cy.get('input[type=checkbox]').check({force: true});

    cy.assertTable('city-populations-split.json', '[data-testid=table-1]');
  });

  it('Should combine the data and display correctly when using the union data component', () => {
    cy.contains('button', 'Upload').click();
    cy.get('[data-testid=Upload-0]').trigger('mousedown').trigger('mousemove', {clientX: 600, clientY: 300}).trigger('mouseup');
    
    cy.contains('button', 'Upload').click();
    cy.get('[data-testid=Upload-1]').trigger('mousedown').trigger('mousemove', {clientX: 350, clientY: 300}).trigger('mouseup');
    
    cy.contains('button', 'Upload').click();
    cy.get('[data-testid=Upload-2]').trigger('mousedown').trigger('mousemove', {clientX: 100, clientY: 300}).trigger('mouseup');
    
    cy.contains('button', 'Union').click();

    cy.get('#0-btm').click({force: true});
    cy.get('#3-top').click({force: true});

    cy.get('#1-btm').click({force: true});
    cy.get('#3-top').click({force: true});

    cy.get('#2-btm').click({force: true});
    cy.get('#3-top').click({force: true});

    cy.uploadFile('state-populations-1.xlsx', 'Upload-0');
    cy.wait(5000);
    cy.uploadFile('state-populations-2.xlsx', 'Upload-1');
    cy.wait(5000);
    cy.uploadFile('state-populations-3.xlsx', 'Upload-2');

    cy.assertTable('state-populations-1-split.json', '[data-testid=table-0]');
    cy.assertTable('state-populations-2-split.json', '[data-testid=table-1]');
    cy.assertTable('state-populations-3-split.json', '[data-testid=table-2]');
    cy.assertTable('state-populations-all-split.json', '[data-testid=table-3]');
  });
});
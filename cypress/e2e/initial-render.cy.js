import CONSTANTS from "../../src/js/app-constants";

describe('App End to End Test', () => {

  const dataComponentTitles = ['Upload', 'Download', 'Filter Columns', 'Union'];
  const path = '/home/raul/react_pyodide_data_prep/test_data/';

  before(() => {
    cy.visit('/');
  });

  // afterEach(() => {
  //   cy.contains('Remove All').click();
  // });

  it('Should have all of the initial elements render on the screen',() => {

    const elements = ['Pyodide is Loading', CONSTANTS.APP_TITLE, 'Upload', 'Download', 'Filter Columns', 'Filter Rows', 'Join', 'Union', 'Remove All'];
    elements.forEach(name => cy.contains(name).should('exist'));

    // Test if spinner shows up
    cy.get('[data-testid=pyodide-loading-spinner]').should('exist');

    // Pyodide is Loading disappears
    cy.contains('Pyodide is Loading', {timeout: 10_000}).should('not.exist');

    // Test if spinner disappears
    cy.get('[data-testid=pyodide-loading-spinner]', {timeout: 10_000}).should('not.exist');

  });

  // it('Should show correct component after clicking on its corresponding button on NavBar and then not show it after clicking on delete button', () => {
    
  //   dataComponentTitles.forEach(title => {
  //     cy.contains(title).click();
  //     cy.contains('h5', title).should('exist');
  //     cy.get('.bi-x-circle').trigger('mouseover', {force: true}).click();
  //     cy.contains('h5', title).should('not.exist');
  //   });
  // });

  // it('Should drag a data component', () => {

  //   cy.contains('Upload').click();
  //   cy.contains('h5', 'Upload')
  //     .then(target => {
  //       const coords = target[0].getBoundingClientRect();
        
  //       cy.contains('h5', 'Upload')
  //         .trigger('mousedown')
  //         .trigger('mousemove', {clientX: 500, clientY: 500})
  //         .trigger('mouseup');

  //       cy.contains('h5', 'Upload').then(target => {
  //         const newCoords = target[0].getBoundingClientRect();
  //         expect(newCoords.x).to.be.greaterThan(coords.x);
  //         expect(newCoords.y).to.be.greaterThan(coords.y);
  //       });
  //     });
  // });

  // it('Should connect two data components with an arrow and then delete arrow', () => {
  //   cy.contains('Upload').click();

  //   cy.contains('h5', 'Upload')
  //     .trigger('mousedown').trigger('mousemove', {clientX: 500, clientY: 500}).trigger('mouseup');

  //   cy.contains('Download').click();

  //   cy.contains('h5', 'Download')
  //     .trigger('mousedown').trigger('mousemove', {clientX: 200, clientY: 200}).trigger('mouseup');

  //   cy.get('#0-btm').click();
  //   cy.get('#1-top').click();
  //   cy.get('#del-0-btm_1-top').should('exist');
  //   cy.get('#del-0-btm_1-top').trigger('mouseover', {force: true}).click();
  //   cy.get('#del-0-btm_1-top').should('not.exist');
  // });

  // it('Should upload file and alert if it is a valid filetype or not', () => {
  //   cy.contains('Upload').click();

  //   function assertValidUpload(fName, isValid=true) {
  //     cy.get('input[type=file]').selectFile(`${path}${fName}`, {force: true});
  //     if (isValid) cy.contains(fName).should('exist');
  //     else cy
  //       .contains('Invalid filetype. Please make sure filename extension is equal to .csv, .xlsx, .txt, or .json!')
  //       .should('exist');
  //   }

  //   assertValidUpload('city-populations.xlsx');
  //   assertValidUpload('city-populations.csv');
  //   assertValidUpload('city-populations.txt');
  //   assertValidUpload('invalid-file.pdf', false);
  //   assertValidUpload('city-populations-records.json');
  //   assertValidUpload('city-populations-split.json');
  // });

  it('Should have the data components edit the data correctly', () => {
    cy.get('button').contains('Upload').click();
    cy.get('input[type=file]').selectFile(`${path}city-populations.xlsx`, {force: true});

    

    function assertTable(fName, table='table') {

      cy.readFile(`${path}${fName}`)
        .then(expected => {
          const columns = expected.columns;
          const rows = expected.data;
          cy.log(JSON.stringify(columns))

          cy.get(table).get('th').each((th, idx) => {
            expect(th.text()).to.equal(columns[idx]);
          });

          cy.get(table).get('td').each((td, idx) => {
            const rowIdx = Math.ceil((idx + 1) / columns.length) - 1;
            const colIdx = idx % columns.length;
            const test = Number.isNaN(+td.text()) ? td.text() : Number(td.text());
            expect(test).to.equal(rows[rowIdx][colIdx]);
          });

          // cy.get(table).get('tr').each((tr, rowIdx) => {
          //   cy.wrap(tr).get('td').each((td, colIdx) => {
          //     const test = Number.isNaN(+td.text()) ? td.text() : Number(td.text());
          //     // expect(expected).to.equal(rows[rowIdx][colIdx]);
          //     cy.log(`test: ${test} expected: ${rows[rowIdx][colIdx]} rowIdx: ${rowIdx} colIdx: ${colIdx}`);
          //   });
          // });

        });

    }
    assertTable('city-populations-split.json');
    
    
  });

});
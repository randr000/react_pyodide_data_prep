import { pythonScripts } from "./cy-constants";

const {capitalizeColumns, applyStateUppercase, multiplyPopByTwo, concatByIndex} = pythonScripts;
const connectFirst = '(Connect components then upload data)';
const uploadFirst = '(Upload data then connect components)';

describe('test-script', () => {

    let testName = 'Should capitalize columns';
    it(`${testName} ${connectFirst}`, () => {
        cy.clickNavBarButton('Upload');
        cy.clickNavBarButton('Script');

        cy.connectDataComponents(0, 1, {force: true});
        cy.uploadFile('city-populations.xlsx', 'Upload-0');

        cy.get('.bi-filetype-py').click({force: true});
        cy.get('.view-line').click({force: true});
        cy.get('.monaco-editor textarea').click({force: true}).type('{ctrl}a', {force: true}).type(capitalizeColumns, {parseSpecialCharSequences: false, force: true});
        cy.contains('button', 'Save Changes').click({force: true});

        cy.assertTable('script-column-capitalized-split.json', '[data-testid=table-1]');
    });

    it(`${testName} ${uploadFirst}`, () => {
        cy.clickNavBarButton('Upload');
        cy.clickNavBarButton('Script');

        cy.uploadFile('city-populations.xlsx', 'Upload-0');
        cy.connectDataComponents(0, 1, {force: true});

        cy.get('.bi-filetype-py').click({force: true});
        cy.get('.view-line').click({force: true});
        cy.get('.monaco-editor textarea').click({force: true}).type('{ctrl}a', {force: true}).type(capitalizeColumns, {parseSpecialCharSequences: false, force: true});
        cy.contains('button', 'Save Changes').click({force: true});

        cy.assertTable('script-column-capitalized-split.json', '[data-testid=table-1]');        
    });

    testName = 'Should make states uppercase';
    it(`${testName} ${connectFirst}`, () => {
        cy.clickNavBarButton('Upload');
        cy.clickNavBarButton('Script');

        cy.connectDataComponents(0, 1, {force: true});
        cy.uploadFile('city-populations.xlsx', 'Upload-0');

        cy.get('.bi-filetype-py').click({force: true});
        cy.get('.view-line').click({force: true});
        cy.get('.monaco-editor textarea').click({force: true})
            .type('{ctrl}a', {force: true}).type(applyStateUppercase[0], {parseSpecialCharSequences: false, force: true})
            .type('{home}', {force: true})
            .type(applyStateUppercase[1], {parseSpecialCharSequences: false, force: true});
        cy.contains('button', 'Save Changes').click({force: true});

        cy.assertTable('script-state-uppercase-split.json', '[data-testid=table-1]');
    });

    it(`${testName} ${uploadFirst}`, () => {
        cy.clickNavBarButton('Upload');
        cy.clickNavBarButton('Script');

        cy.uploadFile('city-populations.xlsx', 'Upload-0');
        cy.connectDataComponents(0, 1, {force: true});

        cy.get('.bi-filetype-py').click({force: true});
        cy.get('.view-line').click({force: true});
        cy.get('.monaco-editor textarea').click({force: true})
            .type('{ctrl}a', {force: true}).type(applyStateUppercase[0], {parseSpecialCharSequences: false, force: true})
            .type('{home}', {force: true})
            .type(applyStateUppercase[1], {parseSpecialCharSequences: false, force: true});
        cy.contains('button', 'Save Changes').click({force: true});

        cy.assertTable('script-state-uppercase-split.json', '[data-testid=table-1]');        
    });

    testName = 'Should multiply population by two';
    it(`${testName} ${connectFirst}`, () => {
        cy.clickNavBarButton('Upload');
        cy.clickNavBarButton('Script');

        cy.connectDataComponents(0, 1, {force: true});
        cy.uploadFile('city-populations.xlsx', 'Upload-0');

        cy.get('.bi-filetype-py').click({force: true});
        cy.get('.view-line').click({force: true});
        cy.get('.monaco-editor textarea').click({force: true}).type('{ctrl}a', {force: true}).type(multiplyPopByTwo, {parseSpecialCharSequences: false, force: true});
        cy.contains('button', 'Save Changes').click({force: true});

        cy.assertTable('script-pop-mult2-split.json', '[data-testid=table-1]');
    });

    it(`${testName} ${uploadFirst}`, () => {
        cy.clickNavBarButton('Upload');
        cy.clickNavBarButton('Script');

        cy.uploadFile('city-populations.xlsx', 'Upload-0');
        cy.connectDataComponents(0, 1, {force: true});

        cy.get('.bi-filetype-py').click({force: true});
        cy.get('.view-line').click({force: true});
        cy.get('.monaco-editor textarea').click({force: true}).type('{ctrl}a', {force: true}).type(multiplyPopByTwo, {parseSpecialCharSequences: false, force: true});
        cy.contains('button', 'Save Changes').click({force: true});

        cy.assertTable('script-pop-mult2-split.json', '[data-testid=table-1]');        
    });

    testName = 'Should concatenate two dataframes by their index';
    it(`${testName} ${connectFirst}`, () => {
        cy.clickNavBarButton('Upload');
        cy.clickNavBarButton('Upload');
        cy.clickNavBarButton('Script');

        cy.connectDataComponents(0, 2, {force: true});
        cy.connectDataComponents(1, 2, {force: true});
        cy.uploadFile('state-populations-2.xlsx', 'Upload-0');
        cy.uploadFile('state-populations-3.xlsx', 'Upload-1');

        cy.get('.bi-filetype-py').click({force: true});
        cy.get('.view-line').click({force: true});
        cy.get('.monaco-editor textarea').click({force: true}).type('{ctrl}a', {force: true}).type(concatByIndex, {parseSpecialCharSequences: false, force: true});
        cy.contains('button', 'Save Changes').click({force: true});

        cy.assertTable('script-state-pop-concat-split.json', '[data-testid=table-2]');
    });

    it(`${testName} ${uploadFirst}`, () => {
        cy.clickNavBarButton('Upload');
        cy.clickNavBarButton('Upload');
        cy.clickNavBarButton('Script');

        cy.uploadFile('state-populations-2.xlsx', 'Upload-0');
        cy.uploadFile('state-populations-3.xlsx', 'Upload-1');
        cy.connectDataComponents(0, 2, {force: true});
        cy.connectDataComponents(1, 2, {force: true});

        cy.get('.bi-filetype-py').click({force: true});
        cy.get('.view-line').click({force: true});
        cy.get('.monaco-editor textarea').click({force: true}).type('{ctrl}a', {force: true}).type(concatByIndex, {parseSpecialCharSequences: false, force: true});
        cy.contains('button', 'Save Changes').click({force: true});

        cy.assertTable('script-state-pop-concat-split.json', '[data-testid=table-2]');       
    });

    testName = 'Should show when there is an error in the Python script'
    it(`${testName} ${uploadFirst}`, () => {
        cy.clickNavBarButton('Upload');
        cy.clickNavBarButton('Script');

        cy.uploadFile('city-populations.xlsx', 'Upload-0');
        cy.connectDataComponents(0, 1, {force: true});

        cy.get('.bi-filetype-py').click({force: true});
        cy.get('.view-line').click({force: true});
        cy.get('.monaco-editor textarea').click({force: true}).type('{ctrl}a', {force: true}).type('df=;', {parseSpecialCharSequences: false, force: true});
        cy.contains('button', 'Save Changes').click({force: true});

        cy.get('.bi-filetype-py.text-danger').should('exist');
        cy.contains('button', 'See Python Error').click({force: true});
        cy.contains(/^PythonError:.*/).should('exist');
        cy.contains('button', 'Close').click({force: true});
        cy.assertTable('city-populations-split.json', '[data-testid=table-1]');
        
        cy.get('.bi-filetype-py').click({force: true});
        cy.get('.view-line').click({force: true});
        cy.get('.monaco-editor textarea').click({force: true}).type('{ctrl}a', {force: true}).type('df=df', {parseSpecialCharSequences: false, force: true});
        cy.contains('button', 'Save Changes').click({force: true});

        cy.get('.bi-filetype-py.text-success').should('exist');
        cy.contains('button', 'See Python Error').should('not.exist');
        cy.contains(/^PythonError:.*/).should('not.exist');
        cy.assertTable('city-populations-split.json', '[data-testid=table-1]');
    });
});
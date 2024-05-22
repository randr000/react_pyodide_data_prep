import { pythonScripts } from "./cy-constants";

describe('Downloading files and verifying contents', () => {
    it('Should download files from Upload component', () => {
        cy.clickNavBarButton('Upload');
        cy.uploadFile('state-populations-all.xlsx');
        cy.validateDownload('Upload', 0, 'state-populations', ['xlsx']);
        cy.clickNavBarButton('Remove All');
        cy.clickNavBarButton('Upload', {force: true});
        cy.uploadFile('state-populations.xlsx', 'Upload-0', 'cypress/downloads/');
        cy.assertTable('state-populations-all-split.json');
    });

    it('Should download files from Download component', () => {
        cy.clickNavBarButton('Upload');
        cy.clickNavBarButton('Download');
        cy.connectDataComponents(0, 1, {force: true});
        cy.uploadFile('state-populations-all.xlsx');
        cy.validateDownload('Download', 1, 'state-populations', ['xlsx']);
        cy.clickNavBarButton('Remove All');
        cy.clickNavBarButton('Upload', {force: true});
        cy.uploadFile('state-populations.xlsx', 'Upload-0', 'cypress/downloads/');
        cy.assertTable('state-populations-all-split.json');

    });

    it('Should download files from Filter Columns component', () => {
        cy.clickNavBarButton('Upload');
        cy.clickNavBarButton('Filter Columns');
        cy.connectDataComponents(0, 1, {force: true});
        cy.uploadFile('city-populations.txt');
        cy.get('input[type=checkbox]').uncheck('state', {force: true});
        cy.validateDownload('Filter Columns', 1, 'city-pop', ['csv', 'xlsx', 'json-split']);
        cy.clickNavBarButton('Remove All');
        cy.clickNavBarButton('Upload', {force: true});
        cy.uploadFile('city-pop.xlsx', 'Upload-0', 'cypress/downloads/');
        cy.assertTable('city-populations-filtered-out-state-split.json');
    });

    it('Should download files from Filter Rows component', () => {
        cy.clickNavBarButton('Upload');
        cy.clickNavBarButton('Filter Rows');
        cy.connectDataComponents(0, 1, {force: true});
        cy.uploadFile('city-populations.csv');
        cy.get('#filter-row-col-sel-1').select('state');
        cy.get('#filter-row-op-sel-1').select('!=');
        cy.get('#filter-row-value-1').clear().type('California');
        cy.validateDownload('Filter Rows', 1, 'city-pop', ['csv', 'xlsx', 'json-split']);
        cy.clickNavBarButton('Remove All');
        cy.clickNavBarButton('Upload', {force: true});
        cy.uploadFile('city-pop.csv', 'Upload-0', 'cypress/downloads/');
        cy.assertTable('city-populations-filtered-out-California-split.json');
    });

    it("Should download files from the Join component", () => {
        cy.clickNavBarButton('Upload');
        cy.clickNavBarButton('Upload');
        cy.clickNavBarButton('Join');
        
        cy.connectDataComponents(0, 2, {force: true});
        cy.connectDataComponents(1, 2, {force: true});
       
        cy.uploadFile('city-populations.csv', 'Upload-0');
        cy.wait(3000);
        cy.uploadFile('state-populations-all.txt', 'Upload-1');

        cy.validateDownload('Join', 2, 'city-state-join', ['csv', 'xlsx', 'json-split', 'json-records', 'txt']);

        cy.clickNavBarButton('Remove All');
        cy.clickNavBarButton('Upload', {force: true});
        cy.uploadFile('city-state-join.csv', 'Upload-0', 'cypress/downloads/');
        cy.assertTable('city-state-inner-split.json');

    });

    it('Should download files from the Union component', () => {
        cy.clickNavBarButton('Upload');
        cy.clickNavBarButton('Upload');
        cy.clickNavBarButton('Upload');
        cy.clickNavBarButton('Union');

        cy.connectDataComponents(0, 3, {force: true});
        cy.connectDataComponents(1, 3, {force: true});
        cy.connectDataComponents(2, 3, {force: true});
    
        cy.uploadFile('state-populations-1.xlsx', 'Upload-0');
        cy.wait(5000);
        cy.uploadFile('state-populations-2.xlsx', 'Upload-1');
        cy.wait(5000);
        cy.uploadFile('state-populations-3.xlsx', 'Upload-2');

        cy.validateDownload('Union', 3, 'state-pop', ['csv', 'xlsx', 'json-split', 'json-records', 'txt']);

        cy.clickNavBarButton('Remove All');
        cy.clickNavBarButton('Upload', {force: true});
        cy.uploadFile('state-pop.txt', 'Upload-0', 'cypress/downloads/');
        cy.assertTable('state-populations-all-split.json');
    });

    it('Should download files from Script Component', () => {
        cy.clickNavBarButton('Upload');
        cy.clickNavBarButton('Upload');
        cy.clickNavBarButton('Script');

        cy.uploadFile('state-populations-2.xlsx', 'Upload-0');
        cy.uploadFile('state-populations-3.xlsx', 'Upload-1');
        cy.connectDataComponents(0, 2, {force: true});
        cy.connectDataComponents(1, 2, {force: true});

        cy.get('.bi-filetype-py').click();
        cy.get('#python-script-2').clear().type(pythonScripts.concatByIndex, {parseSpecialCharSequences: false});
        cy.contains('button', 'Save Changes').click();

        cy.validateDownload('Script', 2, 'script-test', ['csv', 'xlsx']);

        cy.clickNavBarButton('Remove All');
        cy.clickNavBarButton('Upload', {force: true});
        cy.uploadFile('script-test.xlsx', 'Upload-0', 'cypress/downloads/');

        cy.assertTable('script-state-pop-concat-split.json');
    });
});
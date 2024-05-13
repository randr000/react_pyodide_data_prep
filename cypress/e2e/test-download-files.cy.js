describe('Downloading files and verifying contents', () => {
    it('Should download files from Upload component', () => {
        cy.clickNavBarButton('Upload');
        cy.uploadFile('state-populations-all.xlsx');
        cy.validateDownload('Upload', 0, 'state-populations', ['xlsx']);
    });

    it('Should download files from Download component', () => {
        cy.clickNavBarButton('Upload');
        cy.clickNavBarButton('Download');
        cy.connectDataComponents(0, 1, {force: true});
        cy.uploadFile('state-populations-all.xlsx');
        cy.validateDownload('Download', 1, 'state-populations', ['xlsx']);

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
        cy.uploadFile('city-pop.xlsx', false, 'cypress/downloads/');
        cy.assertTable('city-populations-filtered-out-state-split.json');
    });
});
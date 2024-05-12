describe('Downloading files and verifying contents', () => {
    it('Should download files from Upload component', () => {
        cy.clickNavBarButton('Upload');
        cy.uploadFile('state-populations-all.xlsx');
        cy.validateDownload('Upload', 0, 'state-populations', 'xlsx');
    });

    it('Should download files from Download component', () => {
        cy.clickNavBarButton('Upload');
        cy.clickNavBarButton('Download');
        cy.connectDataComponents(0, 1, {force: true});
        cy.uploadFile('state-populations-all.xlsx');
        cy.validateDownload('Download', 1, 'state-populations', 'xlsx');

    });
});
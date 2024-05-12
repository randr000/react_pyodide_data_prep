it('Should download files', () => {
    cy.clickNavBarButton('Upload');
    cy.uploadFile('state-populations-all.xlsx');
    cy.validateDownload('Upload', 0, 'state-populations', 'xlsx');
});
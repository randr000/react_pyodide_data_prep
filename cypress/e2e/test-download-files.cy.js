it('Should download files', () => {
    cy.clickNavBarButton('Upload');
    cy.validateDownload('Upload', 0, 'state-populations-all.xlsx', 'xlsx');
});
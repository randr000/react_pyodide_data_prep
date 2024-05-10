it('Should download files', () => {
    cy.clickNavBarButton('Upload');
    cy.uploadFile('state-populations-all.xlsx');
    cy.get('[data-testid=Upload-0').find('.bi-file-earmark-arrow-down').click();
    cy.get('[data-testid=Upload-0').find('.download-pill').find('input[type=checkbox]').check('xlsx');
    cy.get('[data-testid=Upload-0').find('.bi-box-arrow-down').click();
    cy.readFile('cypress/downloads/0-Upload.xlsx').should('exist');
});
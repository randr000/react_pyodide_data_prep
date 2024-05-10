it('Should connect two data components with an arrow and then delete it', () => {
    cy.clickNavBarButton('Upload');

    cy.contains('h5', 'Upload')
      .trigger('mousedown').trigger('mousemove', {clientX: 500, clientY: 500}).trigger('mouseup');

    cy.clickNavBarButton('Download');

    cy.contains('h5', 'Download')
      .trigger('mousedown').trigger('mousemove', {clientX: 200, clientY: 200}).trigger('mouseup');

    cy.connectDataComponents(0, 1);
    
    cy.get('#del-0-btm_1-top').should('exist');
    cy.get('#del-0-btm_1-top').trigger('mouseover', {force: true}).click();
    cy.get('#del-0-btm_1-top').should('not.exist');
});
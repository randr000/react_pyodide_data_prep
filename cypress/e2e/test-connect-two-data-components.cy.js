describe('test-connect-two-data-components', () => {
  it('Should connect two data components with an arrow and then delete it', () => {
      cy.clickNavBarButton('Upload');

      cy.contains('h5', 'Upload')
        .trigger('mousedown', {force: true}).trigger('mousemove', {clientX: 500, clientY: 500, force: true}).trigger('mouseup', {force: true});

      cy.clickNavBarButton('Download');

      cy.contains('h5', 'Download')
        .trigger('mousedown', {force: true}).trigger('mousemove', {clientX: 800, clientY: 800, force: true}).trigger('mouseup', {force: true});

      cy.connectDataComponents(0, 1);
      
      cy.get('#del-0-btm_1-top').should('exist');
      cy.get('#del-0-btm_1-top > .bi').trigger('mouseover', {force: true}).click({force: true});
      cy.get('#del-0-btm_1-top').should('not.exist');
  });
});
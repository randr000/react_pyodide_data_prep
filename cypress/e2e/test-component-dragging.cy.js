describe('test-component-dragging', () => {
  it('Should drag a data component', () => {

      cy.clickNavBarButton('Upload');
      cy.contains('h5', 'Upload')
        .then(target => {
          const coords = target[0].getBoundingClientRect();
          
          cy.contains('h5', 'Upload')
            .trigger('mousedown')
            .trigger('mousemove', {clientX: 500, clientY: 500})
            .trigger('mouseup');

          cy.contains('h5', 'Upload').then(target => {
            const newCoords = target[0].getBoundingClientRect();
            expect(newCoords.x).to.be.greaterThan(coords.x);
            expect(newCoords.y).to.be.greaterThan(coords.y);
          });
        });
  });

  it('Should drag a data component after removing a component', () => {

    cy.clickNavBarButton('Upload');
    cy.get('.bi-x-circle').trigger('mouseover', {force: true}).click({force: true});

    cy.clickNavBarButton('Upload');
    cy.contains('h5', 'Upload')
      .then(target => {
        const coords = target[0].getBoundingClientRect();
        
        cy.contains('h5', 'Upload')
          .trigger('mousedown')
          .trigger('mousemove', {clientX: 500, clientY: 500})
          .trigger('mouseup');

        cy.contains('h5', 'Upload').then(target => {
          const newCoords = target[0].getBoundingClientRect();
          expect(newCoords.x).to.be.greaterThan(coords.x);
          expect(newCoords.y).to.be.greaterThan(coords.y);
        });
      });
  });
});
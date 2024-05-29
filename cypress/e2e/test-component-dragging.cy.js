describe('test-component-dragging', () => {
  it('Should drag a data component', () => {

      cy.clickNavBarButton('Upload');
      cy.contains('h5', 'Upload')
        .then(target => {
          const coords = target[0].getBoundingClientRect();
          cy.dragDataComponent('Upload', 0, 500, 500);

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

        cy.dragDataComponent('Upload', 1, 500, 500);

        cy.contains('h5', 'Upload').then(target => {
          const newCoords = target[0].getBoundingClientRect();
          expect(newCoords.x).to.be.greaterThan(coords.x);
          expect(newCoords.y).to.be.greaterThan(coords.y);
        });
      });
  });
});
it('Should connect multiple arrows to a component allowing multiple sources without producing duplicate arrows', () => {
    cy.contains('button', 'Upload').click();
    cy.get('[data-testid=Upload-0]').trigger('mousedown').trigger('mousemove', {clientX: 600, clientY: 300}).trigger('mouseup');
    cy.contains('button', 'Upload').click();
    cy.get('[data-testid=Upload-1]').trigger('mousedown').trigger('mousemove', {clientX: 350, clientY: 300}).trigger('mouseup');
    cy.contains('button', 'Upload').click();
    cy.get('[data-testid=Upload-2]').trigger('mousedown').trigger('mousemove', {clientX: 100, clientY: 300}).trigger('mouseup');
    cy.contains('button', 'Union').click();
    cy.get('[data-testid=Union-3]').trigger('mousedown').trigger('mousemove', {clientX: 350, clientY: 2000}).trigger('mouseup');

    cy.get('#0-btm').click({force: true});
    cy.get('#3-top').click({force: true});

    cy.get('#0-btm').click({force: true});
    cy.get('#3-top').click({force: true});

    cy.get('#1-btm').click({force: true});
    cy.get('#3-top').click({force: true});

    cy.get('#2-btm').click({force: true});
    cy.get('#3-top').click({force: true});

    cy.get('#del-0-btm_3-top').should('exist');
    cy.get('#del-0-btm_3-top').should('have.length', 1);
    cy.get('#del-1-btm_3-top').should('exist');
    cy.get('#del-2-btm_3-top').should('exist');

    cy.get('#del-0-btm_3-top').trigger('mouseover', {force: true}).click();
    cy.get('#del-0-btm_3-top').should('not.exist');

    cy.get('#del-1-btm_3-top').trigger('mouseover', {force: true}).click();
    cy.get('#del-1-btm_3-top').should('not.exist');

    cy.get('#del-2-btm_3-top').trigger('mouseover', {force: true}).click();
    cy.get('#del-2-btm_3-top').should('not.exist');
});
describe('test-multiple-sources-data-component', () => {
    it('Should connect multiple arrows to a component allowing multiple sources without producing duplicate arrows', () => {
        cy.clickNavBarButton('Upload');
        cy.get('[data-testid=Upload-0]').trigger('mousedown', {force: true}).trigger('mousemove', {clientX: 600, clientY: 300, force: true}).trigger('mouseup', {force: true});
        cy.clickNavBarButton('Upload');
        cy.get('[data-testid=Upload-1]').trigger('mousedown', {force: true}).trigger('mousemove', {clientX: 350, clientY: 300, force: true}).trigger('mouseup', {force: true});
        cy.clickNavBarButton('Upload');
        cy.get('[data-testid=Upload-2]').trigger('mousedown', {force: true}).trigger('mousemove', {clientX: 100, clientY: 300, force: true}).trigger('mouseup', {force: true});
        cy.clickNavBarButton('Union');
        cy.get('[data-testid=Union-3]').trigger('mousedown', {force: true}).trigger('mousemove', {clientX: 350, clientY: 400, force: true}).trigger('mouseup', {force: true});

        cy.connectDataComponents(0, 3, {force: true});
        cy.connectDataComponents(0, 3, {force: true});
        cy.connectDataComponents(1, 3, {force: true});
        cy.connectDataComponents(2, 3, {force: true});

        cy.get('#del-0-btm_3-top').should('exist');
        cy.get('#del-0-btm_3-top').should('have.length', 1);
        cy.get('#del-1-btm_3-top').should('exist');
        cy.get('#del-2-btm_3-top').should('exist');

        cy.get('#del-0-btm_3-top > .bi').trigger('mouseover', {force: true}).click({force: true});
        cy.get('#del-0-btm_3-top').should('not.exist');

        cy.get('#del-1-btm_3-top > .bi').trigger('mouseover', {force: true}).click({force: true});
        cy.get('#del-1-btm_3-top').should('not.exist');

        cy.get('#del-2-btm_3-top > .bi').trigger('mouseover', {force: true}).click({force: true});
        cy.get('#del-2-btm_3-top').should('not.exist');
    });
});
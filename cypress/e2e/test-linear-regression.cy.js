describe('test-linear-regression', () => {

    function renderComponents() {
        cy.clickNavBarButton('Upload');
        cy.uploadFile('home-prices-low-error.csv');
        cy.clickNavBarButton('Linear Regression');
        cy.connectDataComponents(0, 1, {force: true});
        cy.dragDataComponent('Linear Regression', 1, 800, 200);
    }

    function assertTrainingAndPredictions() {
        cy.get('.fa-chart-line').should('have.class', 'text-success');
        cy.contains(7.06).should('exist');
        cy.contains(73.75).should('exist');
        cy.contains(1.00).should('exist');
        cy.contains('25,000.30').should('exist');
        cy.contains('99,995.09').should('exist');
        cy.get('#bathrooms-1').clear({force: true}).type('1', {force: true});
        cy.get('#bedrooms-1').clear({force: true}).type('1', {force: true});
        cy.contains('125,014.24').should('exist');
    }

    function enterTrainingParameters() {
        cy.get('.fa-chart-line').click({force: true});
        cy.get('input[type=checkbox]').check('bathrooms', {force: true});
        cy.get('input[type=checkbox]').check('bedrooms', {force: true});
        cy.get('#lr-modal-y-col-1').select('price', {force: true});
        cy.contains('button', 'Save Changes').click({force: true});
    }

    it('Should make the icon color red when there is a training error', () => {
        cy.clickNavBarButton('Linear Regression');
        cy.get('.fa-chart-line').should('not.have.class', 'text-success');
        cy.get('.fa-chart-line').should('not.have.class', 'text-danger');
        cy.contains('button', 'Train').click({force: true});
        cy.get('.fa-chart-line').should('have.class', 'text-danger');
    });

    it('Should train a linear regression model and make predictions (Auto Train Off)', () => {
        renderComponents();
        enterTrainingParameters();
        cy.contains('button', 'Train').click({force: true});
        assertTrainingAndPredictions();
    });

    it('Should train a linear regression model and make predictions (Auto Train On)', () => {
        renderComponents();
        cy.get('#auto-train-switch-1').check({force: true});
        cy.get('.fa-chart-line').should('have.class', 'text-danger');
        enterTrainingParameters();
        assertTrainingAndPredictions();
    });
});
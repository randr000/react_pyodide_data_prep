it('Should filter data columns correctly', () => {
    cy.clickNavBarButton('Upload');
    cy.uploadFile('city-populations.xlsx');
    cy.clickNavBarButton('Filter Columns');
    cy.connectDataComponents(0, 1, {force: true});

    cy.get('input[type=checkbox]').uncheck('state', {force: true});
    cy.assertTable('city-populations-filtered-out-state-split.json', '[data-testid=table-1]');
    cy.get('input[type=checkbox]').check({force: true});

    cy.get('input[type=checkbox]').uncheck('city', {force: true});
    cy.assertTable('city-populations-filtered-out-city-split.json', '[data-testid=table-1]');
    cy.get('input[type=checkbox]').check({force: true});

    cy.get('input[type=checkbox]').uncheck(['state', 'city'], {force: true});
    cy.assertTable('city-populations-filtered-out-state-and-city-split.json', '[data-testid=table-1]');
    cy.get('input[type=checkbox]').check({force: true});

    cy.assertTable('city-populations-split.json', '[data-testid=table-1]');
});
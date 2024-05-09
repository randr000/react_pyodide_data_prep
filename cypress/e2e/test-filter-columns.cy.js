it('Should filter data columns correctly', () => {
    cy.get('button').contains('Upload').click();
    cy.uploadFile('city-populations.xlsx');
    cy.get('button').contains('Filter Columns').click();
    cy.get('#0-btm').click();
    cy.get('#1-top').click();

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
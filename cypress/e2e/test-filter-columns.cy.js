describe('test-filter-columns', () => {
    it('Should filter data columns correctly', () => {
        cy.clickNavBarButton('Upload');
        cy.dragDataComponent('Upload', 0, 500, 500);
        cy.uploadFile('city-populations.xlsx');
        cy.clickNavBarButton('Filter Columns');
        cy.dragDataComponent('Filter Columns', 1, 1000, 1000);
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
});
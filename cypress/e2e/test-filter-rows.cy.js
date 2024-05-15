it('Should filter data rows correctly', () => {
    cy.clickNavBarButton('Upload');
    cy.uploadFile('city-populations.xlsx');
    cy.clickNavBarButton('Filter Rows');
    cy.connectDataComponents(0, 1, {force: true});

    // Filter rows where state = California
    cy.get('#filter-row-col-sel-1').select('state');
    cy.get('#filter-row-op-sel-1').select('==');
    cy.get('#filter-row-value-1').clear().type('California');
    cy.assertTable('city-populations-filtered-for-California-split.json', '[data-testid=table-1]');
    
    // Filter rows where population = 456,229
    cy.get('#filter-row-col-sel-1').select('population');
    cy.get('#filter-row-op-sel-1').select('==');
    cy.get('#filter-row-value-1').clear().type('456229');
    cy.assertTable('city-populations-filtered-for-pop-456229-split.json', '[data-testid=table-1]');
    
    // Filter rows where state != California
    cy.get('#filter-row-col-sel-1').select('state');
    cy.get('#filter-row-op-sel-1').select('!=');
    cy.get('#filter-row-value-1').clear().type('California');
    cy.assertTable('city-populations-filtered-out-California-split.json', '[data-testid=table-1]');
    
    // Filter rows where population != 456,229
    cy.get('#filter-row-col-sel-1').select('population');
    cy.get('#filter-row-op-sel-1').select('!=');
    cy.get('#filter-row-value-1').clear().type('456229');
    cy.assertTable('city-populations-filtered-out-pop-456229-split.json', '[data-testid=table-1]');
    
    // Filter rows where population > 456,229
    cy.get('#filter-row-col-sel-1').select('population');
    cy.get('#filter-row-op-sel-1').select('>');
    cy.get('#filter-row-value-1').clear().type('456229');
    cy.assertTable('city-populations-filtered-pop-gt-456229-split.json', '[data-testid=table-1]');
    
    // Filter rows where population >= 456,229
    cy.get('#filter-row-col-sel-1').select('population');
    cy.get('#filter-row-op-sel-1').select('>=');
    cy.get('#filter-row-value-1').clear().type('456229');
    cy.assertTable('city-populations-filtered-pop-gte-456229-split.json', '[data-testid=table-1]');
    
    // Filter rows where population < 456,229
    cy.get('#filter-row-col-sel-1').select('population');
    cy.get('#filter-row-op-sel-1').select('<');
    cy.get('#filter-row-value-1').clear().type('456229');
    cy.assertTable('city-populations-filtered-pop-lt-456229-split.json', '[data-testid=table-1]');
    
    // Filter rows where population <= 456,229
    cy.get('#filter-row-col-sel-1').select('population');
    cy.get('#filter-row-op-sel-1').select('<=');
    cy.get('#filter-row-value-1').clear().type('456229');
    cy.assertTable('city-populations-filtered-pop-lte-456229-split.json', '[data-testid=table-1]');
});
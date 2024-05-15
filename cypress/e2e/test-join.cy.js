it('Should join the data correctly', () => {
    cy.clickNavBarButton('Upload');
    cy.clickNavBarButton('Upload');
    cy.clickNavBarButton('Join');
    
    cy.connectDataComponents(0, 2, {force: true});
    cy.connectDataComponents(1, 2, {force: true});
   
    cy.uploadFile('city-populations.csv', 'Upload-0');
    cy.wait(3000);
    cy.uploadFile('state-populations-all.txt', 'Upload-1');

    cy.assertTable('city-state-inner-split.json', '[data-testid=table-2]');
    cy.get('#join-type-select-2').select('Outer');
    cy.assertTable('city-state-inner-split.json', '[data-testid=table-2]');
    cy.get('#join-type-select-2').select('Left');
    cy.assertTable('city-state-left-split.json', '[data-testid=table-2]');
    cy.get('#join-type-select-2').select('Right');
    cy.assertTable('city-state-right-split.json', '[data-testid=table-2]');
    cy.get('#join-type-select-2').select('Cross');
    cy.assertTable('city-state-cross-split.json', '[data-testid=table-2]');
});
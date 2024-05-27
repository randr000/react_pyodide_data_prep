describe('test-join', () => {

    it('Should join the data correctly (Connect components then upload data)', () => {
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

    it('Should join the data correctly (Upload data then connect components)', () => {
        cy.clickNavBarButton('Upload');
        cy.clickNavBarButton('Upload');
        cy.clickNavBarButton('Join');

        cy.uploadFile('city-populations.csv', 'Upload-0');
        cy.wait(3000);
        cy.uploadFile('state-populations-all.txt', 'Upload-1');
        
        cy.connectDataComponents(0, 2, {force: true});
        cy.connectDataComponents(1, 2, {force: true});

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
});
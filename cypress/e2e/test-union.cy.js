describe('Union component', () => {


    it('Should combine the data and display correctly when using the union data component (Connect components then upload data)', () => {
        cy.clickNavBarButton('Upload');
        cy.get('[data-testid=Upload-0]').trigger('mousedown').trigger('mousemove', {clientX: 600, clientY: 300}).trigger('mouseup');
        
        cy.clickNavBarButton('Upload');
        cy.get('[data-testid=Upload-1]').trigger('mousedown').trigger('mousemove', {clientX: 350, clientY: 300}).trigger('mouseup');
        
        cy.clickNavBarButton('Upload');
        cy.get('[data-testid=Upload-2]').trigger('mousedown').trigger('mousemove', {clientX: 100, clientY: 300}).trigger('mouseup');
        
        cy.clickNavBarButton('Union');

        cy.connectDataComponents(0, 3, {force: true});
        cy.connectDataComponents(1, 3, {force: true});
        cy.connectDataComponents(2, 3, {force: true});

        cy.uploadFile('state-populations-1.xlsx', 'Upload-0');
        cy.wait(5000);
        cy.uploadFile('state-populations-2.xlsx', 'Upload-1');
        cy.wait(5000);
        cy.uploadFile('state-populations-3.xlsx', 'Upload-2');

        cy.assertTable('state-populations-1-split.json', '[data-testid=table-0]');
        cy.assertTable('state-populations-2-split.json', '[data-testid=table-1]');
        cy.assertTable('state-populations-3-split.json', '[data-testid=table-2]');
        cy.assertTable('state-populations-all-split.json', '[data-testid=table-3]');
    });

    it('Should combine the data and display correctly when using the union data component (Upload data then connect components)', () => {
        cy.clickNavBarButton('Upload');
        cy.get('[data-testid=Upload-0]').trigger('mousedown').trigger('mousemove', {clientX: 600, clientY: 300}).trigger('mouseup');
        
        cy.clickNavBarButton('Upload');
        cy.get('[data-testid=Upload-1]').trigger('mousedown').trigger('mousemove', {clientX: 350, clientY: 300}).trigger('mouseup');
        
        cy.clickNavBarButton('Upload');
        cy.get('[data-testid=Upload-2]').trigger('mousedown').trigger('mousemove', {clientX: 100, clientY: 300}).trigger('mouseup');
        
        cy.clickNavBarButton('Union');

        cy.uploadFile('state-populations-1.xlsx', 'Upload-0');
        cy.wait(5000);
        cy.uploadFile('state-populations-2.xlsx', 'Upload-1');
        cy.wait(5000);
        cy.uploadFile('state-populations-3.xlsx', 'Upload-2');

        cy.connectDataComponents(0, 3, {force: true});
        cy.connectDataComponents(1, 3, {force: true});
        cy.connectDataComponents(2, 3, {force: true});

        cy.assertTable('state-populations-1-split.json', '[data-testid=table-0]');
        cy.assertTable('state-populations-2-split.json', '[data-testid=table-1]');
        cy.assertTable('state-populations-3-split.json', '[data-testid=table-2]');
        cy.assertTable('state-populations-all-split.json', '[data-testid=table-3]');
    });
});
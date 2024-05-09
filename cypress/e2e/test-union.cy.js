it('Should combine the data and display correctly when using the union data component', () => {
    cy.clickNavBarButton('Upload');
    cy.get('[data-testid=Upload-0]').trigger('mousedown').trigger('mousemove', {clientX: 600, clientY: 300}).trigger('mouseup');
    
    cy.clickNavBarButton('Upload');
    cy.get('[data-testid=Upload-1]').trigger('mousedown').trigger('mousemove', {clientX: 350, clientY: 300}).trigger('mouseup');
    
    cy.clickNavBarButton('Upload');
    cy.get('[data-testid=Upload-2]').trigger('mousedown').trigger('mousemove', {clientX: 100, clientY: 300}).trigger('mouseup');
    
    cy.clickNavBarButton('Union');

    cy.get('#0-btm').click({force: true});
    cy.get('#3-top').click({force: true});

    cy.get('#1-btm').click({force: true});
    cy.get('#3-top').click({force: true});

    cy.get('#2-btm').click({force: true});
    cy.get('#3-top').click({force: true});

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
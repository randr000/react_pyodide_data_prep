describe('test-display-table-data', () => {
    it('Should have the data components display the table data correctly', () => {
        cy.clickNavBarButton('Upload');
        cy.uploadFile('city-populations.xlsx');
        cy.assertTable('city-populations-split.json');
    });
});
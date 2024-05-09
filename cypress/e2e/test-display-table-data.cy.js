it('Should have the data components display the table data correctly', () => {
    cy.get('button').contains('Upload').click();
    cy.uploadFile('city-populations.xlsx');
    cy.assertTable('city-populations-split.json');
});
it('Should upload file and alert if it is a valid filetype or not', () => {
    cy.clickNavBarButton('Upload');
    cy.assertValidUpload('city-populations.csv');
    cy.assertValidUpload('city-populations.txt');
    cy.assertValidUpload('city-populations.xlsx');
    cy.assertValidUpload('invalid-file.pdf', false);
    cy.assertValidUpload('city-populations-records.json');
    cy.assertValidUpload('city-populations-split.json');
});
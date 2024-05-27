describe('test-upload-file', () => {
    it('Should upload csv file', () => {
        cy.clickNavBarButton('Upload');
        cy.assertValidUpload('city-populations.csv');
    });

    it('Should upload txt file', () => {
        cy.clickNavBarButton('Upload');
        cy.assertValidUpload('city-populations.txt');
    });

    it('Should upload xlsx file', () => {
        cy.clickNavBarButton('Upload');
        cy.assertValidUpload('city-populations.xlsx');
    });

    it('Should upload pdf file and display error message', () => {
        cy.clickNavBarButton('Upload');
        cy.assertValidUpload('invalid-file.pdf', false);
    });

    it('Should upload json (records) file', () => {
        cy.clickNavBarButton('Upload');
        cy.assertValidUpload('city-populations-records.json');
    });

    it('Should upload json (split) file', () => {
        cy.clickNavBarButton('Upload');
        cy.assertValidUpload('city-populations-split.json');
    });
});
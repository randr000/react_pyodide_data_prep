describe('test-download-upload-state', () => {

    it.only('Should call showSaveFilePicker when Download State button is clicked', () => {
        cy.clickNavBarButton('Upload'); // 0
        cy.clickNavBarButton('Filter Columns'); // 1
        cy.clickNavBarButton('Filter Rows'); // 2
        cy.clickNavBarButton('Download'); // 3

        cy.connectDataComponents(0, 1, {force: true});
        cy.connectDataComponents(1, 2, {force: true});
        cy.connectDataComponents(2, 3, {force: true});

        cy.uploadFile('city-populations.csv');

        cy.dragDataComponent('Download', 3, 1500, 700);
        cy.dragDataComponent('Filter Rows', 2, 100, 700);
        cy.dragDataComponent('Upload', 0, 100, 250);
        cy.dragDataComponent('Filter Columns', 1, 1500, 250);

        cy.window().then(win => {
            cy.stub(win, 'showSaveFilePicker').as('showSaveFilePicker').returns({createWritable: () => {
                return {
                    write: () => {},
                    close: () => {}
                }
            }});
        });
        cy.clickDownloadState();
        cy.get('@showSaveFilePicker').should('have.been.calledOnce');
    });

});
describe('test-download-upload-state', () => {

    it('Should call showSaveFilePicker when Download State button is clicked', () => {
        cy.clickNavBarButton('Upload'); // 0
        cy.clickNavBarButton('Filter Columns'); // 1
        cy.clickNavBarButton('Filter Rows'); // 2
        cy.clickNavBarButton('Download'); // 3

        cy.connectDataComponents(0, 1, {force: true});
        cy.connectDataComponents(1, 2, {force: true});
        cy.connectDataComponents(2, 3, {force: true});

        cy.uploadFile('city-populations.csv');

        cy.dragDataComponent('Download', 3, 1500, 700, {force: true});
        cy.dragDataComponent('Filter Rows', 2, 100, 700, {force: true});
        cy.dragDataComponent('Upload', 0, 100, 250, {force: true});
        cy.dragDataComponent('Filter Columns', 1, 1500, 250, {force: true});

        const dataTestId = '[data-testid="Filter Columns-1"]';
        cy.get(dataTestId).find('.bi-file-earmark-arrow-down').click({force: true});
        cy.get(dataTestId).find('input[type=text]').clear().type('filtercols');
        cy.get(dataTestId).find('.download-pill').find('input[type=checkbox]').check('csv', {force: true});

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

    it('Should upload state from json file', () => {

        cy.uploadFile('state-upload.json', 'pipeline-upload');

        const dataTestId = '[data-testid="Filter Columns-1"]';
        cy.get(dataTestId).find('.bi-file-earmark-arrow-down').click({force: true});
        cy.get(dataTestId).find('input[type=text]').should('have.value', 'filtercols');
        cy.get(dataTestId).find('.download-pill').find('input[value="csv"]').should('be.checked');
        cy.get(dataTestId).find('.download-pill').find('input[value="xlsx"]').should('not.be.checked');
        cy.get(dataTestId).find('.download-pill').find('input[value="txt"]').should('not.be.checked');
        cy.get(dataTestId).find('.download-pill').find('input[value="json (split)"]').should('not.be.checked');
        cy.get(dataTestId).find('.download-pill').find('input[value="json (records)"]').should('not.be.checked');

        cy.get('[data-testid="Upload-0"]').should('exist');
        cy.get('[data-testid="Filter Rows-2"]').should('exist');
        cy.get('[data-testid="Download-3"]').should('exist');

        cy.get('#del-0-btm_1-top').should('exist');
        cy.get('#del-1-btm_2-top').should('exist');
        cy.get('#del-2-btm_3-top').should('exist');
    });
});
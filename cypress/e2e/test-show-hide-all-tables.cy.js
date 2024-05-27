it('Should correctly show and hide tables when corresponding buttons or icons are clicked', () => {
    cy.uploadFile('test-show-hide-all-tables.json', 'pipeline-upload');
    cy.wait(7000);

    const createArr = (bool, len=4) => [...Array(len)].fill(bool);

    [true, false, false, true].forEach((isVisible, idx) => {
        cy.assertTableVisible(idx, isVisible);
    });

    cy.toggleTableAndAssertVisible(1, true);
    cy.toggleTableAndAssertVisible(2, true);
    cy.toggleTableAndAssertVisible(1, false);
    cy.toggleTableAndAssertVisible(0, false);

    cy.hideAllTables();

    createArr(false).forEach((isVisible, idx) => {
        cy.assertTableVisible(idx, isVisible);
    });

    cy.toggleTableAndAssertVisible(3, true);
    cy.toggleTableAndAssertVisible(2, true);
    cy.toggleTableAndAssertVisible(3, false);
    cy.toggleTableAndAssertVisible(0, true);

    cy.hideAllTables();

    createArr(false).forEach((isVisible, idx) => {
        cy.assertTableVisible(idx, isVisible);
    });

    cy.toggleTableAndAssertVisible(0, true);
    cy.toggleTableAndAssertVisible(3, true);
    cy.toggleTableAndAssertVisible(0, false);
    cy.toggleTableAndAssertVisible(2, true);

    cy.showAllTables();

    createArr(true).forEach((isVisible, idx) => {
        cy.assertTableVisible(idx, isVisible);
    });

    cy.toggleTableAndAssertVisible(0, false);
    cy.toggleTableAndAssertVisible(3, false);
    cy.toggleTableAndAssertVisible(0, true);
    cy.toggleTableAndAssertVisible(1, false);

    cy.showAllTables();

    createArr(true).forEach((isVisible, idx) => {
        cy.assertTableVisible(idx, isVisible);
    });

    cy.toggleTableAndAssertVisible(0, false);
    cy.toggleTableAndAssertVisible(3, false);
    cy.toggleTableAndAssertVisible(0, true);
    cy.toggleTableAndAssertVisible(1, false);

    cy.hideAllTables();

    createArr(false).forEach((isVisible, idx) => {
        cy.assertTableVisible(idx, isVisible);
    });

    cy.toggleTableAndAssertVisible(0, true);
    cy.toggleTableAndAssertVisible(3, true);
    cy.toggleTableAndAssertVisible(0, false);
    cy.toggleTableAndAssertVisible(2, true);

    cy.showAllTables();

    createArr(true).forEach((isVisible, idx) => {
        cy.assertTableVisible(idx, isVisible);
    });
});
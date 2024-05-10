import { wait } from "@testing-library/user-event/dist/utils";

it('Should download files', () => {
    cy.clickNavBarButton('Upload');
    cy.uploadFile('state-populations-all.xlsx');
    cy.wait(5000);
    cy.get('[data-testid=Upload-0').find('.bi-file-earmark-arrow-down').click();
    // cy.get('[data-testid=Upload-0').find('form').next().within(() => {
    //     cy.get('[input[type=checkbox]').check('xlsx');
    // });
    cy.get('[data-testid=Upload-0').find('.download-pill').find('input[type=checkbox]').check('xlsx');
    cy.get('[data-testid=Upload-0').find('.bi-box-arrow-down').click();
});
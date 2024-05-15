import { navbarComponentBtns } from "./cy-constants";

it('Should show correct component after clicking on its corresponding button on NavBar and then not show it after clicking on delete button', () => {
    
    const dataComponentTitles = navbarComponentBtns;
    dataComponentTitles.forEach(title => {
      cy.clickNavBarButton(title);
      cy.contains('h5', title).should('exist');
      cy.get('.bi-x-circle').trigger('mouseover', {force: true}).click();
      cy.contains('h5', title).should('not.exist');
    });
});
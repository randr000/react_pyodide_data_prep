import { plottingScripts } from "./cy-constants";

const {colorMap, coursesBarGraph, statePopulations, cityPopulations} = plottingScripts;

describe('test-plotting', () => {
    it('Should render plot with no source data', () => {
        cy.clickNavBarButton('Plotting Script');
        cy.get('#plot-0').children().should('have.length', 0);
        cy.get('.bi-file-bar-graph').click({force: true});
        cy.get('#python-script-0').clear().type(colorMap, {parseSpecialCharSequences: false});
        cy.contains('button', 'Save Changes').click({force: true});
        cy.get('#plot-0').children().should('have.length', 1);
        cy.get('body').children().should('have.length', 2);
    });

    it('Should render plot even if source data is not used to create plot', () => {
        cy.clickNavBarButton('Plotting Script');
        cy.get('#plot-0').children().should('have.length', 0);
        cy.get('.bi-file-bar-graph').click({force: true});
        cy.get('#python-script-0').clear().type(coursesBarGraph, {parseSpecialCharSequences: false});
        cy.contains('button', 'Save Changes').click({force: true});
        cy.get('#plot-0').children().should('have.length', 1);
        cy.get('body').children().should('have.length', 2);
    });

    it('Should render plot using source data', () => {
        cy.clickNavBarButton('Upload');
        cy.clickNavBarButton('Plotting Script');
        cy.connectDataComponents(0, 1, {force: true});
        cy.uploadFile('city-populations.xlsx', 'Upload-0');
        cy.get('.bi-file-bar-graph').click({force: true});
        cy.get('#python-script-1').clear().type(statePopulations, {parseSpecialCharSequences: false});
        cy.contains('button', 'Save Changes').click({force: true});
        cy.get('#plot-1').children().should('have.length', 1);
        cy.get('body').children().should('have.length', 2);
    });

    it.only('Should render plot when source data changes', () => {
        cy.clickNavBarButton('Upload');
        cy.clickNavBarButton('Plotting Script');
        cy.connectDataComponents(0, 1, {force: true});
        cy.uploadFile('city-populations.xlsx', 'Upload-0');
        cy.get('.bi-file-bar-graph').click({force: true});
        cy.get('#python-script-1').clear().type(statePopulations, {parseSpecialCharSequences: false});
        cy.contains('button', 'Save Changes').click({force: true});
        cy.get('#plot-1').children().should('have.length', 1);
        cy.get('body').children().should('have.length', 2);
        cy.get('.bi-file-bar-graph').click({force: true});
        cy.get('#python-script-1').clear().type(cityPopulations, {parseSpecialCharSequences: false});
        cy.contains('button', 'Save Changes').click({force: true});
        cy.get('#plot-1').children().should('have.length', 1);
        cy.get('body').children().should('have.length', 2);
    });

    it('Should render multiple plots', () => {
        cy.clickNavBarButton('Plotting Script');
        cy.get('#plot-0').children().should('have.length', 0);
        cy.get('.bi-file-bar-graph').click({force: true});
        cy.get('#python-script-0').clear().type(`${colorMap}\n\n${coursesBarGraph}`, {parseSpecialCharSequences: false});
        cy.contains('button', 'Save Changes').click({force: true});
        cy.get('#plot-0').children().should('have.length', 2);
        cy.get('body').children().should('have.length', 2);
    });

    it('Should not render plot when there is an error in the script', () => {
        cy.clickNavBarButton('Plotting Script');
        cy.get('#plot-0').children().should('have.length', 0);
        cy.get('.bi-file-bar-graph').click({force: true});
        cy.get('#python-script-0').clear().type(`a`, {parseSpecialCharSequences: false});
        cy.contains('button', 'Save Changes').click({force: true});

        cy.get('.bi-file-bar-graph.text-danger').should('exist');
        cy.contains('button', 'See Python Error').click({force: true});
        cy.contains(/^PythonError:.*/).should('exist');
        cy.contains('button', 'Close').click({force: true});

        cy.get('#plot-0').children().should('have.length', 0);
        cy.get('body').children().should('have.length', 2);
    });

    // it('Should not render a plot when trying to plot using the Script component', () => {

    // });

    it('Should render plot when state is uploaded from memory', () => {
        cy.uploadFile('test-download-plotting-state.json', 'pipeline-upload');
        cy.get('#plot-3').children().should('have.length', 1);
        cy.get('body').children().should('have.length', 2);
    });

    it('Should not render plot when source data is removed', () => {
        cy.uploadFile('test-download-plotting-state.json', 'pipeline-upload');
        cy.get('#plot-3').children().should('have.length', 1);
        cy.get('#del-2-btm_3-top').trigger('mouseover', {force: true}).click();
        cy.get('#plot-3').children().should('have.length', 0);
        cy.get('body').children().should('have.length', 2);
    });
});
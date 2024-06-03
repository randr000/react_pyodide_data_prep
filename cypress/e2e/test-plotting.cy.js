import { plottingScripts } from "./cy-constants";

const {colorMap, coursesBarGraph, statePopulations, cityPopulations} = plottingScripts;

describe('test-plotting', () => {
    it('Should render plot with no source data', () => {
        cy.clickNavBarButton('Plotting Script');
        cy.get('#plot-0').children().should('have.length', 0);
        cy.get('.bi-file-bar-graph').click({force: true});
        cy.get('.monaco-editor textarea').click({force: true}).type('{ctrl}a', {force: true}).type(colorMap, {parseSpecialCharSequences: false, force: true});
        cy.contains('button', 'Save Changes').click({force: true});
        cy.get('#plot-0').children().should('have.length', 1);
        cy.get('body').children().should('have.length', 4);
    });

    it('Should render plot even if source data is not used to create plot', () => {
        cy.clickNavBarButton('Plotting Script');
        cy.get('#plot-0').children().should('have.length', 0);
        cy.get('.bi-file-bar-graph').click({force: true});
        cy.get('.monaco-editor textarea').click({force: true}).type('{ctrl}a', {force: true}).type(coursesBarGraph, {parseSpecialCharSequences: false, force: true});
        cy.contains('button', 'Save Changes').click({force: true});
        cy.get('#plot-0').children().should('have.length', 1);
        cy.get('body').children().should('have.length', 4);
    });

    it('Should render plot using source data', () => {
        cy.clickNavBarButton('Upload');
        cy.clickNavBarButton('Plotting Script');
        cy.connectDataComponents(0, 1, {force: true});
        cy.uploadFile('city-populations.xlsx', 'Upload-0');
        cy.get('.bi-file-bar-graph').click({force: true});
        cy.get('.monaco-editor textarea').click({force: true}).type('{ctrl}a', {force: true}).type(statePopulations, {parseSpecialCharSequences: false, force: true});
        cy.contains('button', 'Save Changes').click({force: true});
        cy.get('#plot-1').children().should('have.length', 1);
        cy.get('body').children().should('have.length', 4);
    });

    it('Should render plot when source data changes', () => {
        cy.clickNavBarButton('Upload');
        cy.clickNavBarButton('Plotting Script');
        cy.connectDataComponents(0, 1, {force: true});
        cy.uploadFile('city-populations.xlsx', 'Upload-0');
        cy.get('.bi-file-bar-graph').click({force: true});
        cy.get('.monaco-editor textarea').click({force: true}).type('{ctrl}a', {force: true}).type(statePopulations, {parseSpecialCharSequences: false, force: true});
        cy.contains('button', 'Save Changes').click({force: true});
        cy.get('#plot-1').children().should('have.length', 1);
        cy.get('body').children().should('have.length', 4);
        cy.get('.bi-file-bar-graph').click({force: true});
        cy.get('.monaco-editor textarea').click({force: true}).type('{ctrl}a', {force: true}).type(cityPopulations, {parseSpecialCharSequences: false, force: true});
        cy.contains('button', 'Save Changes').click({force: true});
        cy.get('#plot-1').children().should('have.length', 1);
        cy.get('body').children().should('have.length', 4);
    });

    it('Should render multiple plots', () => {
        cy.clickNavBarButton('Plotting Script');
        cy.get('#plot-0').children().should('have.length', 0);
        cy.get('.bi-file-bar-graph').click({force: true});
        cy.get('.monaco-editor textarea').click({force: true}).type('{ctrl}a', {force: true}).type(`${colorMap}\n\n${coursesBarGraph}`, {parseSpecialCharSequences: false, force: true});
        cy.contains('button', 'Save Changes').click({force: true});
        cy.get('#plot-0').children().should('have.length', 2);
        cy.get('body').children().should('have.length', 4);
    });

    it('Should not render plot when there is an error in the script', () => {
        cy.clickNavBarButton('Plotting Script');
        cy.get('#plot-0').children().should('have.length', 0);
        cy.get('.bi-file-bar-graph').click({force: true});
        cy.get('.monaco-editor textarea').click({force: true}).type('{ctrl}a', {force: true}).type('a', {force: true});
        cy.contains('button', 'Save Changes').click({force: true});

        cy.get('.bi-file-bar-graph.text-danger').should('exist');
        cy.contains('button', 'See Python Error').click({force: true});
        cy.contains(/^PythonError:.*/).should('exist');
        cy.contains('button', 'Close').click({force: true});

        cy.get('#plot-0').children().should('have.length', 0);
        cy.get('body').children().should('have.length', 4);
    });

    it('Should not render a plot when trying to plot using the Script component', () => {
        cy.clickNavBarButton('Upload');
        cy.clickNavBarButton('Script');
        cy.connectDataComponents(0, 1, {force: true});
        cy.uploadFile('city-populations.xlsx', 'Upload-0');
        cy.get('.bi-filetype-py').click({force: true});
        cy.get('.monaco-editor textarea').click({force: true}).type('{ctrl}a', {force: true}).type('import matplotlib', {force: true});
        cy.contains('button', 'Save Changes').click({force: true});
        cy.get('.bi-filetype-py.text-danger').should('exist');
        cy.contains('button', 'See Python Error').click({force: true});
        cy.contains('button', 'Close').click({force: true});
    });

    it('Should render plot when state is uploaded from memory', () => {
        cy.uploadFile('test-download-plotting-state.json', 'pipeline-upload');
        cy.get('#plot-3').children().should('have.length', 1);
        cy.get('body').children().should('have.length', 4);
    });

    it('Should not render plot when source data is removed', () => {
        cy.uploadFile('test-download-plotting-state.json', 'pipeline-upload');
        cy.get('#plot-3').children().should('have.length', 1);
        cy.get('#del-2-btm_3-top').trigger('mouseover', {force: true}).click();
        cy.get('#plot-3').children().should('have.length', 0);
        cy.get('body').children().should('have.length', 4);
    });
});
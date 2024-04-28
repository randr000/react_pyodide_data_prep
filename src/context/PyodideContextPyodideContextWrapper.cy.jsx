import React from 'react';
import { PyodideContextWrapper } from './PyodideContext';
import * as Pyodide from 'pyodide/pyodide.js';

describe('<PyodideContextWrapper />', () => {

  beforeEach(() => {
    cy.stub(Pyodide, 'loadPyodide', () => ({
      loadPackage: e => e,
      runPythonAsync: e => e
    }));
  });

  it('renders Pyodide loading message and spinner when Pyodide is not loaded', () => {

    cy.stub(React, 'useState', () => [false, () => {}]);
    cy.mount(<PyodideContextWrapper toLoadPyodide={false} />);
    cy.contains('Pyodide is Loading').should('exist');
    cy.get('[data-testid=pyodide-loading-spinner]').should('exist');

  });

  it('does not render Pyodide loading message and spinner when Pyodide is loaded', () => {

    cy.mount(<PyodideContextWrapper />);
    cy.contains('Pyodide is Loading').should('not.exist');
    cy.get('[data-testid=pyodide-loading-spinner]').should('not.exist');

  });
});
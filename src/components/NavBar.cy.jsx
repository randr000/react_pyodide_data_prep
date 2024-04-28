import React from 'react'
import NavBar from './NavBar'
import AppDataContext from '../context/AppDataContext'
import CONSTANTS from '../js/app-constants';

describe('<NavBar />', () => {

  const NavBarTest = () => {(
    <AppDataContext.Provider value={{appState: {}, dispatch: () => {}}}>
      <NavBar/>
    </AppDataContext.Provider>
  )};

  it('renders with all the necessary elements', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <AppDataContext.Provider value={{appState: {}, dispatch: () => {}}}>
        <NavBar/>
      </AppDataContext.Provider>
    );

    const elements = [
      CONSTANTS.APP_TITLE,
      'Upload',
      'Download',
      'Filter Columns',
      'Filter Rows',
      'Join',
      'Union'
    ];

    elements.forEach(name => cy.contains(name).should('exist'));

  });
});
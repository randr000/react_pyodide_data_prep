import React from 'react'
import NavBar from './NavBar'
import AppDataContext from '../context/AppDataContext'

describe('<NavBar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <AppDataContext.Provider value={{appState: {}, dispatch: () => {}}}>
        <NavBar/>
      </AppDataContext.Provider>
    );
  });
});
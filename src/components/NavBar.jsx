import React, {useContext} from 'react';
import NavBarComponentButton from './NavBarComponentButton';
import AppDataContext from '../context/AppDataContext';
import APP_ACTION_TYPES from '../action-types/appActionTypes';

const NavBar = () => {

    const {appState, dispatch} = useContext(AppDataContext);

    return (
        <>
            <nav className="navbar bg-light">
                <div className="container-fluid">
                    <h1 className="navbar-brand">Pyodide React App</h1>
                </div>
            </nav>
            <nav className="navbar bg-light d-flex justify-content-start">
                <NavBarComponentButton btnText="Import CSV" />
                <NavBarComponentButton btnText="Export CSV" />
                <NavBarComponentButton btnText="Filter Columns" />
                <NavBarComponentButton btnText="Filter Rows" />
                <NavBarComponentButton btnText="Join" />
                <NavBarComponentButton btnText="Union" />
            </nav>
        </>
    );
};

export default NavBar;
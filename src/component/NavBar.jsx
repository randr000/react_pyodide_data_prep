import React from 'react';
import NavBarComponentButton from './NavBarComponentButton';

const NavBar = () => {

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
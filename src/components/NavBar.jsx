import React, {useContext} from 'react';
import NavBarComponentButton from './NavBarComponentButton';
import AppDataContext from '../context/AppDataContext';
import APP_ACTION_TYPES from '../action-types/appActionTypes';
import DATA_COMPONENT_TYPES from '../js/dataComponentTypes';

const NavBar = () => {

    const {appState, dispatch} = useContext(AppDataContext);
    const {components} = appState;

    function handleAddFileUpload() {
        dispatch({
            type: APP_ACTION_TYPES.ADD_FILE_UPLOAD,
            payload: {type: DATA_COMPONENT_TYPES.FILE_UPLOAD, compID: `${components.length}`}
        });
    }

    return (
        <>
            <nav className="navbar bg-light">
                <div className="container-fluid">
                    <h1 className="navbar-brand">Pyodide React App</h1>
                </div>
            </nav>
            <nav className="navbar bg-light d-flex justify-content-start">
                <NavBarComponentButton btnText="Import CSV" onClick={handleAddFileUpload}/>
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
import React, {useContext} from 'react';
import NavBarComponentButton from './NavBarComponentButton';
import AppDataContext from '../context/AppDataContext';
import APP_ACTION_TYPES from '../action-types/appActionTypes';
import DATA_COMPONENT_TYPES from '../js/dataComponentTypes';
import CONSTANTS from '../js/app-constants';

const NavBar = () => {

    const {appState, dispatch} = useContext(AppDataContext);
    const {nextID} = appState;

    function handleOnClick(compType, hasSourceComps=true) {
        const payload = {type: compType, compID: nextID, outputComponents: new Set([])};

        dispatch({
            type: APP_ACTION_TYPES.ADD_DATA_COMPONENT,
            payload: hasSourceComps ? {...payload, sourceComponents: new Set([])}: payload
        });
    }

    return (
        <>
            <nav className="navbar bg-light">
                <div className="container-fluid">
                    <h1 className="navbar-brand">{CONSTANTS.APP_TITLE}</h1>
                </div>
            </nav>
            <nav className="navbar bg-light d-flex justify-content-start">
                <NavBarComponentButton btnText="Upload" onClick={() => handleOnClick(DATA_COMPONENT_TYPES.FILE_UPLOAD, false)}/>
                <NavBarComponentButton btnText="Download" onClick={() => handleOnClick(DATA_COMPONENT_TYPES.FILE_DOWNLOAD)}/>
                <NavBarComponentButton btnText="Filter Columns" onClick={() => handleOnClick(DATA_COMPONENT_TYPES.FILTER_COLS)}/>
                <NavBarComponentButton btnText="Filter Rows" />
                <NavBarComponentButton btnText="Join" />
                <NavBarComponentButton btnText="Union" onClick={() => handleOnClick(DATA_COMPONENT_TYPES.UNION)}/>
            </nav>
        </>
    );
};

export default NavBar;
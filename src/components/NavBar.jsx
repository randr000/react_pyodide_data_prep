import React, {useContext} from 'react';
import NavBarComponentButton from './NavBarComponentButton';
import PipelineUpload from './PipelineUpload';
import AppDataContext from '../context/AppDataContext';
import APP_ACTION_TYPES from '../action-types/appActionTypes';
import DATA_COMPONENT_TYPES from '../js/dataComponentTypes';
import CONSTANTS from '../js/app-constants';
import { Button } from 'react-bootstrap';
import { createLocalState, createObjectURL } from '../js/functions';

const NavBar = () => {

    const {appState, dispatch} = useContext(AppDataContext);
    const {nextID} = appState;

    function handleOnClick(compType, hasSourceComps=true) {
        const payload = {
            type: compType,
            compID: nextID,
            localState: createLocalState(compType),
            outputComponents: new Set([]),
            coordinates: {x: 0, y: 0}
        };

        dispatch({
            type: APP_ACTION_TYPES.ADD_DATA_COMPONENT,
            payload: hasSourceComps ? {...payload, sourceComponents: new Set([])}: payload
        });
    }

    function handleOnClickRemoveAll() {
        dispatch({type: APP_ACTION_TYPES.REMOVE_ALL});
    }

    function handleOnClickDownloadState() {
        const downloadState = JSON.stringify({
            isDragging: appState.isDragging,
            isDraggingDisabled: appState.isDraggingDisabled,
            nextID: appState.nextID,
            components: [...appState.components].map(comp => {
                let compData = comp[1];
                if (compData.hasOwnProperty('outputComponents')) compData = {...compData, outputComponents: [...compData.outputComponents]};
                if (compData.hasOwnProperty('sourceComponents')) compData = {...compData, sourceComponents: [...compData.sourceComponents]};
                return [comp[0], compData];
            }),
            arrows: [...appState.arrows].map(arrow => [arrow[0], {...arrow[1], compIDs: [...arrow[1].compIDs]}])
        }, null, 4);
        
        const blob = new Blob([downloadState], {type: 'application/json'});

        (async () => {
            if (window.showSaveFilePicker) {
                const handle = await window.showSaveFilePicker({suggestedName: 'state.json'});
                const writable = await handle.createWritable();
                await writable.write(blob);
                await writable.close();

            } else {
                const a = document.createElement('a');
                a.href = createObjectURL(blob);
                a.setAttribute('download', 'state.json');
                a.click();
                a.remove();
            }
        })();
        return;
    }

    return (
        <div className="fixed-top">
            <nav className="navbar bg-light">
                <div className="container-fluid">
                    <h1 className="navbar-brand">{CONSTANTS.APP_TITLE}</h1>
                </div>
            </nav>
            <nav className="navbar bg-light d-flex justify-content-between">
                <div className="d-flex justify-content-start">
                    <NavBarComponentButton btnText="Upload" onClick={() => handleOnClick(DATA_COMPONENT_TYPES.FILE_UPLOAD, false)}/>
                    <NavBarComponentButton btnText="Download" onClick={() => handleOnClick(DATA_COMPONENT_TYPES.FILE_DOWNLOAD)}/>
                    <NavBarComponentButton btnText="Filter Columns" onClick={() => handleOnClick(DATA_COMPONENT_TYPES.FILTER_COLS)}/>
                    <NavBarComponentButton btnText="Filter Rows" onClick={() => handleOnClick(DATA_COMPONENT_TYPES.FILTER_ROWS)}/>
                    <NavBarComponentButton btnText="Join" onClick={() => handleOnClick(DATA_COMPONENT_TYPES.JOIN)}/>
                    <NavBarComponentButton btnText="Union" onClick={() => handleOnClick(DATA_COMPONENT_TYPES.UNION)}/>
                    <NavBarComponentButton btnText="Script" onClick={() => handleOnClick(DATA_COMPONENT_TYPES.SCRIPT)}/>
                </div>
                <PipelineUpload/>
                <div className="d-flex justify-content-end">
                    <Button variant="info" className="mx-1" onClick={handleOnClickDownloadState}>Download State</Button>
                    <Button variant="danger" className="mx-1" onClick={handleOnClickRemoveAll}>Remove All</Button>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
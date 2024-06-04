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
    const {nextID, hideAllTables} = appState;
    const pipelineUploadFormId = 'pipeline-upload-form';

    function handleOnClick(compType, hasSourceComps=true) {
        const payload = {
            type: compType,
            compID: nextID,
            showTable: hideAllTables ? false : true,
            coordinates: {x: 0, y: 0},
            localState: createLocalState(compType),
        };

        dispatch({
            type: APP_ACTION_TYPES.ADD_DATA_COMPONENT,
            payload: hasSourceComps ? {...payload, sourceComponents: new Set([]), outputComponents: new Set([])} : {...payload, outputComponents: new Set([])}
        });
    }

    function handleOnClickShowAllTables() {
        dispatch({type: APP_ACTION_TYPES.SHOW_ALL_TABLES});
    }

    function handleOnClickHideAllTables() {
        dispatch({type: APP_ACTION_TYPES.HIDE_ALL_TABLES});
    }

    function handleOnClickDownloadState() {
        const downloadState = JSON.stringify({
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

    function handleOnClickRemoveAll() {
        dispatch({type: APP_ACTION_TYPES.REMOVE_ALL});
        document.getElementById(pipelineUploadFormId).reset();
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
                    <NavBarComponentButton btnText="Plotting Script" onClick={() => handleOnClick(DATA_COMPONENT_TYPES.SCRIPT_PLOT)}/>
                    <NavBarComponentButton btnText="Linear Regression" onClick={() => handleOnClick(DATA_COMPONENT_TYPES.LINEAR_REGRESSION)}/>
                </div>
                <PipelineUpload pipelineUploadFormId={pipelineUploadFormId} />
                <div className="d-flex justify-content-end">
                    <Button variant="success" className="mx-1" onClick={handleOnClickShowAllTables}>Show All Tables</Button>
                    <Button variant="danger" className="mx-1" onClick={handleOnClickHideAllTables}>Hide All Tables</Button>
                    <Button variant="info" className="mx-1" onClick={handleOnClickDownloadState}>Download State</Button>
                    <Button variant="danger" className="mx-1" onClick={handleOnClickRemoveAll}>Remove All</Button>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
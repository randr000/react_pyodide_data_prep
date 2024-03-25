import React, { useState, useContext, useEffect } from 'react';
import Draggable from 'react-draggable';
import DataFlowPill from '../utilities/DataFlowPill';
import ToggleTablePill from '../utilities/ToggleTablePill';
import CardSummary from '../utilities/CardSummary';
import FileUploadDropZone from '../utilities/FileUploadDropZone';
import Table from '../utilities/Table';
import DeleteDataComponentPill from '../utilities/DeleteDataComponentPill';
import AppDataContext from '../../context/AppDataContext';

import { createObjectURL } from '../../js/functions';

import { PyodideContext } from '../../context/PyodideContext';


import { useXarrow } from 'react-xarrows';

import create_df_from_csv from '../../python_code_js_modules/create_df_from_csv';
import APP_ACTION_TYPES from '../../action-types/appActionTypes';

const FileUpload = ({compID, cardTitle, fileExtension, iconClassNames, setUploadedFile}) => {

    const [file, setFile] = useState(null);
    const [disableDrag, setDisableDrag] = useState(false);
    const {pyodide, isPyodideLoaded} = useContext(PyodideContext);
    const [result, setResult] = useState(null);
    const [showTable, setShowTable] = useState(true);
    const {appState, dispatch} = useContext(AppDataContext);
    const {connectComponents, components} = appState;
    // const data = components[compID].data ? components[compID].data : null;


    const updateXarrow = useXarrow();

    // If file is uploaded successfully and Pyodide is loaded, then data from file
    // is converted to json and stored in 'result' state variable.
    useEffect(() => {

        async function readFileToDF(path) {

            if (isPyodideLoaded) {
                pyodide.runPython(create_df_from_csv);
                setResult(pyodide.globals.get('create_df_from_csv')(path, ','));
            }
        }

        if (file) {
            const url = createObjectURL(file);
            readFileToDF(url);
        } else setResult(null);

    }, [file]);


    // useEffect(() => {

    //     if (result) setUploadedFile(result);
    //     console.log(`result: ${result}`);

    // }, [result]);

    useEffect(() => {

        if (result) {
            const c = [...components];
            const idx = c.findIndex(comp => comp.compID === compID);
            c[idx] = {...c[idx], data: result};
            dispatch({
                type: APP_ACTION_TYPES.MODIFY_COMPONENT_DATA,
                payload: c
            });
        };
        // console.log(`result: ${result}`);

    }, [result]);

    useEffect(() => {
        updateXarrow();
    }, [showTable]);

    return (

        <div className="d-flex" style={{position: "absolute"}}>
            <Draggable bounds="" onDrag={updateXarrow} onStop={updateXarrow} disabled={disableDrag}>
                <div className="d-flex align-items-start">
                    <div className="card border border-primary border-3" style={{width: "12rem"}}>
                        <div className="card-body text-center">

                            <DeleteDataComponentPill compID={compID} setDisableDrag={setDisableDrag} />
                            
                            <ToggleTablePill showTable={showTable} toggleTable={setShowTable} />
                            <CardSummary cardTitle={cardTitle} iconClassNames={iconClassNames} />
            
                            <FileUploadDropZone file={file} setFile={setFile} ext={fileExtension} />
                            <DataFlowPill isOnTop={false} id={`${compID}-btm`} />
                        </div>
                    </div>
                    {result && <Table tableData={result} show={showTable} />}
                </div>
            </Draggable>
        </div>
    );
};

export default FileUpload;
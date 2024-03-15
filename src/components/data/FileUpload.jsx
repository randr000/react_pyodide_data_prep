import React, { useState, useContext, useEffect } from 'react';
import Draggable from 'react-draggable';
import DataFlowPill from '../utilities/DataFlowPill';
import ToggleTablePill from '../utilities/ToggleTablePill';
import CardSummary from '../utilities/CardSummary';
import FileUploadDropZone from '../utilities/FileUploadDropZone';
import Table from '../utilities/Table';

import { createObjectURL } from '../../js/functions';

import { PyodideContext } from '../../context/PyodideContext';


import { useXarrow } from 'react-xarrows';

import create_df_from_csv from '../../python_code_js_modules/create_df_from_csv';

const FileUpload = ({cardTitle, fileExtension, iconClassNames, setUploadedFile}) => {

    const [file, setFile] = useState(null);
    const {pyodide, isPyodideLoaded} = useContext(PyodideContext);
    const [result, setResult] = useState(null);
    const [showTable, setShowTable] = useState(true);
    const updateXarrow = useXarrow();

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

    useEffect(() => {

        if (result) setUploadedFile(result);
        console.log(`result: ${result}`);

    }, [result]);

    useEffect(() => {
        updateXarrow();
    }, [showTable]);

    return (

        <div className="d-flex">
            <Draggable bounds="" onDrag={updateXarrow} onStop={updateXarrow}>
                <div className="d-flex align-items-start">
                    <div className="card border border-primary border-3" style={{width: "12rem"}}>
                        <div className="card-body text-center">
            
                            <DataFlowPill isOnTop={true} />
                            <ToggleTablePill showTable={showTable} toggleTable={setShowTable} />
                            <CardSummary cardTitle={cardTitle} iconClassNames={iconClassNames} />
            
                            <FileUploadDropZone file={file} setFile={setFile} ext={fileExtension} />
                            <DataFlowPill isOnTop={false} id="fileupload" />
                        </div>
                    </div>
                    {result && <Table tableData={result} show={showTable} />}
                </div>
            </Draggable>
        </div>
    );
};

export default FileUpload;
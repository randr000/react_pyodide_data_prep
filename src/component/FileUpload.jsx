import React, { useState, useContext, useEffect } from 'react';
import Draggable from 'react-draggable';
import DataFlowPill from './DataFlowPill';
import CardSummary from './CardSummary';
import FileUploadDropZone from './FileUploadDropZone';
import { createObjectURL } from '../js/functions';

import { PyodideContext } from '../context/PyodideContext';
import Table from './Table';

import create_df_from_csv from '../python_code_js_modules/create_df_from_csv';

const FileUpload = ({cardTitle, fileExtension, iconClassNames}) => {

    const [file, setFile] = useState(null);
    const {pyodide, isPyodideLoaded} = useContext(PyodideContext);
    const [result, setResult] = useState(null);

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
        }
        else setResult(null);

    }, [file]);

    return (

        <Draggable bounds="parent">
            <div>
                <div className="card border border-primary border-3" style={{width: "12rem"}}>
                    <div className="card-body text-center">
                
                        <DataFlowPill isOnTop={true} />
                        <CardSummary cardTitle={cardTitle} iconClassNames={iconClassNames} />
                
                        <FileUploadDropZone file={file} setFile={setFile} ext={fileExtension} />
                        <DataFlowPill isOnTop={false} />
                    </div>
                </div>
                {result && <Table tableData={result}/>}
            </div>
        </Draggable>
    );
};

export default FileUpload;
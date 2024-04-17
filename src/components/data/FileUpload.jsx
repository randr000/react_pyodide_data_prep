import React, { useState, useContext, useEffect } from 'react';
import DataComponentWrapper from '../utilities/DataComponentWrapper';
import AppDataContext from '../../context/AppDataContext';
import APP_ACTION_TYPES from '../../action-types/appActionTypes';

// import other utility component(s)
import FileUploadDropZone from '../utilities/FileUploadDropZone';

// import Pyodide context
import { PyodideContext } from '../../context/PyodideContext';

// import Python function(s)
import create_df_from_csv from '../../python_code_js_modules/create_df_from_csv';

// import other function(s)
import { createObjectURL } from '../../js/functions';


const FileUpload = ({compID, cardTitle, fileExtension}) => {

    const {pyodide, isPyodideLoaded} = useContext(PyodideContext);
    const {appState, dispatch} = useContext(AppDataContext);
    const {connectComponents, components} = appState;

    // A JSON formatted string that can be used to create a pandas dataframe
    const [outputData, setOutputData] = useState(null);

    // A reference to the uploaded file
    const [file, setFile] = useState(null);

    /* If file is uploaded successfully and Pyodide is loaded, then data from file
       is converted to json and stored in 'outputData' state variable. */
    useEffect(() => {

        /**
         * Converts the data from the uploaded file into a JSON object and sets the outputData state
         * 
         * @param {string} path A path to the location where the uploaded file was stored by the browser
         */
        async function readFileToDF(path) {

            if (isPyodideLoaded) {
                // Load python function
                pyodide.runPython(create_df_from_csv);
                // Call python function and sets new outputData state
                setOutputData(pyodide.globals.get('create_df_from_csv')(path, ','));
            }
        }

        if (file) {
            const url = createObjectURL(file);
            readFileToDF(url);
        } else setOutputData(null);

    }, [file]);


    useEffect(() => {

        if (outputData) {
            const c = [...components];
            // Find the current index of this component
            const idx = c.findIndex(comp => comp.compID === compID);
            // Updates this component's data property with the outputData JSON string
            c[idx] = {...c[idx], data: outputData};
            // Updates the app state with the modified outputData
            dispatch({
                type: APP_ACTION_TYPES.MODIFY_COMPONENT_DATA,
                payload: c
            });
        };
    }, [outputData]);

    return (
        
        <DataComponentWrapper 
            compID={compID}
            cardTitle={cardTitle}
            iconClassNames={false}
            canHaveSources={false}
            outputData={outputData}
        >
            <FileUploadDropZone file={file} setFile={setFile} ext={fileExtension} />
        </DataComponentWrapper>

    );
};

export default FileUpload;
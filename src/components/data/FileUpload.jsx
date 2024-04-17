import React, { useState, useContext, useEffect } from 'react';
import DataComponentWrapper from '../utilities/DataComponentWrapper';
import AppDataContext from '../../context/AppDataContext';
import APP_ACTION_TYPES from '../../action-types/appActionTypes';
import { utils, read, readFile } from 'xlsx';

// import other utility component(s)
import FileUploadDropZone from '../utilities/FileUploadDropZone';

// import Pyodide context
import { PyodideContext } from '../../context/PyodideContext';

// import Python function(s)
import input_to_df from '../../python_code_js_modules/input_to_df';

// import other function(s)
import { createObjectURL } from '../../js/functions';


const FileUpload = ({compID, cardTitle, iconClassNames, fileExtension}) => {

    const {pyodide, isPyodideLoaded} = useContext(PyodideContext);
    const {appState, dispatch} = useContext(AppDataContext);
    const {connectComponents, components} = appState;

    // In order to adjust upload zone styles depending on file state
    const [uploadStyles, setUploadStyles] = useState({
        borderWidth: "3px",
        borderStyle: "dashed",
        borderColor: "#6c757d"
    });

    // A JSON formatted string that can be used to create a pandas dataframe
    const [outputData, setOutputData] = useState(null);

    // A reference to the uploaded file
    const [file, setFile] = useState(null);

    // True if uploaded file is not a valid file or there is an error processing it
    const [isInvalidFile, setIsInvalidFile] = useState(false);

    // Message to be displayed if there is an error uploading or processing the file
    const [invalidFileMsg, setInvalidFileMsg] = useState('');

    /**
     * 
     * Function to update states for isInvalidFile and invalidFileMsg
     * 
     * @param {Boolean} bool - true if it is invalid file or error, false if otherwise
     * @param {String} msg - The message to display to the user if there was an error uploading or processing the file
     */
    function updateInvalidFileState(bool=false, msg='') {
        setIsInvalidFile(bool);
        setInvalidFileMsg(msg);
    }

    // Error messages for different filetypes to be displayed to the user
    const csvErrorMsg = 'An error occured reading the CSV file. Please make sure it is in the appropriate format.';
    const txtErrorMsg = csvErrorMsg.replace('CSV', 'TXT');
    const jsonErrorMsg = 'An error occured reading the JSON file. Please make sure it is in the appropriate format.';
    const excelErrorMsg = 'An error occured reading the Excel file. Please make sure it is in the appropriate format.';

    /* If file is uploaded successfully and Pyodide is loaded, then data from file
       is converted to json and stored in 'outputData' state variable. */
    useEffect(() => {

        /**
         * Converts the data from the uploaded file into a JSON object and sets the outputData state
         * 
         * @param {string} pathOrJSONString A path to the location where the uploaded file was stored by the browser or json string with data
         */
        async function readFileToDF(pathOrJSONString, fileType) {

            if (isPyodideLoaded) {
                // Load python function
                pyodide.runPython(input_to_df);
                // Call python function and sets new outputData state
                setOutputData(pyodide.globals.get('input_to_df')(pathOrJSONString, fileType));
            }
        }

        if (file) {

            if (file.name.toLowerCase().endsWith('.csv') || file.name.toLowerCase().endsWith('.txt')) {
                try {
                    const url = createObjectURL(file);
                    readFileToDF(url, 'csv');
                } catch (e) {
                    updateInvalidFileState(true, file.name.toLowerCase().endsWith('csv') ? csvErrorMsg : txtErrorMsg);
                    setUploadStyles(styles => ({...styles, borderColor: "#dc3545", borderStyle: "solid"}));
                    console.log(e);
                }
            
            } else if (file.name.toLowerCase().endsWith('.json')) {
                try {
                    const fr = new FileReader();
                    fr.onload = () => {
                        const jsonDataObj = JSON.parse(fr.result);
                        const orient = 
                            Array.isArray(jsonDataObj) 
                            ? 'records'
                            : jsonDataObj.hasOwnProperty('columns') && jsonDataObj.hasOwnProperty('index') && jsonDataObj.hasOwnProperty('data')
                            ? 'split'
                            : null;

                        if (orient == 'records') {
                            const json_str = JSON.stringify({data: jsonDataObj});
                            readFileToDF(json_str, 'json');

                        } else if (orient == 'split') {
                            setOutputData(JSON.stringify(jsonDataObj));

                        } else throw new Error(jsonErrorMsg);
                        
                    }
                    fr.readAsText(file);
                } catch (e) {
                    updateInvalidFileState(true, jsonErrorMsg);
                    setUploadStyles(styles => ({...styles, borderColor: "#dc3545", borderStyle: "solid"}));
                    console.log(e);
                }
            } else if (file.name.toLowerCase().endsWith('.xlsx')) {
                try {
                    (async () => {
                        const data = await file.arrayBuffer();
                        const wb = read(data);
                        const ws = wb.Sheets[wb.SheetNames[0]];
                        const json_str = JSON.stringify({data: utils.sheet_to_json(ws)});
                        readFileToDF(json_str, 'json');
                    })();

                } catch (e) {
                    updateInvalidFileState(true, excelErrorMsg);
                    setUploadStyles(styles => ({...styles, borderColor: "#dc3545", borderStyle: "solid"}));
                    console.log(e);
                }
            }

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
            iconClassNames={iconClassNames}
            canHaveSources={false}
            outputData={outputData}
        >
            <FileUploadDropZone
                file={file}
                setFile={setFile}
                ext={fileExtension}
                updateInvalidFileState={updateInvalidFileState}
                isInvalidFile={isInvalidFile}
                invalidFileMsg={invalidFileMsg}
                uploadStyles={uploadStyles}
                setUploadStyles={setUploadStyles}
            />
        </DataComponentWrapper>

    );
};

export default FileUpload;
import React, { useState } from 'react';
import DataComponentWrapper from '../utilities/DataComponentWrapper';
import { utils, read } from 'xlsx';

// import other utility component(s)
import FileUploadDropZone from '../utilities/FileUploadDropZone';

// import Python function(s)
import input_to_df from '../../python_code_js_modules/input_to_df';

// import other function(s)
import { createObjectURL } from '../../js/functions';

// import error messages
import ERROR_MSG from '../../js/error_messages';

const FileUpload = ({compID, cardTitle, iconClassNames}) => {

    // In order to adjust upload zone styles depending on file state
    const [uploadStyles, setUploadStyles] = useState({
        borderWidth: "3px",
        borderStyle: "dashed",
        borderColor: "#6c757d"
    });

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
    const csvErrorMsg = ERROR_MSG.csvErrorMsg;
    const txtErrorMsg = ERROR_MSG.txtErrorMsg;
    const jsonErrorMsg = ERROR_MSG.jsonErrorMsg;
    const excelErrorMsg = ERROR_MSG.excelErrorMsg;

    /**
     * 
     * Defines the actions to take when source data changes in order to update target state
     * Pass as prop to DataComponentWrapper if necessary
     * If not passed to DataComponentWrapper, the default is to just update target data with source data
     * 
     * @param {string} sourceData - A JSON formatted string, file object, etc. Any change to this variable will trigger
     *                              this function to run when this function is passed as a prop to DataComponentWrapper.
     * @param {Function} updateTargetState - A function to be called in order to update target state. Most likely a
     *                                       setState function.
     */
    function updateTargetData(sourceData, updateTargetState, pyodide, isPyodideLoaded) {

        /**
         * Converts the data from the uploaded file into a JSON object and sets the targetDataJSONStr state
         * 
         * @param {string} pathOrJSONString A path to the location where the uploaded file was stored by the browser or json string with data
         */
        async function readFileToDF(pathOrJSONString, fileType) {

            if (isPyodideLoaded) {
                // Load python function
                pyodide.runPython(input_to_df);
                // Call python function and sets new targetDataJSONStr state
                updateTargetState(pyodide.globals.get('input_to_df')(pathOrJSONString, fileType));
            }
        }

        if (sourceData) {

            if (sourceData.name.toLowerCase().endsWith('.csv') || sourceData.name.toLowerCase().endsWith('.txt')) {
                try {
                    const url = createObjectURL(sourceData);
                    readFileToDF(url, 'csv');
                } catch (e) {
                    updateInvalidFileState(true, sourceData.name.toLowerCase().endsWith('csv') ? csvErrorMsg : txtErrorMsg);
                    setUploadStyles(styles => ({...styles, borderColor: "#dc3545", borderStyle: "solid"}));
                    console.log(e);
                }
            
            } else if (sourceData.name.toLowerCase().endsWith('.json')) {
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
                            updateTargetState(JSON.stringify(jsonDataObj));

                        } else throw new Error(jsonErrorMsg);
                        
                    }
                    fr.readAsText(sourceData);
                } catch (e) {
                    updateInvalidFileState(true, jsonErrorMsg);
                    setUploadStyles(styles => ({...styles, borderColor: "#dc3545", borderStyle: "solid"}));
                    console.log(e);
                }
            } else if (sourceData.name.toLowerCase().endsWith('.xlsx')) {
                try {
                    (async () => {
                        const data = await sourceData.arrayBuffer();
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

        } else updateTargetState(null);
        
    }

    return (
        
        <DataComponentWrapper 
            compID={compID}
            cardTitle={cardTitle}
            iconClassNames={iconClassNames}
            canHaveSources={false}
            file={file}
            updateTargetData={updateTargetData}
        >
            <FileUploadDropZone
                file={file}
                setFile={setFile}
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
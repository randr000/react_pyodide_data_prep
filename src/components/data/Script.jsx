import React, { useEffect, useState } from "react";

// import other utility component(s)
import DataComponentWrapper from "../utilities/DataComponentWrapper";
import ScriptInputModal from "../utilities/ScriptInputModal";
import PythonErrorModal from "../utilities/PythonErrorModal";
import { Button } from "react-bootstrap";

// import custom hooks
import useGetContexts from "../../custom-hooks/useGetContexts";
import useGetDataComponentLocalState from '../../custom-hooks/useGetDataComponentLocalState';

const Script = ({compID, cardTitle, iconClassNames}) => {

    const {appState} = useGetContexts();
    const {isDragging} = appState;

    const {localState, updateLocalState} = useGetDataComponentLocalState(compID);
    const {body} = localState;

    // The users custom script
    function updateBody(updated) {
        updateLocalState({body: updated});
    }

    const [showScriptModal, setShowScriptModal] = useState(false);
    const [showPythonErrModal, setShowPythonErrModal] = useState(false);
    const [pythonError, setPythonError] = useState(false);

    const prefix = [
    'import pandas as pd',
    'import numpy as np',
    'from io import StringIO',
    'import json',
    'df_list = [pd.read_json(path_or_buf=StringIO(json.dumps(data)), orient="split") for data in json.loads(jsonStr)]',
    'df = df_list[0]',
    ];

    const postfix = ['df = df.reset_index(drop=True).to_json(orient="split")']

    // The combined full script
    const [pyScript, setPyScript] = useState(`${prefix.join('\n')}\n${body}\n${postfix.join('\n')}`);

    // Create the full python script whenever body changes
    useEffect(() => {
        setPyScript(`${prefix.join('\n')}\n${body}\n${postfix.join('\n')}`);
    }, [body]);

    /**
     * 
     * Defines the actions to take when source data changes in order to update target state
     * Pass as prop to DataComponentWrapper if necessary
     * If not passed to DataComponentWrapper, the default is to just update target data with source data
     * 
     * @param {*} sourceData - A JSON formatted string, file object, etc. Any change to this variable will trigger
     *                              this function to run when this function is passed as a prop to DataComponentWrapper.
     * @param {Function} updateTargetState - A function to be called in order to update target state. Most likely a
     *                                       setState function.
     */
    function updateTargetData(sourceData, updateTargetState, pyodide, isPyodideLoaded) {
        if (!sourceData) {
            updateTargetState(null);
            setPythonError(false);
        }
        else if (isPyodideLoaded) {
            try {
                let myNamespace = pyodide.toPy({jsonStr: sourceData.charAt(0) === '{' ? `[${sourceData}]` : sourceData});
                pyodide.runPython(pyScript, {globals: myNamespace});
                updateTargetState(myNamespace.get('df'));
                setPythonError(false);
                 
            } catch (error) {
                updateTargetState(sourceData.charAt(0) === '{' ? sourceData : JSON.parse(sourceData)[0]);
                setPythonError(error);
            }
        }
    }

    /**
     * 
     * Defines the actions to take when the user changes the varaibles of transforming the source data such
     * as changing which columns to filter, changing which rows to filter, etc.
     * Pass as prop to DataComponentWrapper if necessary
     * 
     * Write here which variables that when their value is changed will trigger the data to be transformed:
     *  - pyScript
     * Pass these variables as an array using the targetDataDeps prop to DataComponentWrapper
     * 
     * 
     * 
     * @param {String} sourceData - A JSON formatted string containing the data to be transformed
     * @param {Function} updateTargetState - A function to be called in order to update target state. Most likely a
     *                                setState function.
     */
    function transformTargetData(sourceData, updateTargetState, pyodide, isPyodideLoaded) {
        
        if(sourceData && isPyodideLoaded) {
            try {
                let myNamespace = pyodide.toPy({jsonStr: sourceData.charAt(0) === '{' ? `[${sourceData}]` : sourceData});
                pyodide.runPython(pyScript, {globals: myNamespace});
                updateTargetState(myNamespace.get('df'));
                setPythonError(false);
            } catch (error) {
                updateTargetState(sourceData.charAt(0) === '{' ? sourceData : JSON.parse(sourceData)[0]);
                setPythonError(error);
            }
            
        }
    }

    return (
        <DataComponentWrapper
            compID={compID}
            cardTitle={cardTitle}
            iconClassNames={!pyScript || body === '' ? iconClassNames : pythonError ? `${iconClassNames} text-danger` : `${iconClassNames} text-success`}
            updateTargetData={updateTargetData}
            transformTargetData={transformTargetData}
            iconOnClick={() => !isDragging && setShowScriptModal(true)}
            targetDataDeps={[pyScript]}
            maxSources={Infinity}
        >   
            {pythonError && <Button variant="danger" className="my-2" onClick={() => setShowPythonErrModal(true)}>See Python Error</Button>}
            <ScriptInputModal
                compID={compID}
                body={body}
                updateBody={updateBody}
                showModal={showScriptModal}
                setShowModal={setShowScriptModal}
            />
            <PythonErrorModal
                compID={compID}
                error={pythonError}
                showModal={showPythonErrModal}
                setShowModal={setShowPythonErrModal}
            />
        </DataComponentWrapper>
    );
};

export default Script;
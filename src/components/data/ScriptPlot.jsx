import React, { useEffect, useState } from "react";

// import other utility component(s)
import DataComponentWrapper from "../utilities/DataComponentWrapper";
import ScriptInputModal from "../utilities/ScriptInputModal";
import PythonErrorModal from "../utilities/PythonErrorModal";
import { Button } from "react-bootstrap";

// import custom hooks
import useGetContexts from "../../custom-hooks/useGetContexts";
import useGetDataComponentLocalState from '../../custom-hooks/useGetDataComponentLocalState';

const ScriptPlot = ({compID, cardTitle, iconClassNames}) => {

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
    'import matplotlib.pyplot as plt',
    'import matplotlib',
    'matplotlib.use("module://matplotlib.backends.html5_canvas_backend")',
    'from io import StringIO',
    'import json',
    'df_list = [pd.read_json(path_or_buf=StringIO(json.dumps(data)), orient="split") for data in json.loads(jsonStr)]',
    'df = df_list[0]',
    ];

    // The combined full script
    const [pyScript, setPyScript] = useState(`${prefix.join('\n')}\n${body}`);

    // Create the full python script whenever body changes
    useEffect(() => {
        setPyScript(`${prefix.join('\n')}\n${body}`);
    }, [body]);

    return (
        <DataComponentWrapper
            compID={compID}
            cardTitle={cardTitle}
            iconClassNames={!pyScript || body === '' ? iconClassNames : pythonError ? `${iconClassNames} text-danger` : `${iconClassNames} text-success`}
            iconOnClick={() => !isDragging && setShowScriptModal(true)}
            targetDataDeps={[pyScript]}
            maxSources={Infinity}
            canHaveTargets={false}
            canHaveDownloadPill={false}
            dataOutputType="plot"
            plotScript={pyScript}
            setScriptingError={setPythonError}
        >   
            {pythonError && <Button variant="danger" className="my-2" onClick={() => setShowPythonErrModal(true)}>See Python Error</Button>}
            <ScriptInputModal
                compID={compID}
                body={body}
                updateBody={updateBody}
                showModal={showScriptModal}
                setShowModal={setShowScriptModal}
                allowPlotting={true}
                setScriptingError={setPythonError}
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

export default ScriptPlot;
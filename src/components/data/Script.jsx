import React, { useEffect, useState } from "react";

// import other utility component(s)
import DataComponentWrapper from "../utilities/DataComponentWrapper";
import ScriptInputModal from "../utilities/ScriptInputModal";

const Script = ({compID, cardTitle, iconClassNames}) => {

    const [showModal, setShowModal] = useState(false);

    const prefix = `
    import pandas as pd
    from io import StringIO
    import json

    df_list = [pd.read_json(path_or_buf=StringIO(json.dumps(data)), orient="split") for data in json.loads(jsonStr)]
    df = df_list[0]
    `;

    // The users custom script
    const [body, setBody] = useState('');

    const postfix = `
    df = df.reset_index(drop=True).to_json(orient='split')
    `

    const [pyScript, setPyScript] = useState(`${prefix}${body}${postfix}`);

    useEffect(() => {
        setPyScript(`${prefix}${body}${postfix}`);
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
        }
        else if (isPyodideLoaded) {
            let myNamespace = pyodide.toPy({jsonStr: sourceData.charAt(0) === '{' ? `[${sourceData}]` : sourceData});
            pyodide.runPython(pyScript, {globals: myNamespace});
            // console.log(`myNamespace: ${myNamespace.get('df')}`);
            updateTargetState(myNamespace.get('df'));
        }
    }

    return (
        <DataComponentWrapper
            compID={compID}
            cardTitle={cardTitle}
            iconClassNames={iconClassNames}
            updateTargetData={updateTargetData}
            iconOnClick={() => setShowModal(true)}
            maxSources={Infinity}
        >
            <ScriptInputModal
                compID={compID}
                body={body}
                setBody={setBody}
                showModal={showModal}
                setShowModal={setShowModal}
            />
        </DataComponentWrapper>
    );
};

export default Script;
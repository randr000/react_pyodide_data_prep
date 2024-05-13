import React, { useState, useContext } from "react";

// import custom hooks
import useGetContexts from '../../custom-hooks/useGetContexts';

// import other utility component(s)
import DataComponentWrapper from "../utilities/DataComponentWrapper";

// import Python function(s)
import union from '../../python_code_js_modules/union';

const Union = ({compID, cardTitle, iconClassNames}) => {

        // A JSON formatted string containing the source data
        const [sourceDataJSONStr, setSourceDataJSONStr] = useState(null);

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
                // Load Python function
                pyodide.runPython(union);
                // Call python function and sets new targetDataJSONStr state
                updateTargetState(pyodide.globals.get('union')(sourceData));
            }
        }

    return (
        <DataComponentWrapper 
            compID={compID}
            cardTitle={cardTitle}
            iconClassNames={iconClassNames}
            sourceDataJSONStr={sourceDataJSONStr}
            setSourceDataJSONStr={setSourceDataJSONStr}
            updateTargetData={updateTargetData}
            maxSources={Infinity}
        >
        </DataComponentWrapper>
    );
};

export default Union;
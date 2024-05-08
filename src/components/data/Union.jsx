import React, { useState, useContext } from "react";

// import custom hooks
import useGetContexts from '../../custom-hooks/useGetContexts';

// import other utility component(s)
import DataComponentWrapper from "../utilities/DataComponentWrapper";

// import Python function(s)

const Union = ({compID, cardTitle, iconClassNames}) => {

        const {pyodide, isPyodideLoaded} = useGetContexts();

        // A JSON formatted string containing the source data
        const [sourceDataJSONStr, setSourceDataJSONStr] = useState(null);

        // A JSON formatted string containing the transformed data
        const [targetDataJSONStr, setTargetDataJSONStr] = useState(null);

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
        function updateTargetData(sourceData, updateTargetState) {
            if (!sourceData) {
                updateTargetState(null);
            }
            else {
                // where python function will run
                const data = JSON.parse(sourceData);
                data.forEach(a => console.log(a));
                return;   
            }
        }

    return (
        <DataComponentWrapper 
            compID={compID}
            cardTitle={cardTitle}
            iconClassNames={iconClassNames}
            sourceDataJSONStr={sourceDataJSONStr}
            setSourceDataJSONStr={setSourceDataJSONStr}
            setTargetDataJSONStr={setTargetDataJSONStr}
            targetDataJSONStr={targetDataJSONStr}
            updateTargetData={updateTargetData}
            maxSources={Infinity}
        >
        </DataComponentWrapper>
    );
};

export default Union;
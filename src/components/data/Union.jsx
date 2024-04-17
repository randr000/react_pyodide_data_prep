import React, { useState, useContext } from "react";
import DataComponentWrapper from "../utilities/DataComponentWrapper";
import AppDataContext from '../../context/AppDataContext';
import APP_ACTION_TYPES from '../../action-types/appActionTypes';

// import Pyodide context
import { PyodideContext } from '../../context/PyodideContext';

// import Python function(s)

const Union = ({compID, cardTitle, iconClassNames}) => {

        const {pyodide, isPyodideLoaded} = useContext(PyodideContext);
        const {appState, dispatch} = useContext(AppDataContext);
        const {connectComponents, components} = appState;

        // A JSON formatted string that can be used to create a pandas dataframe
        const [outputData, setOutputData] = useState(null);

        // A reference to this components properties in the components global state variable
        const thisComponent = components.filter(comp => comp.compID === compID)[0];
    
        // If this component has a source component, then it loads the source component's JSON data as a string, else null
        const jsonDataStr = thisComponent.sourceComponents.size ?
                    components[components.findIndex(comp => [...thisComponent.sourceComponents][0] === comp.compID)].data : null;

    return (
        <DataComponentWrapper 
            compID={compID}
            cardTitle={cardTitle}
            iconClassNames={iconClassNames}
            outputData={outputData}
        >
        </DataComponentWrapper>
    );
};

export default Union;
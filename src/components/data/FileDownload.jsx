import React, { useState, useContext, useEffect } from 'react';
import DataComponentWrapper from '../utilities/DataComponentWrapper';
import AppDataContext from '../../context/AppDataContext';
import APP_ACTION_TYPES from '../../action-types/appActionTypes';

// import other utility component(s)


// import Pyodide context
import { PyodideContext } from '../../context/PyodideContext';

// import Python function(s)
import df_to_csv from '../../python_code_js_modules/df_to_csv';


const FileDownload = ({compID, cardTitle, fileExtension, iconClassNames}) => {

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
     
    useEffect(() => {
        setOutputData(jsonDataStr);
    }, [jsonDataStr]);

    function handleOnClick() {
        pyodide.runPython(df_to_csv);
        const file = pyodide.globals.get('df_to_csv')(outputData);
        const blob = new Blob([file], {type: "text/csv"});
        const blob2 = new Blob([file], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
        // console.log(blob)
        const a = document.createElement('a');
        const a2 = document.createElement('a');
        a.setAttribute('download', 'test.csv');
        a2.setAttribute('download', 'test.xlsx');
        const href = URL.createObjectURL(blob);
        const href2 = URL.createObjectURL(blob2);
        a.href = href;
        a2.href = href2;
        a.click();
        a2.click();
        a.setAttribute('download', 'test.txt');
        a.click();
        URL.revokeObjectURL(href);
        a.remove();
        a2.remove();
    }

    return (
       <DataComponentWrapper
        compID={compID}
        cardTitle={cardTitle}
        iconClassNames={iconClassNames}
        canHaveOutput={false}
        outputData={outputData}
       >
            <div onClick={handleOnClick}>click</div>
       </DataComponentWrapper>
    );
};

export default FileDownload;
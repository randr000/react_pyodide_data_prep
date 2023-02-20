import React, { useState, useEffect, useContext } from 'react';
import Draggable from 'react-draggable';
import DataFlowPill from './DataFlowPill';
import CardSummary from './CardSummary';
import Table from './Table';
import filter from '../python_code_js_modules/filter';
import { PyodideContext } from '../context/PyodideContext';

import { useXarrow } from 'react-xarrows';


const Filter = ({jsonData, cardTitle, iconClassNames}) => {

    const [inputData, setInputData] = useState(jsonData);
    const [outputData, setOutputData] = useState(null);
    const {pyodide, isPyodideLoaded} = useContext(PyodideContext);
    const updateXarrow = useXarrow();

    useEffect(() => {
        // console.log(`inputData: ${jsonData}`)
        function filterDF(jsonStr) {
            // console.log("running")
            if (isPyodideLoaded) {
                pyodide.runPython(filter);
                // console.log(`pyodide get ${pyodide.globals.get('filter')(jsonStr, ['city', 'population'])}`);
                setOutputData(pyodide.globals.get('filter')(jsonStr, ['city']));
            }
        }

        // if (inputData) filterDF(inputData);
        if (jsonData) filterDF(jsonData);
        else setOutputData(null);

        console.log(`jsonData: ${jsonData}`);
        // console.log(`outputData: ${outputData}`);

    }, []);

    return (

        <Draggable bounds="" onDrag={updateXarrow} onStop={updateXarrow}>
            <div className="d-flex">
                <div className="card border border-primary border-3" style={{width: "12rem"}}>
                    <div className="card-body text-center">
                
                        <DataFlowPill isOnTop={true} id="filter" />
                        <CardSummary cardTitle={cardTitle} iconClassNames={iconClassNames} />
                        <DataFlowPill isOnTop={false} />
                    </div>
                </div>
                {outputData && <Table tableData={outputData}/>}
            </div>
        </Draggable>
    );
};

export default Filter;
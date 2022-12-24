import React, { useState, useEffect, useContext } from 'react';
import Draggable from 'react-draggable';
import DataFlowPill from './DataFlowPill';
import CardSummary from './CardSummary';
import Table from './Table';
import filter from '../python_code_js_modules/filter';
import { PyodideContext } from '../context/PyodideContext';


const Filter = ({jsonData, cardTitle, iconClassNames}) => {

    const [inputData, setInputData] = useState(jsonData);
    // const [inputData, setInputData] = useState(null);
    const [outputData, setOutputData] = useState(null);
    const {pyodide, isPyodideLoaded} = useContext(PyodideContext);

    // if (jsonData) setInputData(jsonData);

    useEffect(() => {

        function filterDF(jsonStr) {

            if (isPyodideLoaded) {
                pyodide.runPython(filter);
                setOutputData(pyodide.globals.get('filter')(jsonStr, ['state', 'state_population']));
            }
        }

        if (inputData) filterDF(inputData);
        else setOutputData(null);

        console.log(`jsonData: ${jsonData}`);

    }, [inputData]);

    return (

        <Draggable bounds="">
            <div>
                <div className="card border border-primary border-3" style={{width: "12rem"}}>
                    <div className="card-body text-center">
                
                        <DataFlowPill isOnTop={true} />
                        <CardSummary cardTitle={cardTitle} iconClassNames={iconClassNames} />
                        {/* <FileUploadDropZone file={file} setFile={setFile} ext={fileExtension} /> */}
                        <DataFlowPill isOnTop={false} />
                    </div>
                </div>
                {outputData && <Table tableData={outputData}/>}
            </div>
        </Draggable>
    );
};

export default Filter;
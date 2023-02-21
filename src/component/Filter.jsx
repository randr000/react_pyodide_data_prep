import React, { useState, useEffect, useContext, useRef } from 'react';
import Draggable from 'react-draggable';
import DataFlowPill from './DataFlowPill';
import CardSummary from './CardSummary';
import Checkbox from './Checkbox';
import Checkboxes from './Checkboxes';
import Table from './Table';
import filter from '../python_code_js_modules/filter';
import { PyodideContext } from '../context/PyodideContext';

import { useXarrow } from 'react-xarrows';

const Filter = ({jsonData, cardTitle, iconClassNames}) => {

    const [outputData, setOutputData] = useState(null);
    const {pyodide, isPyodideLoaded} = useContext(PyodideContext);
    const updateXarrow = useXarrow();
    const count = useRef(0);
    const [columns, setColumns] = useState(JSON.parse(jsonData)['columns']);

    const [filteredCols, setFilteredCols] = useState(
        JSON.parse(jsonData)['columns'].map(col => ({label: col, isChecked: true}))
    );

    function filterDF(jsonStr, cols) {
        if (isPyodideLoaded) {
            pyodide.runPython(filter);
            setOutputData(pyodide.globals.get('filter')(jsonStr, cols));
        }
    }


    function filterCol(colName, isChecked) {
        setFilteredCols(prevState => prevState.map(col => col.label === colName ? ({label: colName, isChecked: isChecked}) : col));
    }

    useEffect(() => {
        count.current += 1;
    });


    useEffect(() => {
        filterDF(jsonData, filteredCols.filter(col => col.isChecked).map(col => col.label));
        // console.log(`filtered cols: ${JSON.stringify(filteredCols)}`);
    }, [filteredCols]);

    useEffect(() => {
        
        if (jsonData) {
            setColumns(JSON.parse(jsonData)['columns']);

            setFilteredCols(JSON.parse(jsonData)['columns'].map(col => ({label: col, isChecked: true})));
            
            filterDF(jsonData, JSON.parse(jsonData)['columns']);
        }
        else setOutputData(null);
        console.log(`json data: ${JSON.stringify(filteredCols)}`);
    }, [jsonData]);

    // useEffect(() => {
    //     setFilteredCols(JSON.parse(jsonData)['columns'].reduce((obj, key) => ({...obj, [key]: true}), {}));
    //     console.log('columns')
    // }), [columns];

    return (

        <Draggable bounds="" onDrag={updateXarrow} onStop={updateXarrow}>
            <div className="d-flex">
                <div className="card border border-primary border-3" style={{width: "12rem"}}>
                    <div className="card-body text-center">

                        <DataFlowPill isOnTop={true} id="filter" />
                        <CardSummary cardTitle={cardTitle} iconClassNames={iconClassNames} />
                        <Checkboxes checkboxes={filteredCols} onChange={filterCol} />
                        <DataFlowPill isOnTop={false} />

                    </div>
                </div>
                {outputData && <Table tableData={outputData}/>}
            </div>
        </Draggable>
    );
};

export default Filter;
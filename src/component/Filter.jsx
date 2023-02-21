import React, { useState, useEffect, useContext } from 'react';
import Draggable from 'react-draggable';
import DataFlowPill from './DataFlowPill';
import CardSummary from './CardSummary';
import Checkbox from './Checkbox';
import Table from './Table';
import filter from '../python_code_js_modules/filter';
import { PyodideContext } from '../context/PyodideContext';

import { useXarrow } from 'react-xarrows';


const Filter = ({jsonData, cardTitle, iconClassNames}) => {

    const [outputData, setOutputData] = useState(null);
    const {pyodide, isPyodideLoaded} = useContext(PyodideContext);
    const updateXarrow = useXarrow();

    const [columns, setColumns] = useState(JSON.parse(jsonData)['columns']);
    
    const [filteredCols, setFilteredCols] = useState(
        JSON.parse(jsonData)['columns'].reduce((obj, key) => ({...obj, [key]: true}), {})
    );

    function filterDF(jsonStr, cols) {
        if (isPyodideLoaded) {
            pyodide.runPython(filter);
            setOutputData(pyodide.globals.get('filter')(jsonStr, cols));
        }
    }

    function filterCol(colName) {
        setFilteredCols(prevState => ({...prevState, [colName]: !prevState[colName]}));
    }

    useEffect(() => {
        filterDF(jsonData, Object.keys(filteredCols));
        console.log(filteredCols)
    }, [filteredCols]);

    useEffect(() => {
        
        if (jsonData) {
            setColumns(JSON.parse(jsonData)['columns']);
            filterDF(jsonData, columns);
        }
        else setOutputData(null);

    }, [jsonData]);

    useEffect(() => {
        setFilteredCols(JSON.parse(jsonData)['columns'].reduce((obj, key) => ({...obj, [key]: true}), {}));
    }), [columns];

    return (

        <Draggable bounds="" onDrag={updateXarrow} onStop={updateXarrow}>
            <div className="d-flex">
                <div className="card border border-primary border-3" style={{width: "12rem"}}>
                    <div className="card-body text-center">

                        <DataFlowPill isOnTop={true} id="filter" />
                        <CardSummary cardTitle={cardTitle} iconClassNames={iconClassNames} />
                        {
                            columns.map(l => <Checkbox key={l} label={l} checkedState={filteredCols[l]} onChange={filterCol} />)
                        }
                        <DataFlowPill isOnTop={false} />

                    </div>
                </div>
                {outputData && <Table tableData={outputData}/>}
            </div>
        </Draggable>
    );
};

export default Filter;
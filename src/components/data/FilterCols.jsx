import React, { useState, useEffect, useContext } from 'react';
import Draggable from 'react-draggable';
import DataFlowPill from '../utilities/DataFlowPill';
import ToggleTablePill from '../utilities/ToggleTablePill';
import CardSummary from '../utilities/CardSummary';
import Checkboxes from '../utilities/Checkboxes';
import Table from '../utilities/Table';
import filter from '../../python_code_js_modules/filter';
import { PyodideContext } from '../../context/PyodideContext';
import AppDataContext from '../../context/AppDataContext';
import DeleteDataComponentPill from '../utilities/DeleteDataComponentPill';

import { useXarrow } from 'react-xarrows';

    const FilterCols = ({compID, cardTitle, iconClassNames}) => {

    const [outputData, setOutputData] = useState(null);
    const {pyodide, isPyodideLoaded} = useContext(PyodideContext);

    // Checkbox React component keys
    const [cbKey, setCbKey] = useState(0);

    const [showTable, setShowTable] = useState(true);

    const {appState, dispatch} = useContext(AppDataContext);
    const {connectComponents, components} = appState;
    const thisComponent = components.filter(c => c.compID === compID)[0];
    
    // const jsonData = thisComponent.sourceComponents.length ?
    //                     components[thisComponent.sourceComponents[0]].data : null;

    const jsonData = thisComponent.sourceComponents.size ?
                        components[[...thisComponent.sourceComponents][0]].data : null;

    const maxSources = 1; // Max number of data source connections allowed

    const updateXarrow = useXarrow();
    
    //
    const [filteredCols, setFilteredCols] = useState(
        jsonData ? JSON.parse(jsonData)['columns'].map(col => ({label: col, isChecked: true})) : null
    );

    /**
     * 
     * @param {Data is json format that can be converted to pandas dataframe} jsonStr 
     * @param {Array of column names to be filtered for} cols 
     */
    function filterDF(jsonStr, cols) {
        if (isPyodideLoaded) {
            pyodide.runPython(filter);
            setOutputData(pyodide.globals.get('filter')(jsonStr, cols));
        }
    }


    function filterCol(colName, isChecked) {
        setFilteredCols(prevState => prevState.map(col => col.label === colName ? ({label: colName, isChecked: isChecked}) : col));
        updateXarrow();
    }
 


    useEffect(() => {
        if (jsonData) {
            filterDF(jsonData, filteredCols.filter(col => col.isChecked).map(col => col.label));
        }
    }, [filteredCols]);

    useEffect(() => {
        
        if (jsonData) {

            setFilteredCols(JSON.parse(jsonData)['columns'].map(col => ({label: col, isChecked: true})));
            
            filterDF(jsonData, JSON.parse(jsonData)['columns']);

            setCbKey(prevKey => prevKey + 1);
        }
        else setOutputData(null);
        updateXarrow();

    }, [jsonData]);


    useEffect(() => {
        updateXarrow();
    }, [showTable]);

    return (

        <div className="d-flex">
            <Draggable bounds="" onDrag={updateXarrow} onStop={updateXarrow}>
                <div className="d-flex align-items-start">
                    <div className="card border border-primary border-3" style={{width: "12rem"}}>
                        <div className="card-body text-center">
                            <DeleteDataComponentPill compID={compID}/>
                            <DataFlowPill isOnTop={true} id={`${compID}-top`} />
                            <ToggleTablePill showTable={showTable} toggleTable={setShowTable} />
                            <CardSummary cardTitle={cardTitle} iconClassNames={iconClassNames} />
                            {filteredCols && <Checkboxes key={cbKey} checkboxes={filteredCols} onChange={filterCol} />}
                            <DataFlowPill isOnTop={false} id={`${compID}-btm`} />
                        </div>
                    </div>
                    {outputData && <Table tableData={outputData} show={showTable} />}
                </div>
            </Draggable>
        </div>
    );
};

export default FilterCols;
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
import APP_ACTION_TYPES from '../../action-types/appActionTypes';

    const FilterCols = ({compID, cardTitle, iconClassNames}) => {

    const [disableDrag, setDisableDrag] = useState(false);
    const [outputData, setOutputData] = useState(null);
    const {pyodide, isPyodideLoaded} = useContext(PyodideContext);

    // Checkbox React component keys
    const [cbKey, setCbKey] = useState(0);

    const [showTable, setShowTable] = useState(true);

    const {appState, dispatch} = useContext(AppDataContext);
    const {connectComponents, components} = appState;
    const thisComponent = components.filter(c => c.compID === compID)[0];

    const jsonData = thisComponent.sourceComponents.size ?
                components[components.findIndex(c => [...thisComponent.sourceComponents][0] === c.compID)].data : null;
    

    const maxSources = 1; // Max number of data source connections allowed

    const updateXarrow = useXarrow();
    
    //
    const [filteredCols, setFilteredCols] = useState(
        jsonData ? JSON.parse(jsonData)['columns'].map(col => ({label: col, isChecked: true})) : null
    );

    useEffect(() => {
        // Reset filteredCols when jsonData is removed
        if (!jsonData) setFilteredCols(null);
    }, [jsonData]);

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
    }

    useEffect(() => {
        if (jsonData) {
            filterDF(jsonData, filteredCols.filter(col => col.isChecked).map(col => col.label));
        }

        updateXarrow();
    }, [filteredCols]);

    useEffect(() => {
    // Update component output data anytime columns are filtered or source data is modified
        const c = [...components];
        c[c.findIndex(c => c.compID === compID)].data = outputData;

        dispatch({
            type: APP_ACTION_TYPES.MODIFY_COMPONENT_DATA,
            payload: c
        });

    }, [outputData]);

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

        <div className="d-flex" style={{position: "absolute"}}>
            <Draggable bounds="" onDrag={updateXarrow} onStop={updateXarrow} disabled={disableDrag}>
                <div className="d-flex align-items-start">
                    <div className="card border border-primary border-3" style={{width: "12rem"}}>
                        <div className="card-body text-center">
                            <DeleteDataComponentPill compID={compID} setDisableDrag={setDisableDrag} />
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
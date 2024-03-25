import React, { useState, useContext, useEffect } from 'react';
import DataComponentWrapper from '../utilities/DataComponentWrapper';
import AppDataContext from '../../context/AppDataContext';
import APP_ACTION_TYPES from '../../action-types/appActionTypes';

// import other utility component(s)
import Checkboxes from '../utilities/Checkboxes';

// import Pyodide context
import { PyodideContext } from '../../context/PyodideContext';

// import Python function(s)
import filter from '../../python_code_js_modules/filter';


const FilterCols = ({compID, cardTitle, iconClassNames}) => {
    
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
    
    // If there is source data stored as a JSON string, then set a string array of column names into filteredCols, else null
    const [filteredCols, setFilteredCols] = useState(
        jsonDataStr ? JSON.parse(jsonDataStr)['columns'].map(col => ({label: col, isChecked: true})) : null
    );
    
    // Reset filteredCols when jsonDataStr is removed
    useEffect(() => {
        if (!jsonDataStr) setFilteredCols(null);
    }, [jsonDataStr]);

    // Refilter the source data and update the outputData anytime the array of filteredCols is changed.
    useEffect(() => {
        if (jsonDataStr) {
            filterDF(jsonDataStr, filteredCols.filter(col => col.isChecked).map(col => col.label));
        }
    }, [filteredCols]);

    // Update component output data anytime columns are filtered or source data is modified
    useEffect(() => {
        const c = [...components];
        c[c.findIndex(c => c.compID === compID)].data = outputData;

        dispatch({
            type: APP_ACTION_TYPES.MODIFY_COMPONENT_DATA,
            payload: c
        });
    }, [outputData]);

    // If there is a jsonDataStr and there is a change to it, then..., else reset outputData to null
    useEffect(() => {  
        if (jsonDataStr) {

            // ...Update filteredCols for the new column names
            setFilteredCols(JSON.parse(jsonDataStr)['columns'].map(col => ({label: col, isChecked: true})));
            
            // ...Update the new outputData using all of the column names
            filterDF(jsonDataStr, JSON.parse(jsonDataStr)['columns']);
        }
        else setOutputData(null);
    }, [jsonDataStr]);

    /**
     * Takes a json formatted string that can be converted in to a pandas dataframe and a
     * list of column names that will be filtered for. The Python function will set the
     * new outputData to be the filtered dataframe as a JSON string.
     * 
     * @param {string} jsonStr Data is json format that can be converted to pandas dataframe
     * @param {Array} cols A string array of column names to be filtered for
     */
    function filterDF(jsonStr, cols) {
        if (isPyodideLoaded) {
            // Load Python function
            pyodide.runPython(filter);
            // Call python function and sets new outputData state
            setOutputData(pyodide.globals.get('filter')(jsonStr, cols));
        }
    }

    /**
     * Updates the filteredCols state by updatding the checked state of the column name passed
     * 
     * @param {string} colName 
     * @param {boolean} isChecked 
     */
    function filterCol(colName, isChecked) {
        setFilteredCols(prevState => prevState.map(col => col.label === colName ? ({label: colName, isChecked: isChecked}) : col));
    }

    return (

        <DataComponentWrapper 
            compID={compID}
            cardTitle={cardTitle}
            iconClassNames={iconClassNames}
            outputData={outputData}
        >
            {filteredCols && <Checkboxes checkboxes={filteredCols} onChange={filterCol} />}
        </DataComponentWrapper>

    );
};

export default FilterCols;
import React, { useState, useEffect } from 'react';

// import custom hooks
import useGetContexts from '../../custom-hooks/useGetContexts';

// import other utility component(s)
import Checkboxes from '../utilities/Checkboxes';
import DataComponentWrapper from '../utilities/DataComponentWrapper';

// import Python function(s)
import filter_cols from '../../python_code_js_modules/filter_cols';


const FilterCols = ({compID, cardTitle, iconClassNames}) => {
    
    const {pyodide, isPyodideLoaded, appState, dispatch} = useGetContexts();
    const {connectComponents, components} = appState;

    // A JSON formatted string containing the source data
    const [sourceDataJSONStr, setSourceDataJSONStr] = useState(null);

    // A JSON formatted string containing the transformed data
    const [targetDataJSONStr, setTargetDataJSONStr] = useState(null);

    function transformData(sourceData, updateTargetState) {
        if (!sourceData) {
            // Reset filteredCols when sourceDataJSONStr is removed
            setFilteredCols(null);
            updateTargetState(null)
        }
        else {
            // ...Update filteredCols for the new column names
            setFilteredCols(JSON.parse(sourceData)['columns'].map(col => ({label: col, isChecked: true})));
            
            // ...Update the new targetDataJSONStr using all of the column names
            filterDF(sourceData, JSON.parse(sourceData)['columns']);   
        }
    }
    
    // If there is source data stored as a JSON string, then set a string array of column names into filteredCols, else null
    const [filteredCols, setFilteredCols] = useState(
        sourceDataJSONStr ? JSON.parse(sourceDataJSONStr)['columns'].map(col => ({label: col, isChecked: true})) : null
    );

    // Refilter the source data and update the targetDataJSONStr anytime the array of filteredCols is changed.
    useEffect(() => {
        if (sourceDataJSONStr) {
            filterDF(sourceDataJSONStr, filteredCols.filter(col => col.isChecked).map(col => col.label));
        }
    }, [filteredCols]);

    /**
     * Takes a json formatted string that can be converted in to a pandas dataframe and a
     * list of column names that will be filtered for. The Python function will set the
     * new targetDataJSONStr to be the filtered dataframe as a JSON string.
     * 
     * @param {string} jsonStr Data is json format that can be converted to pandas dataframe
     * @param {Array} cols A string array of column names to be filtered for
     */
    function filterDF(jsonStr, cols) {
        if (isPyodideLoaded) {
            // Load Python function
            pyodide.runPython(filter_cols);
            // Call python function and sets new targetDataJSONStr state
            setTargetDataJSONStr(pyodide.globals.get('filter_cols')(jsonStr, cols));
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
            sourceDataJSONStr={sourceDataJSONStr}
            setSourceDataJSONStr={setSourceDataJSONStr}
            setTargetDataJSONStr={setTargetDataJSONStr}
            targetDataJSONStr={targetDataJSONStr}
            transformData={transformData}
        >
            {filteredCols && <Checkboxes checkboxes={filteredCols} onChange={filterCol} />}
        </DataComponentWrapper>

    );
};

export default FilterCols;
import React, { useState } from 'react';

// import custom hooks
import useGetContexts from '../../custom-hooks/useGetContexts';

// import other utility component(s)
import Checkboxes from '../utilities/Checkboxes';
import DataComponentWrapper from '../utilities/DataComponentWrapper';

// import Python function(s)
import filter_cols from '../../python_code_js_modules/filter_cols';


const FilterCols = ({compID, cardTitle, iconClassNames}) => {

    // A JSON formatted string containing the source data
    const [sourceDataJSONStr, setSourceDataJSONStr] = useState(null);

    // A JSON formatted string containing the transformed data
    const [targetDataJSONStr, setTargetDataJSONStr] = useState(null);

    const [filteredCols, setFilteredCols] = useState(null);

    /**
     * 
     * Defines the actions to take when source data changes in order to update target state
     * Pass as prop to DataComponentWrapper if necessary
     * If not passed to DataComponentWrapper, the default is to just update target data with source data
     * 
     * @param {*} sourceData - A JSON formatted string, file object, etc. Any change to this variable will trigger
     *                              this function to run when this function is passed as a prop to DataComponentWrapper.
     * @param {Function} updateTargetState - A function to be called in order to update target state. Most likely a
     *                                       setState function.
     */
    function updateTargetData(sourceData, updateTargetState, pyodide, isPyodideLoaded) {
        if (!sourceData) {
            // Reset filteredCols when source data is removed
            setFilteredCols(null);
            updateTargetState(null);
        }
        else {
            // Update filteredCols for the new column names
            setFilteredCols(JSON.parse(sourceData)['columns'].map(col => ({label: col, isChecked: true})));
            
            // Update the new targetDataJSONStr using all of the column names
            filterDF(sourceData, JSON.parse(sourceData)['columns'], updateTargetState, pyodide, isPyodideLoaded);   
        }
    }

    /**
     * 
     * Defines the actions to take when the user changes the varaibles of transforming the source data such
     * as changing which columns to filter, changing which rows to filter, etc.
     * Pass as prop to DataComponentWrapper if necessary
     * 
     * Write here which variables that when their value is changed will trigger the data to be transformed:
     *  - filteredCols
     * Pass these variables as an array using the targetDataDeps prop to DataComponentWrapper
     * 
     * 
     * 
     * @param {String} sourceData - A JSON formatted string containing the data to be transformed
     * @param {Function} updateTargetState - A function to be called in order to update target state. Most likely a
     *                                setState function.
     */
    function transformTargetData(sourceData, updateTargetState, pyodide, isPyodideLoaded) {
        if (sourceData) {
            filterDF(
                sourceData,
                filteredCols.filter(col => col.isChecked).map(col => col.label),
                updateTargetState,
                pyodide,
                isPyodideLoaded
            );
        }
    }

    /**
     * Takes a json formatted string that can be converted in to a pandas dataframe and a
     * list of column names that will be filtered for. The Python function will set the
     * new targetDataJSONStr to be the filtered dataframe as a JSON string.
     * 
     * @param {string} jsonStr Data is json format that can be converted to pandas dataframe
     * @param {Array} cols A string array of column names to be filtered for
     */
    function filterDF(jsonStr, cols, updateTargetState, pyodide, isPyodideLoaded) {
        if (isPyodideLoaded) {
            // Load Python function
            pyodide.runPython(filter_cols);
            // Call python function and sets new targetDataJSONStr state
            updateTargetState(pyodide.globals.get('filter_cols')(jsonStr, cols));
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
            updateTargetData={updateTargetData}
            transformTargetData={transformTargetData}
            targetDataDeps={[filteredCols]}
        >
            {filteredCols && <Checkboxes checkboxes={filteredCols} onChange={filterCol} />}
        </DataComponentWrapper>

    );
};

export default FilterCols;
import React, { useEffect, useState } from "react";
import APP_ACTION_TYPES from '../../action-types/appActionTypes';

// import other utility component(s)
import DataComponentWrapper from '../utilities/DataComponentWrapper';
import { Form } from "react-bootstrap";

// import custom hooks
import useGetContexts from '../../custom-hooks/useGetContexts';
import useGetDataComponentLocalState from '../../custom-hooks/useGetDataComponentLocalState';

// import Python function(s)
import filter_rows from '../../python_code_js_modules/filter_rows';

const FilterRows = ({compID, cardTitle, iconClassNames}) => {

    const {dispatch} = useGetContexts();

    const {localState, updateLocalState} = useGetDataComponentLocalState(compID);
    const {columns, col, operator, colValue} = localState;

    function resetLocalState() {
        return {columns: [], col: '', operator: '', colValue: ''};
    }

    function updateCol(updated) {
        updateLocalState({col: updated});
    }

    function updateOperator(updated) {
        updateLocalState({operator: updated});
    }

    function updateColValue(updated) {
        updateLocalState({colValue: updated});
    }

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
            updateLocalState(resetLocalState());
            updateTargetState(null);
        }
        else {
            const columns = JSON.parse(sourceData).columns;
            const updateCol = columns.includes(col) ? col : columns[0];
            updateLocalState({columns: columns, col: updateCol});

            // Load Python function
            if (isPyodideLoaded) pyodide.runPython(filter_rows);
            else return;

            updateTargetState(pyodide.globals.get('filter_rows')(sourceData, updateCol, operator, prepareColValue(colValue)));
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
            
            // Load Python function
            if (isPyodideLoaded) pyodide.runPython(filter_rows);
            else return;

            updateTargetState(pyodide.globals.get('filter_rows')(sourceData, col, operator, prepareColValue(colValue)));
        }
    }

    /**
     * 
     * @param {string} value - converts colValue to number if appropriate
     * @returns number or string
     */
    function prepareColValue(value) {
        return Number.isNaN(+value) ? value : Number(value);
    }

    function handleOnMouseOver() {
        dispatch({type: APP_ACTION_TYPES.TOGGLE_IS_DRAGGING_DISABLED, payload: true});
    }

    function handleOnMouseOut() {
        dispatch({type: APP_ACTION_TYPES.TOGGLE_IS_DRAGGING_DISABLED, payload: false});
    }

    return (

        <DataComponentWrapper 
            compID={compID}
            cardTitle={cardTitle}
            iconClassNames={iconClassNames}
            updateTargetData={updateTargetData}
            transformTargetData={transformTargetData}
            targetDataDeps={[col, operator, colValue]}
        >
            {
                columns.length ?

                <>
                    <div className="d-flex">
                        <Form.Label className="align-self-start" htmlFor={`filter-row-col-sel-${compID}`}>Column:</Form.Label>
                    </div>
                    <Form.Select
                        id={`filter-row-col-sel-${compID}`}
                        value={col}
                        onChange={e => updateCol(e.target.value)}
                        className="mb-2"
                        onMouseOver={handleOnMouseOver}
                        onMouseOut={handleOnMouseOut}
                    >
                        {columns.map(c => <option key={c} value={c}>{c}</option>)}
                    </Form.Select>

                    <div className="d-flex">
                        <Form.Label className="align-self-start" htmlFor={`filter-row-op-sel-${compID}`}>Operator:</Form.Label>
                    </div>
                    <Form.Select
                        id={`filter-row-op-sel-${compID}`}
                        value={operator}
                        onChange={e => updateOperator(e.target.value)}
                        className="mb-2"
                        onMouseOver={handleOnMouseOver}
                        onMouseOut={handleOnMouseOut}
                    >
                        <option value=""></option>
                        <option value="==">==</option>
                        <option value="!=">!=</option>
                        <option value="<">&lt;</option>
                        <option value="<=">&le;</option>
                        <option value=">">&gt;</option>
                        <option value=">=">&ge;</option>
                    </Form.Select>

                    <div className="d-flex mt-2">
                        <Form.Label className="align-self-start" htmlFor={`filter-row-value-${compID}`}>Filter Value:</Form.Label>
                    </div>
                    <Form.Control   
                        type="text"
                        id={`filter-row-value-${compID}`}
                        value={colValue}
                        onChange={e => updateColValue(e.target.value)}
                        onMouseOver={handleOnMouseOver}
                        onMouseOut={handleOnMouseOut}
                    />

                </> : null
            }
        </DataComponentWrapper>

    );

};

export default FilterRows;
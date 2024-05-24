import React, { useState } from 'react';
import APP_ACTION_TYPES from '../../action-types/appActionTypes';

// import other utility component(s)
import DataComponentWrapper from '../utilities/DataComponentWrapper';
import { Form } from 'react-bootstrap';

// import custom hooks
import useGetContexts from '../../custom-hooks/useGetContexts';
import useGetDataComponentLocalState from '../../custom-hooks/useGetDataComponentLocalState';

// import Python function(s)
import join from '../../python_code_js_modules/join';


const Join = ({compID, cardTitle, iconClassNames}) => {

    const {dispatch} = useGetContexts();

    const {localState, updateLocalState} = useGetDataComponentLocalState(compID);
    const {joinType, columns, onCol, leftSuffix, rightSuffix} = localState;

    // Type of Join
    function updateJoinType(updated) {
        updateLocalState({joinType: updated});
    }

    // Column to join data on
    function updateOnCol(updated) {
        updateLocalState({onCol: updated});
    }

    // Left and Right suffixes for joined columns with same name
    function updateLeftSuffix(updated) {
        updateLocalState({leftSuffix: updated});
    }

    function updateRightSuffix(updated) {
        updateLocalState({rightSuffix: updated});
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
            updateLocalState({columns: null, onCol: ''});
            updateTargetState(null);
        } else {

            const sourceArray = JSON.parse(sourceData);

            // Load Python function
            if (isPyodideLoaded) pyodide.runPython(join);
            else return;

            if (!Array.isArray(sourceArray)) {

                const onColumn = !sourceArray.columns.includes(onCol) ? sourceArray.columns[0] : onCol;
                updateLocalState({columns: sourceArray.columns, onCol: onColumn});

                // Call python function and sets new targetDataJSONStr state
                updateTargetState(pyodide.globals.get('join')(`[${JSON.stringify(sourceArray)}]`, onColumn, joinType, leftSuffix, rightSuffix));

            } else {
                const columnsA = sourceArray[0].columns;
                let columnsB = [];
                let updatedColumns = [];
                let onColumn = onCol;

                if (sourceArray.length === 2) {
                    columnsB = sourceArray[1].columns;
                    updatedColumns = [...new Set(columnsA.filter(col => columnsB.includes(col)))]
                    onColumn = updatedColumns.includes(onCol) ? onCol : updatedColumns[0];

                } else {
                    updatedColumns = [...columnsA];
                    onColumn = columnsA.includes(onCol) ? onCol : columnsA[0];
                };

                
                updateLocalState({columns: updatedColumns, onCol: onColumn});
                // Call python function and sets new targetDataJSONStr state
                updateTargetState(pyodide.globals.get('join')(sourceData, onColumn, joinType, leftSuffix, rightSuffix));
            }

        }
    }

    /**
     * 
     * Defines the actions to take when the user changes the varaibles of transforming the source data such
     * as changing which columns to filter, changing which rows to filter, etc.
     * Pass as prop to DataComponentWrapper if necessary
     * 
     * Write here which variables that when their value is changed will trigger the data to be transformed:
     *  - joinType
     *  - onCol
     *  - leftSuffix
     *  - rightSuffix
     * Pass these variables as an array using the targetDataDeps prop to DataComponentWrapper
     * 
     * 
     * 
     * @param {String} sourceData - A JSON formatted string containing the data to be transformed
     * @param {Function} updateTargetState - A function to be called in order to update target state. Most likely a
     *                                setState function.
     */
    function transformTargetData(sourceData, updateTargetState, pyodide, isPyodideLoaded) {
        if(sourceData) {
            
            // Load Python function
            if (isPyodideLoaded) pyodide.runPython(join);
            else return;

            updateTargetState(pyodide.globals.get('join')(sourceData.charAt(0) === '{' ? `[${sourceData}]`: sourceData, onCol, joinType, leftSuffix, rightSuffix));
        }
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
            targetDataDeps={[joinType, onCol, leftSuffix, rightSuffix]}
            maxSources={2}
        >   
            <div className="d-flex">
                <Form.Label className="align-self-start" htmlFor={`join-type-select-${compID}`}>Type of Join:</Form.Label>
            </div>
            <Form.Select
                id={`join-type-select-${compID}`}
                value={joinType}
                onChange={e => updateJoinType(e.target.value)}
                className="mb-2"
                onMouseOver={handleOnMouseOver}
                onMouseOut={handleOnMouseOut}
            >
                <option value="left">Left</option>
                <option value="right">Right</option>
                <option value="outer">Outer</option>
                <option value="inner">Inner</option>
                <option value="cross">Cross</option>
            </Form.Select>

            {
                columns &&
                <div>
                    <div className="d-flex">
                        <Form.Label className="align-self-start" htmlFor={`on-col-select-${compID}`}>Join On:</Form.Label>
                    </div>
                    <Form.Select
                        id={`on-col-select-${compID}`}
                        value={onCol} className="mb-2"
                        onChange={e => updateOnCol(e.target.value)}
                        onMouseOver={handleOnMouseOver}
                        onMouseOut={handleOnMouseOut}
                    >
                        {columns.map(col => <option key={col} value={col}>{col}</option>)}
                    </Form.Select>

                    <div className="d-flex">
                        <Form.Label className="align-self-start" htmlFor={`left-suffix-${compID}`}>Left Suffix:</Form.Label>
                    </div>
                    <Form.Control 
                        type="text"
                        id={`left-suffix-${compID}`}
                        value={leftSuffix} 
                        onChange={e => updateLeftSuffix(e.target.value)}
                        onMouseOver={handleOnMouseOver}
                        onMouseOut={handleOnMouseOut}
                    />

                    <div className="d-flex mt-2">
                        <Form.Label className="align-self-start" htmlFor={`right-suffix-${compID}`}>Right Suffix:</Form.Label>
                    </div>
                    <Form.Control   
                        type="text"
                        id={`right-suffix-${compID}`}
                        value={rightSuffix}
                        onChange={e => updateRightSuffix(e.target.value)}
                        onMouseOver={handleOnMouseOver}
                        onMouseOut={handleOnMouseOut}
                    />
                </div>
            }
            
        </DataComponentWrapper>

    );
};

export default Join;
import React, { useState } from 'react';

// import other utility component(s)
import DataComponentWrapper from '../utilities/DataComponentWrapper';
import { Form } from 'react-bootstrap';

// import Python function(s)
import join from '../../python_code_js_modules/join';


const Join = ({compID, cardTitle, iconClassNames}) => {

    // Type of Join
    const [joinType, setJoinType] = useState('inner');

    // Common columns between both dataframes
    const [columns, setColumns] = useState(null);

    // Column to join data on
    const [onCol, setOnCol] = useState('');

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
            setColumns(null);
            setOnCol('');
            updateTargetState(null);
        } else {

            const sourceArray = JSON.parse(sourceData);

            // Load Python function
            if (isPyodideLoaded) pyodide.runPython(join);
            else return;

            if (!Array.isArray(sourceArray)) {
                setColumns(sourceArray.columns);

                const onColumn = !sourceArray.columns.includes(onCol) ? sourceArray.columns[0] : onCol;
                setOnCol(onColumn);

                // Call python function and sets new targetDataJSONStr state
                updateTargetState(pyodide.globals.get('join')(`[${JSON.stringify(sourceArray)}]`, onColumn, joinType));

            } else {
                const columnsA = sourceArray[0].columns;
                let columnsB = [];
                let onColumn = onCol;

                if (sourceArray.length === 2) {
                    columnsB = sourceArray[1].columns;
                    const updatedColumns = [...new Set(columnsA.filter(col => columnsB.includes(col)))]
                    setColumns(updatedColumns);
                    onColumn = updatedColumns.includes(onCol) ? onCol : updatedColumns[0];

                } else {
                    setColumns(columnsA);
                    onColumn = columnsA.includes(onCol) ? onCol : columnsA[0];
                };

                setOnCol(onColumn);
                // Call python function and sets new targetDataJSONStr state
                updateTargetState(pyodide.globals.get('join')(sourceData, onColumn, joinType));
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
            const sourceArray = JSON.parse(sourceData);

            // Load Python function
            if (isPyodideLoaded) pyodide.runPython(join);
            else return;

            if (!Array.isArray(sourceArray)) {
                // Call python function and sets new targetDataJSONStr state
                updateTargetState(pyodide.globals.get('join')(`[${JSON.stringify(sourceArray)}]`, onCol, joinType));

            } else {
                // Call python function and sets new targetDataJSONStr state
                updateTargetState(pyodide.globals.get('join')(sourceData, onCol, joinType));
            }
        }
    }

    return (

        <DataComponentWrapper 
            compID={compID}
            cardTitle={cardTitle}
            iconClassNames={iconClassNames}
            updateTargetData={updateTargetData}
            transformTargetData={transformTargetData}
            targetDataDeps={[joinType, onCol]}
            maxSources={2}
        >   
            <div className="d-flex">
                <Form.Label className="align-self-start" htmlFor={`type-join-select-${compID}`}>Type of Join:</Form.Label>
            </div>
            <Form.Select id={`join-type-select-${compID}`} value={joinType} onChange={e => setJoinType(e.target.value)} className="mb-2">
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
                    <Form.Select id={`on-col-select-${compID}`} value={onCol} className="mb-2" onChange={e => setOnCol(e.target.value)}>
                        {columns.map(col => <option key={col} value={col}>{col}</option>)}
                    </Form.Select>
                </div>
            }
            
        </DataComponentWrapper>

    );
};

export default Join;
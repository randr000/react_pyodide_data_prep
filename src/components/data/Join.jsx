import React, { useState, useEffect } from 'react';

// import other utility component(s)
import DataComponentWrapper from '../utilities/DataComponentWrapper';
import { Form } from 'react-bootstrap';

// import Python function(s)
// import filter_cols from '../../python_code_js_modules/filter_cols';


const Join = ({compID, cardTitle, iconClassNames}) => {

    // Type of Join
    const [joinType, setJoinType] = useState('left');

    // Common columns between both dataframes
    const [columns, setColumns] = useState(null);

    // Column to join data on
    const [onCol, setOnCol] = useState(null);

    useEffect(() => console.log(`joinType: ${joinType}`), [joinType]);
    useEffect(() => console.log(`onCol: ${onCol}`), [onCol]);

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
            setOnCol(null);
            updateTargetState(null);
        } else {
            const sourceArray = JSON.parse(sourceData);
            // console.log(`sourceArray: ${sourceArray}`)
            // console.log(`sourceArray: ${JSON.stringify(sourceArray)}`)
            // const columnsA = sourceArray[0]['columns'];
            // console.log(`colA: ${columnsA}`)
            // let columnsB = [];
            // if (sourceArray.length === 2) columnsB = sourceArray[1]['columns'];
            // console.log(`colB: ${columnsB}`)
            // setColumns([...new Set(...columnsA, ...columnsB)]);
            // console.log(`sourceArray0: ${sourceArray[0]}`)
            // console.log(`sourceArray1: ${sourceArray.length === 2 && sourceArray[1]}`)

            if (!Array.isArray(sourceArray)) setColumns(sourceArray.columns);
            else {
                const columnsA = sourceArray[0].columns;
                let columnsB = [];
                if (sourceArray.length === 2) columnsB = sourceArray[1].columns;
                setColumns([...new Set([...columnsA, ...columnsB])]);
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
        return;
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
            <Form.Select id={`type-join-select-${compID}`} onChange={e => setJoinType(e.target.value)} className="mb-2">
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
                    <Form.Select id={`on-col-select-${compID}`} className="mb-2" onChange={e => setOnCol(e.target.value)}>
                        {columns.map(col => <option key={col} value={col}>{col}</option>)}
                    </Form.Select>
                </div>
            }
            
        </DataComponentWrapper>

    );
};

export default Join;
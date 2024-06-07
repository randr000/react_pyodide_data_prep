import React, { useState, useEffect } from "react";

// import other utility component(s)
import DataComponentWrapper from "../utilities/DataComponentWrapper";
import LinearRegressionModal from "../utilities/LinearRegressionModal";
import { Button, Form } from "react-bootstrap";

// import custom hooks
import useGetContexts from "../../custom-hooks/useGetContexts";
import useGetDataComponentLocalState from '../../custom-hooks/useGetDataComponentLocalState';
import useGetComponentSourceData from "../../custom-hooks/useGetComponentSourceData";

// import Python function(s)
import train_linear_regression from '../../python_code_js_modules/train_linear_regression';
import predict from '../../python_code_js_modules/predict';

const LinearRegression = ({compID, cardTitle, iconClassNames}) => {

    const {appState, dispatch, pyodide, isPyodideLoaded} = useGetContexts();
    const {isDragging} = appState;

    const {localState, updateLocalState} = useGetDataComponentLocalState(compID);
    const {autoTrainModel, xCols, yCol, testSize, randomState, mae, mse, r2, coef, pickledModel} = localState;

    const sourceDataStr = useGetComponentSourceData(compID);

    const [showModal, setShowModal] = useState(false);

    function resetLocalState() {
        return {
            autoTrainModel: false,
            xCols: [],
            yCol: '',
            mae: null,
            mse: null,
            r2: null,
            coef: [],
            pickledModel: null
        };
    }

    function trainModel(
        sourceData,
        xCols,
        yCol,
        testSize,
        randomState,
        pyodide,
        isPyodideLoaded
    ) {
        if (isPyodideLoaded) {
            // Load python function
            pyodide.runPython(train_linear_regression);
            const xColArr = xCols.map(col => col.isChecked && col.label);
            // Run Python function and update local state
            updateLocalState(JSON.parse(pyodide.globals.get('train_linear_regression')(sourceData, xColArr, yCol, testSize, randomState)));
            console.log('Model has been trained');
        }
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
    // function updateTargetData(sourceData, updateTargetState, pyodide, isPyodideLoaded) {
    //     if (!sourceData) {
    //         updateLocalState(resetLocalState());
    //     }
    //     else {
    //         const sourceDataObj = JSON.parse(sourceData);
    //         const xColsUpdate = sourceDataObj.columns.map(col => {
    //             const columnArr = xCols.filter(colObj => colObj.label === col);
    //             return {label: col, isChecked: columnArr.length ? columnArr[0].isChecked : false}
    //         });
            
    //         const yColUpdate = sourceDataObj.columns.includes(yCol) ? yCol : sourceDataObj.columns[0];
            
    //         updateLocalState({xCols: xColsUpdate, yCol: yColUpdate});
    //         console.log('source data updated')
    //         if (autoTrainModel) trainModel(sourceData, xColsUpdate, yColUpdate, testSize, randomState, pyodide, isPyodideLoaded);
    //     }
    // }

    useEffect(() => {
        if (!sourceDataStr) {
            updateLocalState(resetLocalState());
        }
        else {
            const sourceDataObj = JSON.parse(sourceDataStr);
            const xColsUpdate = sourceDataObj.columns.map(col => {
                const columnArr = xCols.filter(colObj => colObj.label === col);
                return {label: col, isChecked: columnArr.length ? columnArr[0].isChecked : false}
            });
            
            const yColUpdate = sourceDataObj.columns.includes(yCol) ? yCol : sourceDataObj.columns[0];
            
            updateLocalState({xCols: xColsUpdate, yCol: yColUpdate});
            console.log('source data updated')
            if (autoTrainModel) trainModel(sourceDataStr, xColsUpdate, yColUpdate, testSize, randomState, pyodide, isPyodideLoaded);
        }
    }, [sourceDataStr]);

    function handleSwitchOnChange() {
        if (isDragging) return;
        updateLocalState({autoTrainModel: !autoTrainModel});
    }

    function handleIconOnClick() {
        if (isDragging) return;
        setShowModal(true);
    }

    function handleTrainOnClick() {
        trainModel();
    }

    return (
        <DataComponentWrapper
            compID={compID}
            cardTitle={cardTitle}
            iconClassNames={iconClassNames}
            iconOnClick={handleIconOnClick}
            // updateTargetData={updateTargetData}
            canHaveTargets={false}
            canHaveDownloadPill={false}
            canHaveTablePill={false}
        >
            <div className="d-flex justify-content-between">
                <Button onClick={handleTrainOnClick} disabled={autoTrainModel} variant="primary">Train</Button>
                <Form>
                    <Form.Label htmlFor={`auto-train-switch-${compID}`} className="fw-bold">Auto Train</Form.Label>
                    <Form.Switch id={`auto-train-switch-${compID}`} onChange={handleSwitchOnChange} checked={autoTrainModel}></Form.Switch>
                </Form>
            </div>
            <div className="mt-3">
                <h2 className="small">Mean Absolute Error:</h2>
                <p className="small">{mae || "Train Model"}</p>
                <h2 className="small">Mean Squared Error:</h2>
                <p className="small">{mse || "Train Model"}</p>
                <h2 className="small">R2 Score:</h2>
                <p className="small">{r2 || "Train Model"}</p>
                <h2 className="small">Coefficients:</h2>
                {   
                    xCols.filter(col => col.isChecked).length ?
                    xCols.map((col, idx) => {
                        if (col.isChecked) return (
                            <div key={`${col.label}-${idx}`} className="d-flex justify-content-between">
                                <p className="small">{`${col.label}:`}</p>
                                <p className="small">{coef[idx] || "Train Model"}</p>
                            </div>
                        );
                    }) : "Train Model"
                }
                <Form>
                    <Form.Label htmlFor="bedrooms">Bedrooms:</Form.Label>
                    <Form.Control id="bedrooms" type="number"></Form.Control>
                    <Form.Label htmlFor="bathrooms">Bathrooms:</Form.Label>
                    <Form.Control id="bathrooms" type="number"></Form.Control>
                </Form>
                <h2 className="small mt-2">Prediction:</h2>
                <p className="small">test</p>
            </div>
            <LinearRegressionModal compID={compID} show={showModal} setShow={setShowModal} />
        </DataComponentWrapper>
    );
};

export default LinearRegression;
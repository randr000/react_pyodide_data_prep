import React, { useState, useEffect } from "react";
import APP_ACTION_TYPES from "../../action-types/appActionTypes";

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
    const [predictionVariables, setPredictionVariables] = useState({
        columns: [], index: [], data: [[]]
    });

    const [isTrainingErr, setIsTrainingErr] = useState(false);
    const [prediction, setPrediction] = useState('');
    const [isPredictionErr, setIsPredictionErr] = useState(false);

    function resetLocalState() {
        setPrediction('');
        setIsPredictionErr(false);
        setIsTrainingErr(false);
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

    function trainModel(sourceData, xCols, yCol) {
        try {
            if (isPyodideLoaded) {
            // Load python function
            pyodide.runPython(train_linear_regression);
            const xColArr = xCols.map(col => col.isChecked && col.label);
            // Run Python function and update local state
            updateLocalState(JSON.parse(pyodide.globals.get('train_linear_regression')(sourceData, xColArr, yCol, testSize, randomState)));
            }
            setIsTrainingErr(false);
        } catch (error) {
            console.log(error);
            setIsTrainingErr(true);
        }

    }

    function makePrediction() {
        try {
            if(isPyodideLoaded && pickledModel && !predictionVariables.data[0].filter(v => !v && v !== 0).length) {
                // Load python function
                pyodide.runPython(predict);
    
                // Run python function
                setPrediction(JSON.parse(pyodide.globals.get('predict')(pickledModel, JSON.stringify(predictionVariables))).prediction);

                setIsPredictionErr(false);
            }
        } catch (error) {
            setIsPredictionErr(true);
            console.log(`Prediction Error: ${error}`);
        }
    }

    function handleSwitchOnChange() {
        if (isDragging) return;
        updateLocalState({autoTrainModel: !autoTrainModel});
    }

    function handleIconOnClick() {
        if (isDragging) return;
        setShowModal(true);
    }

    function handleTrainOnClick() {
        if (isDragging) return;
        trainModel(sourceDataStr, xCols, yCol);
    }

    function handleOnMouseOver() {
        dispatch({type: APP_ACTION_TYPES.TOGGLE_IS_DRAGGING_DISABLED, payload: true});
    }

    function handleOnMouseOut() {
        dispatch({type: APP_ACTION_TYPES.TOGGLE_IS_DRAGGING_DISABLED, payload: false});
    }

    function handlePredictionVariableOnChange(event, index) {
        setPredictionVariables(prev => {
            const curr = {...prev};
            curr.data[0][index] = event.target.value;
            return curr;
        });
    }

    // Updates local state variables when source data changes
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
            if (autoTrainModel) trainModel(sourceDataStr, xColsUpdate, yColUpdate);
        }
    }, [sourceDataStr]);

    // Run training if any training parameters are changed and auto training is turned on
    useEffect(() => {
        if (autoTrainModel && sourceDataStr) trainModel(sourceDataStr, xCols, yCol);
    }, [xCols, yCol, testSize, randomState, autoTrainModel]);

    // Update prediction variables json string when xCols changes
    useEffect(() => {
        setPredictionVariables(prev => {
            const columns = [];
            const data = [[]];
            xCols.forEach((col, idx) => {
                if (col.isChecked) {
                    columns.push(col.label);
                    if (prev.columns.includes(col.label)) {
                        data[0].push(prev.data[0][idx]);
                    } else data[0].push(null); 
                }
            });
            return {
                ...prev,
                columns: columns,
                index: Array.from({length: columns.length}, (_, i) => i),
                data: data
            }
        });
    }, [xCols]);

    // Make prediction when prediction variables change or new pickled model is created
    useEffect(() => {
        makePrediction();
    }, [predictionVariables, pickledModel]);

    return (
        <DataComponentWrapper
            compID={compID}
            cardTitle={cardTitle}
            iconClassNames={`${iconClassNames} ${pickledModel && !isTrainingErr ? "text-success" : isTrainingErr ? "text-danger" : ""}`}
            iconOnClick={handleIconOnClick}
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
                <p className="small">{mae || mae === 0 ? mae.toLocaleString(undefined, {minimumFractionDigits: 2}) : "Train Model"}</p>
                <h2 className="small">Mean Squared Error:</h2>
                <p className="small">{mse || mse === 0 ? mse.toLocaleString(undefined, {minimumFractionDigits: 2}) : "Train Model"}</p>
                <h2 className="small">R2 Score:</h2>
                <p className="small">{r2 || r2 === 0 ? r2.toLocaleString(undefined, {minimumFractionDigits: 2}) : "Train Model"}</p>
                <h2 className="small">Coefficients:</h2>
                {   
                    xCols.filter(col => col.isChecked).length ?
                    xCols.map((col, idx) => {
                        if (col.isChecked) return (
                            <div key={`${col.label}-${idx}`} className="d-flex justify-content-between">
                                <p className="small">{`${col.label}:`}</p>
                                <p className="small">{coef[idx] || coef[idx] === 0 ? coef[idx].toLocaleString(undefined, {minimumFractionDigits: 2}) : "Train Model"}</p>
                            </div>
                        );
                    }) : "Train Model"
                }
                <Form>
                    {
                        xCols.map((col, idx) => {
                            if (col.isChecked) return (
                                <div key={`${col.label}-${compID}`}>
                                    <Form.Label htmlFor={`${col.label}-${compID}`}>{`${col.label}:`}</Form.Label>
                                    <Form.Control
                                        id={`${col.label}-${compID}`}
                                        type="number"
                                        onChange={e => handlePredictionVariableOnChange(e, idx)}
                                        onMouseOver={handleOnMouseOver}
                                        onMouseOut={handleOnMouseOut}
                                        defaultValue={null}
                                    />
                                </div>
                            );
                        })
                    }
                </Form>
                <h2 className="small mt-2">Prediction:</h2>
                <p className={`small ${isPredictionErr ? "text-danger fw-bold" : ""}`}>{isPredictionErr ? "Error making prediction" : prediction.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
            </div>
            <LinearRegressionModal compID={compID} show={showModal} setShow={setShowModal} />
        </DataComponentWrapper>
    );
};

export default LinearRegression;
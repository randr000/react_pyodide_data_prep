import React, { useState, useEffect } from "react";

// import other utility component(s)
import DataComponentWrapper from "../utilities/DataComponentWrapper";
import LinearRegressionModal from "../utilities/LinearRegressionModal";
import { Button, Form } from "react-bootstrap";

// import custom hooks
import useGetContexts from "../../custom-hooks/useGetContexts";
import useGetDataComponentLocalState from '../../custom-hooks/useGetDataComponentLocalState';

const LinearRegression = ({compID, cardTitle, iconClassNames}) => {

    const {appState, dispatch, pyodide, isPyodideLoaded} = useGetContexts();
    const {isDragging} = appState;

    const {localState, updateLocalState} = useGetDataComponentLocalState(compID);
    const {autoTrainModel, xCols, yCol, testSize, randomState, mae, mse, r2, coef, pickledModel} = localState;

    const [showModal, setShowModal] = useState(false);

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

        }
        else {
  
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
        return;
    }

    return (
        <DataComponentWrapper
            compID={compID}
            cardTitle={cardTitle}
            iconClassNames={iconClassNames}
            iconOnClick={handleIconOnClick}
            updateTargetData={updateTargetData}
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
                <p className="small">{mae}test</p>
                <h2 className="small">Mean Squared Error:</h2>
                <p className="small">{mse}test</p>
                <h2 className="small">R2 Score:</h2>
                <p className="small">{r2}test</p>
                <h2 className="small">Coefficients:</h2>
                <div className="d-flex justify-content-between">
                    <p className="small">bedrooms</p>
                    <p className="small">{coef[0]}test</p>
                </div>
                <div className="d-flex justify-content-between">
                    <p className="small">bathrooms</p>
                    <p className="small">{coef[1]}test</p>
                </div>
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
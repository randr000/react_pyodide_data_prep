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
    const {autoTrainModel, xCols, yCol, testSize, randomState, mae, mse, r2, pickledModel} = localState;

    const [test, setTest] = useState(false);
    useEffect(() => {
        console.log(`test ${test}`);
    }, [test]);

    const [showModal, setShowModal] = useState(false);

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
            canHaveTargets={false}
            canHaveDownloadPill={false}
            canHaveTablePill={false}
        >
            <div className="d-flex justify-content-between">
                <Button onClick={handleTrainOnClick} disabled={test} variant="primary">Train</Button>
                <Form>
                    <Form.Label htmlFor={`auto-train-switch-${compID}`} className="fw-bold">Auto Train</Form.Label>
                    <Form.Switch id={`auto-train-switch-${compID}`} onChange={() => setTest(p => !p)}></Form.Switch>
                </Form>
            </div>
            <LinearRegressionModal compID={compID} show={showModal} setShow={setShowModal} />
        </DataComponentWrapper>
    );
};

export default LinearRegression;
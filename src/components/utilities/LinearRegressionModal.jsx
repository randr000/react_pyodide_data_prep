import React, { useState } from "react";
import useGetContexts from "../../custom-hooks/useGetContexts";
import APP_ACTION_TYPES from "../../action-types/appActionTypes";
import { Modal, Button, Form } from "react-bootstrap";
import Checkboxes from "./Checkboxes";
import useGetDataComponentLocalState from "../../custom-hooks/useGetDataComponentLocalState";

const LinearRegressionModal = ({compID, show, setShow}) => {

    const {appState, dispatch} = useGetContexts();
    const {localState, updateLocalState} = useGetDataComponentLocalState(compID);
    const {xCols, yCol, testSize, randomState} = localState;

    // const [pendingXCols, setPendingXCols] = useState(xCols);
    const [pendingXCols, setPendingXCols] = useState([{label: "bathrooms", isChecked: true},{label: "bedrooms", isChecked: true},{label: "price", isChecked: false}]);
    const [pendingYCol, setPendingYCol] = useState(yCol);
    const [pendingTestSize, setPendingTestSize] = useState(testSize)
    const [pendingRandomState, setPendingRandomState] = useState(randomState);

    function handleClose() {setShow(false)}

    function handleOnHide() {
        handleClose();
    }

    function handleSaveChanges() {
        updateLocalState({
            xCols: pendingXCols,
            yCol: pendingYCol,
            testSize: pendingTestSize,
            randomState: pendingRandomState
        });
        handleClose();
    }

    function handleDiscardChanges() {
        setPendingXCols(xCols);
        setPendingYCol(yCol);
        setPendingTestSize(testSize);
        setPendingRandomState(randomState);
        handleClose();
    }

    function handleCheckBoxChange(label, isChecked) {
        const temp = pendingXCols.map(cb => {
            if (cb.label === label) return {label: label, isChecked: isChecked};
            else return cb;
        })
        setPendingXCols(temp);
    }

    return (
        <div id={`linear-regression-modal-${compID}`}>
            <Modal show={show} onHide={handleOnHide}>
                <Modal.Body>
                    <Form>
                        <Form.Label htmlFor={`lr-modal-test-size-${compID}`} className="mt-1 fs-5">Test Size:</Form.Label>
                        <Form.Control id={`lr-modal-test-size-${compID}`} type="number" onChange={e => setPendingTestSize(e.target.value)}/>
                        <Form.Label htmlFor={`lr-modal-random-state-${compID}`} className="mt-1 fs-5">Random State:</Form.Label>
                        <Form.Control id={`lr-modal-random-state-${compID}`} type="number" onChange={e => setPendingRandomState(e.target.value)}/>
                        <Form.Label className="mt-1 fs-5">X Columns:</Form.Label>
                        <Checkboxes checkboxes={pendingXCols} onChange={handleCheckBoxChange} />
                        <Form.Label htmlFor={`lr-modal-y-col-${compID}`} className="mt-1 fs-5">Y Col:</Form.Label>
                        <Form.Select
                            id={`lr-modal-y-col-${compID}`}
                            value={pendingYCol}
                            onChange={e => setPendingYCol(e.target.value)}
                            className=""
                        >
                            {pendingXCols.map(c => <option key={c.label} value={c.label}>{c.label}</option>)}
                        </Form.Select>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
                    <Button variant="danger" onClick={handleDiscardChanges}>Discard Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default LinearRegressionModal;
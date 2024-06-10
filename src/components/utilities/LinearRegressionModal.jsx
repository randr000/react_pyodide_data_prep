import React, { useEffect, useState } from "react";
import useGetContexts from "../../custom-hooks/useGetContexts";
import APP_ACTION_TYPES from "../../action-types/appActionTypes";
import { Modal, Button, Form } from "react-bootstrap";
import Checkboxes from "./Checkboxes";
import useGetDataComponentLocalState from "../../custom-hooks/useGetDataComponentLocalState";

const LinearRegressionModal = ({compID, show, setShow}) => {

    const {dispatch} = useGetContexts();
    const {localState, updateLocalState} = useGetDataComponentLocalState(compID);
    const {xCols, yCol, testSize, randomState} = localState;

    const [pendingXCols, setPendingXCols] = useState(xCols);
    const [pendingYCol, setPendingYCol] = useState(yCol);
    const [pendingTestSize, setPendingTestSize] = useState(testSize)
    const [pendingRandomState, setPendingRandomState] = useState(randomState);

    // Make sure testSize is always between .1 and .9 inclusive
    useEffect(() => {
        if (pendingTestSize < .1) setPendingTestSize(.1);
        else if (pendingTestSize > .9) setPendingTestSize(.9);
    }, [pendingTestSize]);

    // Make sure random state is always an int
    useEffect(() => {
        setPendingRandomState(prev => Math.round(prev));
    }, [pendingRandomState]);

    // Update pendingXCols anytime there is a change to xCols
    useEffect(() => {
        setPendingXCols(xCols);
    }, [xCols]);

    // Update pendingYCol anytime there is a change to yCol
    useEffect(() => {
        setPendingYCol(yCol);
    }, [yCol]);

    function handleClose() {
        setShow(false);
        handleOnMouseOut();
    }

    function handleOnMouseOver() {
        dispatch({type: APP_ACTION_TYPES.TOGGLE_IS_DRAGGING_DISABLED, payload: true});
    }

    function handleOnMouseOut() {
        dispatch({type: APP_ACTION_TYPES.TOGGLE_IS_DRAGGING_DISABLED, payload: false});
    }

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
        const xColsUpdate = pendingXCols.map(cb => {
            if (cb.label === label) return {label: label, isChecked: isChecked};
            else return cb;
        })
        setPendingXCols(xColsUpdate);
    }

    return (
        <div id={`linear-regression-modal-${compID}`} onMouseOver={handleOnMouseOver} onMouseOut={handleOnMouseOut}>
            <Modal show={show} onHide={handleOnHide}>
                <Modal.Body>
                    <Form>
                        <Form.Label htmlFor={`lr-modal-test-size-${compID}`} className="mt-1 fs-5">Test Size (.1 - .9):</Form.Label>
                        <Form.Control id={`lr-modal-test-size-${compID}`} type="number" onChange={e => setPendingTestSize(Number(e.target.value))} defaultValue={pendingTestSize || .2}/>
                        <Form.Label htmlFor={`lr-modal-random-state-${compID}`} className="mt-1 fs-5">Random State:</Form.Label>
                        <Form.Control id={`lr-modal-random-state-${compID}`} type="number" onChange={e => setPendingRandomState(Number(e.target.value))} defaultValue={pendingRandomState || 1}/>
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
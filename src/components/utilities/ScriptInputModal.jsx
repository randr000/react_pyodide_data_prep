import React, { useState } from "react";
import useGetContexts from "../../custom-hooks/useGetContexts";
import APP_ACTION_TYPES from "../../action-types/appActionTypes";
import { Modal, Button, Form } from "react-bootstrap";

const ScriptInputModal = ({compID, body, setBody, showModal, setShowModal}) => {

    const {dispatch} = useGetContexts();

    const [pythonCode, setPythonCode] = useState(body);

    function handleClose() {setShowModal(false)}

    function handleOnMouseOver() {
        dispatch({type: APP_ACTION_TYPES.TOGGLE_IS_DRAGGING_DISABLED, payload: true});
    }

    function handleOnMouseOut() {
        dispatch({type: APP_ACTION_TYPES.TOGGLE_IS_DRAGGING_DISABLED, payload: false});
    }

    function handleSaveChanges() {
        setBody(pythonCode);
        handleClose();
    }

    function handleDiscardChanges() {
        setPythonCode(body);
        handleClose();
    }

    return (
        <div className="modal show" style={{display: "block", position: "initial"}}>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Body>
                    <div className="d-flex mt-2">
                        <Form.Label className="align-self-start" htmlFor={`python-script-${compID}`}>Python Code:</Form.Label>
                    </div>
                    <Form.Control   
                        as="textarea"
                        id={`python-script-${compID}`}
                        value={pythonCode}
                        onChange={e => setPythonCode(e.target.value)}
                        onMouseOver={handleOnMouseOver}
                        onMouseOut={handleOnMouseOut}
                        spellCheck={false}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
                    <Button variant="danger" onClick={handleDiscardChanges}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ScriptInputModal;
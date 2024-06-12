import React, { useState } from "react";
import useGetContexts from "../../custom-hooks/useGetContexts";
import APP_ACTION_TYPES from "../../action-types/appActionTypes";
import { Modal, Button, Form } from "react-bootstrap";
import { Editor } from "@monaco-editor/react";

const ScriptInputModal = ({compID, body, updateBody, showModal, setShowModal, allowPlotting=false, setScriptingError, lineNumOffset=0}) => {

    const {dispatch} = useGetContexts();

    const [pythonCode, setPythonCode] = useState(body);

    function handleClose() {
        setShowModal(false);
        handleOnMouseOut();
    }

    function handleOnMouseOver() {
        dispatch({type: APP_ACTION_TYPES.TOGGLE_IS_DRAGGING_DISABLED, payload: true});
    }

    function handleOnMouseOut() {
        dispatch({type: APP_ACTION_TYPES.TOGGLE_IS_DRAGGING_DISABLED, payload: false});
    }

    function handleSaveChanges() {
        if (!allowPlotting && /^import matplotlib.*/.test(pythonCode)) {
            setScriptingError('An attempt to import matplotlib was detected. Plotting is not allowed while using this component. Please remove all matplotib references before continuing.');
        } else updateBody(pythonCode);
        handleClose();
    }

    function handleDiscardChanges() {
        setPythonCode(body);
        handleClose();
    }

    return (
        <div id={`script-modal-${compID}`} className="modal show" style={{display: "block", position: "initial"}} onMouseOver={handleOnMouseOver} onMouseOut={handleOnMouseOut}>
            <Modal show={showModal} onHide={handleDiscardChanges} size="xl">
                <Modal.Body>
                    <div className="d-flex mt-2">
                        <Form.Label className="align-self-start" htmlFor={`python-script-${compID}`}>Enter Python Code:</Form.Label>
                    </div>
                    <Editor
                        id={`python-script-${compID}`}
                        height="80vh"
                        defaultLanguage="python"
                        value={pythonCode ? pythonCode : ""}
                        defaultValue={pythonCode}
                        theme="vs-dark"
                        onChange={value => setPythonCode(value)}
                        options={{lineNumbers: n => n + lineNumOffset}}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
                    <Button variant="danger" onClick={handleDiscardChanges}>Discard Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ScriptInputModal;
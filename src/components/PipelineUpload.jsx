import React, { useState, useContext } from "react";
import { Form } from 'react-bootstrap';
import AppDataContext from "../context/AppDataContext";
import APP_ACTION_TYPES from "../action-types/appActionTypes";

const PipelineUpload = () => {

    const {dispatch} = useContext(AppDataContext);

    const [inputTextColor, setInputTextColor] = useState('');

    /**
     * Handles when file is uploaded through browsing insted of drag and drop
     * @param {event} event - DOM event
     */
    function handleChange(event) {
        const uploadedFile = event.target.files[0];
        processUploadedFile(uploadedFile);
    }

    /**
     * Handles when file is uploaded using drag and drop
     * @param {event} event - DOM event
     */
    function handleDrop(event) {
        const uploadedFile = event.dataTransfer.files[0];
        processUploadedFile(uploadedFile);
    }

    /**
     * Checks if uploaded file is of the correct type and update component state
     * and styles accordingly.
     * @param {object} file - object representing file that was uploaded by user 
     */
    function processUploadedFile(file) {

        const fr = new FileReader();
        fr.onload = () => {
            try {
                const jsonObj = JSON.parse(fr.result);
                console.log(JSON.stringify(jsonObj, null, 4));
                processInitialState(jsonObj);
                setInputTextColor('text-success');
            } catch (error) {
                console.log('Error reading file. Please see docs for proper format.');
                console.log(error);
                setInputTextColor('text-danger');
            }
        };
        fr.readAsText(file);
    }

    /**
     * 
     * @param {Object} state - The state to be loaded as initial state for app
     */
    function processInitialState(state) {
        return;
        dispatch({
            type: APP_ACTION_TYPES.LOAD_INITIAL_STATE,
            payload: state
        });
    }

    return (
        <Form>
            <Form.Group>
                <Form.Label className="fs-5 fw-bold" htmlFor="pipeline-upload">Upload Saved Data Pipeline (Drag or Click):</Form.Label>
                <Form.Control className={`${inputTextColor} fw-bold`} id="pipeline-upload" type="file" onChange={handleChange} onDrop={handleDrop} />
            </Form.Group>
        </Form>
    );
};

export default PipelineUpload;
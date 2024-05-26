import React, { useState, useContext, useEffect } from "react";
import { Form } from 'react-bootstrap';
import AppDataContext from "../context/AppDataContext";
import APP_ACTION_TYPES from "../action-types/appActionTypes";

const PipelineUpload = ({pipelineUploadFormId}) => {

    const {appState, dispatch} = useContext(AppDataContext);
    const {isLoadingInitialState} = appState;

    const [inputTextColor, setInputTextColor] = useState('');
    const [file, setFile] = useState(null);


    useEffect(() => {
       if(isLoadingInitialState) processUploadedFile(file);
    }, [file]);

    /**
     * Handles when file is uploaded through browsing insted of drag and drop
     * @param {event} event - DOM event
     */
    function handleChange(event) {
        setFile(event.target.files[0]);
        dispatch({type: APP_ACTION_TYPES.IS_LOADING_INITIAL_STATE, payload: true});
    }

    /**
     * Handles when file is uploaded using drag and drop
     * @param {event} event - DOM event
     */
    function handleDrop(event) {
        setFile(event.dataTransfer.files[0]);
        dispatch({type: APP_ACTION_TYPES.IS_LOADING_INITIAL_STATE, payload: true});
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
                // console.log(`state2: ${JSON.stringify(fr.result, null, 4)}`)
                const jsonObj = JSON.parse(fr.result);
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

        state.components = state.components.map(comp => {
            if (comp[1].hasOwnProperty('sourceComponents')) comp[1].sourceComponents = new Set(comp[1].sourceComponents);
            if (comp[1].hasOwnProperty('outputComponents')) comp[1].outputComponents = new Set(comp[1].outputComponents);
            return comp;
        });

        state.arrows = state.arrows.map(arrow => [arrow[0], {...arrow[1], compIDs: new Set(arrow[1].compIDs)}]);

        const stateObj = {
            ...state,
            isLoadingInitialState: false,
            connectComponents: false,
            defaultX: 0,
            defaultY: 0,
            components: new Map(state.components),
            arrows: new Map(state.arrows)
        };


        dispatch({
            type: APP_ACTION_TYPES.LOAD_INITIAL_STATE,
            payload: {
                ...stateObj
            }
        });
    }

    return (
        <Form id={pipelineUploadFormId} onReset={() => setInputTextColor('')}>
            <Form.Group>
                <Form.Label className="fs-5 fw-bold" htmlFor="pipeline-upload">Upload Saved Data Pipeline (Drag or Click):</Form.Label>
                <Form.Control className={`${inputTextColor} fw-bold`} id="pipeline-upload" type="file" onChange={handleChange} onDrop={handleDrop} />
            </Form.Group>
        </Form>
    );
};

export default PipelineUpload;
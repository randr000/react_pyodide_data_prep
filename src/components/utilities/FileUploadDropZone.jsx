import React, { useState, useRef, useContext } from 'react';
import AppDataContext from '../../context/AppDataContext';

const FileUploadDropZone = ({
    file, setFile, ext, updateInvalidFileState, isInvalidFile, invalidFileMsg, uploadStyles, setUploadStyles}) => {

    const {appState, _} = useContext(AppDataContext);
    const {isDragging} = appState;

    const inputRef = useRef();

    /**
     * 
     * Changes border color to blue when file is dragged over
     * @param {object} event - DOM event
     */
    function handleDragOver(event) {
        event.preventDefault();
        setUploadStyles(styles => ({...styles, borderColor: "#0d6efd", borderStyle: "dashed"}));
    }

    /**
     * Changes border color to gray when file is not being dragged over anymore
     * unless valid file already uploaded. Changes back to green in that case.
     * @param {event} event - DOM event
     * @returns {void}
     */
    function handleDragLeave(event) {
        event.preventDefault();
        if (file) return setUploadStyles(styles => ({...styles, borderColor: "#28a745", borderStyle: "solid"}));
        setUploadStyles(styles => ({...styles, borderColor: "#6c757d"}));
    }

    /**
     * Handles when file is uploaded through browsing insted of drag and drop
     * @param {event} event - DOM event
     */
    function handleChange(event) {
        const uploadedFile = event.target.files[0];
        processUploadedFile(uploadedFile, ext);
    }

    /**
     * Handles when file is uploaded using drag and drop
     * @param {event} event - DOM event
     */
    function handleDrop(event) {
        event.preventDefault();
        const uploadedFile = event.dataTransfer.files[0];
        processUploadedFile(uploadedFile, ext);
    }

    /**
     * Checks if uploaded file is of the correct type and update component state
     * and styles accordingly.
     * @param {object} file - object representing file that was uploaded by user 
     * @param {string} ext - string representing the file extension the file must have.
     */
    function processUploadedFile(file) {

        const regex = new RegExp('(.*\.xlsx$|.*\.csv$|.*\.json$|.*\.txt$)', 'i');

        // Check if file is of correct type based on file extension
        if (regex.test(file.name)) {
            setFile(file);
            setUploadStyles(styles => ({...styles, borderColor: "#28a745", borderStyle: "solid"}));
            updateInvalidFileState();
        } else {
            setFile(null);
            setUploadStyles(styles => ({...styles, borderColor: "#dc3545", borderStyle: "dashed"}));
            updateInvalidFileState(true, 'Invalid filetype. Please make sure filename extension is equal to .csv, .xlsx, .txt, or .json!');
        }
    }

    return (
        <div
            className="card mb-2 cursor-pointer"
            style={uploadStyles}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !isDragging && inputRef.current.click()}
        >
            {
                isInvalidFile
                ? <i className="bi bi-file-earmark-x display-3 text-danger"></i>
                : file
                    ? <i className="bi bi-file-check display-3 text-success"></i>
                    : <i className="bi bi-file-earmark-arrow-up display-3"></i>
            }
            <p className="fs-5">{
                    file ?
                    file.name :
                    "Drag or click to browse"
                }
            </p>
            {isInvalidFile && <p className="fs-5 fw-bold text-danger">{invalidFileMsg}</p>}
            <input
                type="file"
                onChange={handleChange}
                hidden
                ref={inputRef}
            />
        </div>
    );
};

export default FileUploadDropZone;

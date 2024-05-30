import React, { useRef } from 'react';
import useGetContexts from '../../custom-hooks/useGetContexts';

const FileUploadDropZone = ({
    file,
    setFile,
    isInvalidFile,
    invalidFileMsg,
    uploadStyles,
    updateUploadStyles,
    updateLocalState
}) => {

    const {appState} = useGetContexts();
    const {isDragging} = appState;

    const inputRef = useRef();

    /**
     * 
     * Changes border color to blue when file is dragged over
     * @param {object} event - DOM event
     */
    function handleDragOver(event) {
        event.preventDefault();
        updateUploadStyles({borderColor: "#0d6efd", borderStyle: "dashed"});
    }

    /**
     * Changes border color to gray when file is not being dragged over anymore
     * unless valid file already uploaded. Changes back to green in that case.
     * @param {event} event - DOM event
     * @returns {void}
     */
    function handleDragLeave(event) {
        event.preventDefault();
        if (file) updateUploadStyles({borderColor: "#28a745", borderStyle: "solid"});
        else updateUploadStyles({borderColor: "#6c757d"});
    }

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
        event.preventDefault();
        const uploadedFile = event.dataTransfer.files[0];
        processUploadedFile(uploadedFile);
    }

    /**
     * Checks if uploaded file is of the correct type and update component state
     * and styles accordingly.
     * @param {object} file - object representing file that was uploaded by user 
     */
    function processUploadedFile(file) {

        const regex = new RegExp('(.*\.xlsx$|.*\.csv$|.*\.json$|.*\.txt$)', 'i');

        // Check if file is of correct type based on file extension
        if (regex.test(file.name)) {
            setFile(file);
            updateLocalState({
                isInvalidFile: false,
                invalidFileMsg: '',
                uploadStyles: {...uploadStyles, borderColor: "#28a745", borderStyle: "solid"},
                fileMetaData: {name: file.name}
            });
        } else {
            setFile(null);
            updateLocalState({
                isInvalidFile: true,
                invalidFileMsg: 'Invalid filetype. Please make sure filename extension is equal to .csv, .xlsx, .txt, or .json!',
                uploadStyles: {...uploadStyles, borderColor: "#dc3545", borderStyle: "dashed"},
                fileMetaData: {name: file.name}
            });
        }
    }

    return (
        <div
            className="card mb-2 cursor-pointer mx-3"
            style={uploadStyles}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !isDragging && inputRef.current.click()}
        >
            {
                isInvalidFile
                ? <i className="bi bi-file-earmark-x display-5 text-danger"></i>
                : file
                    ? <i className="bi bi-file-check display-5 text-success"></i>
                    : <i className="bi bi-file-earmark-arrow-up display-5"></i>
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

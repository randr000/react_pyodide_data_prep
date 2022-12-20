import React, { useState, useRef } from 'react';

const FileUpload = ({file, setFile, ext}) => {

    const [uploadStyles, setUploadStyles] = useState({
        borderWidth: "3px",
        borderStyle: "dashed",
        borderColor: "#6c757d"
    });

    const [isInvalidFile, setIsInvalidFile] = useState(false);

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
    function processUploadedFile(file, ext) {
        
        if (file.name.toLowerCase().endsWith(`.${ext}`)) {
            setFile(file);
            setUploadStyles(styles => ({...styles, borderColor: "#28a745", borderStyle: "solid"}));
            setIsInvalidFile(false);
        } else {
            setFile(null);
            setUploadStyles(styles => ({...styles, borderColor: "#dc3545", borderStyle: "dashed"}))
            setIsInvalidFile(true);
        }
    }

    return (
        <div
            className="card mb-2"
            style={uploadStyles}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => inputRef.current.click()}
        >
            {
                file ?
                <i className="bi bi-file-check display-3 text-success"></i> :
                <i className="bi bi-file-earmark-arrow-up display-3"></i>
            }
            <p className="fs-5">{
                    file ?
                    file.name :
                    "Drag or click to browse"
                }
            </p>
            {isInvalidFile && <p className="fs-5 fw-bold text-danger">File type must be {ext}</p>}
            <input
                type="file"
                onChange={handleChange}
                hidden
                ref={inputRef}
            />
        </div>
    );
};

export default FileUpload;

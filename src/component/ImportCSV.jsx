import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';

const ImportCSV = () => {

    const [file, setFile] = useState(null);
    
    const [uploadStyles, setUploadStyles] = useState({
        borderWidth: "3px",
        borderStyle: "dashed",
        borderColor: "#6c757d"
    });

    const [isInvalidFile, setIsInvalidFile] = useState(false);

    const inputRef = useRef();

    function handleDragOver(event) {
        event.preventDefault();
        setUploadStyles(styles => ({...styles, borderColor: "#0d6efd", borderStyle: "dashed"}));
        // console.log(event);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        if (file) return setUploadStyles(styles => ({...styles, borderColor: "#28a745", borderStyle: "solid"}))
        setUploadStyles(styles => ({...styles, borderColor: "#6c757d"}));
    }

    function handleChange(event) {
        const importedFile = event.target.files[0];

        if (isValidFile(importedFile.name, '.csv')) {
            setFile(importedFile);
            setUploadStyles(styles => ({...styles, borderColor: "#28a745", borderStyle: "solid"}));
            setIsInvalidFile(false);
        } else {
            setFile(null);
            setUploadStyles(styles => ({...styles, borderColor: "#dc3545", borderStyle: "dashed"}))
            setIsInvalidFile(true);
        }
    }

    function handleDrop(event) {
        event.preventDefault();
        const importedFile = event.dataTransfer.files[0];

        if (isValidFile(importedFile.name, '.csv')) {
            setFile(importedFile);
            setUploadStyles(styles => ({...styles, borderColor: "#28a745", borderStyle: "solid"}));
            setIsInvalidFile(false);
        } else {
            setFile(null);
            setUploadStyles(styles => ({...styles, borderColor: "#dc3545", borderStyle: "dashed"}))
            setIsInvalidFile(true);
        }
    }

    function isValidFile(fileName, ext) {
        return fileName.toLowerCase().endsWith(ext);
    }

    return (


        <Draggable bounds="parent">
            <div className="card border border-primary border-3" style={{width: "12rem"}}>
                <div className="card-body text-center">
                    <div
                        className="card"
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
                        {isInvalidFile && <p className="fs-5 fw-bold text-danger">File type must be csv</p>}
                        <input
                            type="file"
                            onChange={handleChange}
                            hidden
                            ref={inputRef}
                        />
                        {/* <button className="btn btn-primary">Browse</button> */}
                    </div>
                    <h5 className="card-title">Import CSV</h5>
                    <p className="card-text display-1" >
                        <i className="bi bi-filetype-csv"></i>
                    </p>
                </div>
            </div>
        </Draggable>
    );
};

export default ImportCSV;
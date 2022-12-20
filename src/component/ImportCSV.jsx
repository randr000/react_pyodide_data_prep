import React, { useState } from 'react';
import Draggable from 'react-draggable';
import FileUpload from './FileUpload';

const ImportCSV = () => {

    const [file, setFile] = useState(null);

    return (

        <Draggable bounds="parent">
            <div className="card border border-primary border-3" style={{width: "12rem"}}>
                <div className="card-body text-center">
                    
                    <span className="position-absolute top-0 start-50 translate-middle bg-white border border-primary rounded-pill fs-5">
                        <i className="bi bi-arrow-down"></i>
                    </span>

                    <h5 className="card-title mt-1">Import CSV</h5>
                    <p className="card-text display-1" >
                        <i className="bi bi-filetype-csv"></i>
                    </p>
                    
                    <FileUpload file={file} setFile={setFile} ext="csv" />

                    <span className="position-absolute top-100 start-50 translate-middle bg-white border border-primary rounded-pill fs-5">
                        <i className="bi bi-arrow-down"></i>
                    </span>
                </div>
            </div>
        </Draggable>
    );
};

export default ImportCSV;
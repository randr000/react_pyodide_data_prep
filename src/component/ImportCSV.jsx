import React, { useState } from 'react';
import Draggable from 'react-draggable';
import CardSummary from './CardSummary';
import FileUpload from './FileUpload';

const ImportCSV = () => {

    const [file, setFile] = useState(null);
    const cardTitle = 'Import CSV';
    const fileExtension = 'csv';
    const iconClassNames = 'bi bi-filetype-csv';

    return (

        <Draggable bounds="parent">
            <div className="card border border-primary border-3" style={{width: "12rem"}}>
                <div className="card-body text-center">
                    
                    <span className="position-absolute top-0 start-50 translate-middle bg-white border border-primary rounded-pill fs-5">
                        <i className="bi bi-arrow-down"></i>
                    </span>

                    <CardSummary cardTitle={cardTitle} iconClassNames={iconClassNames} />
                    
                    <FileUpload file={file} setFile={setFile} ext={fileExtension} />

                    <span className="position-absolute top-100 start-50 translate-middle bg-white border border-primary rounded-pill fs-5">
                        <i className="bi bi-arrow-down"></i>
                    </span>
                </div>
            </div>
        </Draggable>
    );
};

export default ImportCSV;
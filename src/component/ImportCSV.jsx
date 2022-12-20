import React, { useState } from 'react';
import Draggable from 'react-draggable';
import DataFlowPill from './DataFlowPill';
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
                    
                    <DataFlowPill isOnTop={true} />

                    <CardSummary cardTitle={cardTitle} iconClassNames={iconClassNames} />
                    
                    <FileUpload file={file} setFile={setFile} ext={fileExtension} />

                    <DataFlowPill isOnTop={false} />
                </div>
            </div>
        </Draggable>
    );
};

export default ImportCSV;
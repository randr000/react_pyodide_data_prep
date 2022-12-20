import React, { useState } from 'react';
import Draggable from 'react-draggable';
import DataFlowPill from './DataFlowPill';
import CardSummary from './CardSummary';
import FileUploadDropZone from './FileUploadDropZone';

const FileUpload = ({cardTitle, fileExtension, iconClassNames}) => {

    const [file, setFile] = useState(null);

    return (

        <Draggable bounds="parent">
            <div className="card border border-primary border-3" style={{width: "12rem"}}>
                <div className="card-body text-center">
                    
                    <DataFlowPill isOnTop={true} />

                    <CardSummary cardTitle={cardTitle} iconClassNames={iconClassNames} />
                    
                    <FileUploadDropZone file={file} setFile={setFile} ext={fileExtension} />

                    <DataFlowPill isOnTop={false} />
                </div>
            </div>
        </Draggable>
    );
};

export default FileUpload;
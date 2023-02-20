import React, { useState } from 'react';
import Xarrow from 'react-xarrows';
import FileUpload from './FileUpload';
import Filter from './Filter';

const TestComponentWrapper = () => {

    const [uploadedFile, setUploadedFile] = useState(null);

    return (
        <div>
                <FileUpload
                    cardTitle="Import CSV"
                    fileExtension="csv"
                    iconClassNames="bi bi-filetype-csv"
                    setUploadedFile={setUploadedFile}
                    
                />
                {
                    // uploadedFile &&
                    true &&
                    <Filter
                        jsonData={uploadedFile}
                        cardTitle="Filter"
                        iconClassNames="bi bi-funnel"
                        
                    />
                }
                <Xarrow
                    start="fileupload"
                    end="filter"
                    startAnchor="bottom"
                    endAnchor="top"
                    zIndex={-1}
                />
        </div>

    );
};

export default TestComponentWrapper;
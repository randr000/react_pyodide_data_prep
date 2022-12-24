import React, { useState } from 'react';
import FileUpload from './FileUpload';
import Filter from './Filter';

const TestComponentWrapper = () => {

    const [uploadedFile, setUploadedFile] = useState(null);
    // const [filterData, setFilterData] = useState();

    return (
        <div>
            <FileUpload
                cardTitle="Import CSV"
                fileExtension="csv"
                iconClassNames="bi bi-filetype-csv"
                setUploadedFile={setUploadedFile}
            />
            {
                uploadedFile && 
                <Filter
                    jsonData={uploadedFile}
                    cardTitle="Filter"
                    iconClassNames="bi bi-funnel"
                />
            }
        </div>
    );
};

export default TestComponentWrapper;
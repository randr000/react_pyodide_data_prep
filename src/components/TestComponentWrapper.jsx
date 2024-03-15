import React, { useState } from 'react';
import Xarrow from 'react-xarrows';
import FileUpload from './data/FileUpload';
import Filter from './data/Filter';
import FileDownload from './data/FileDownload';

const TestComponentWrapper = () => {

    const [uploadedFile, setUploadedFile] = useState(null);
    const [filteredData, setFilteredData] = useState(null);

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
                    // true &&
                    <>
                        <Filter
                            jsonData={uploadedFile}
                            cardTitle="Filter"
                            iconClassNames="bi bi-funnel"
                            setFilteredData={setFilteredData}
                        />

                        <FileDownload
                            cardTitle="Export CSV"
                            fileExtension="csv"
                            iconClassNames="bi bi-filetype-csv"
                            jsonData={filteredData}
                        />
                    
                        <Xarrow
                            start="fileupload"
                            end="filter-in"
                            startAnchor="bottom"
                            endAnchor="top"
                            zIndex={-1}
                        />

                        <Xarrow
                            start="filter-out"
                            end="export-csv"
                            startAnchor="bottom"
                            endAnchor="top"
                            zIndex={-1}
                        />
                    </>
                }
        </div>

    );
};

export default TestComponentWrapper;
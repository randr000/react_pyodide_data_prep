import React, { useState, useContext } from 'react';
import AppDataContext from '../context/AppDataContext';
import Xarrow from 'react-xarrows';
import FileUpload from './data/FileUpload';
import Filter from './data/Filter';
import FileDownload from './data/FileDownload';

const ContextTestComponentWrapper = () => {

    const [uploadedFile, setUploadedFile] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const {appState, dispatch} = useContext(AppDataContext);
    const {components, arrows} = appState;

    return (
        <>
            {components.map(c => c && c)}
        </>
        // <div>
        //         <FileUpload
        //             cardTitle="Import CSV"
        //             fileExtension="csv"
        //             iconClassNames="bi bi-filetype-csv"
        //             setUploadedFile={setUploadedFile}
        //         />
        //         {
        //             uploadedFile &&
        //             // true &&
        //             <>
        //                 <Filter
        //                     jsonData={uploadedFile}
        //                     cardTitle="Filter"
        //                     iconClassNames="bi bi-funnel"
        //                     setFilteredData={setFilteredData}
        //                 />

        //                 <FileDownload
        //                     cardTitle="Export CSV"
        //                     fileExtension="csv"
        //                     iconClassNames="bi bi-filetype-csv"
        //                     jsonData={filteredData}
        //                 />
                    
        //                 <Xarrow
        //                     start="fileupload"
        //                     end="filter-in"
        //                     startAnchor="bottom"
        //                     endAnchor="top"
        //                     zIndex={-1}
        //                 />

        //                 <Xarrow
        //                     start="filter-out"
        //                     end="export-csv"
        //                     startAnchor="bottom"
        //                     endAnchor="top"
        //                     zIndex={-1}
        //                 />
        //             </>
        //         }
        // </div>

    );
};

export default ContextTestComponentWrapper;
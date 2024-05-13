import React, { useState } from 'react';

// import custom hooks
import useGetContexts from '../../custom-hooks/useGetContexts';
import useDownloadData from '../../custom-hooks/useDownloadData';

// import other utility component(s)
import DataComponentWrapper from '../utilities/DataComponentWrapper';
import DownloadForm from '../utilities/DownloadForm';

const FileDownload = ({compID, cardTitle, iconClassNames}) => {

    const {appState} = useGetContexts();
    const {isDragging} = appState;

    const {downloadData, updateCheckedFileTypes, isCheckedFileType} = useDownloadData();

    // A JSON formatted string containing the source data
    const [sourceDataJSONStr, setSourceDataJSONStr] = useState(null);

    // Filename to use for downloaded file
    const [filename, setFilename] = useState(`${compID}-${cardTitle}`);

    /**
     * Updates the isCheckedFileType state by updatding the checked state of the file type name that was passed
     * 
     * @param {string} colName 
     * @param {boolean} isChecked 
     */
    function handleCheckboxChange(label, isChecked) {
        updateCheckedFileTypes(label, isChecked);
    }

    function handleIconClick() {
        if (isDragging) return;
        downloadData(sourceDataJSONStr, filename);
    }

    return (
       <DataComponentWrapper
        compID={compID}
        cardTitle={cardTitle}
        iconClassNames={iconClassNames}
        iconOnClick={handleIconClick}
        sourceDataJSONStr={sourceDataJSONStr}
        setSourceDataJSONStr={setSourceDataJSONStr}
        canHaveTargets={false}
        canHaveDownloadPill={false}
       >
            <DownloadForm
                isDragging={isDragging}
                filename={filename}
                setFilename={setFilename}
                handleCustomCheckboxChange={handleCheckboxChange}
                targetDataJSONStr={sourceDataJSONStr}
                includeDownloadBtn={false}
            />
       </DataComponentWrapper>
    );
};

export default FileDownload;
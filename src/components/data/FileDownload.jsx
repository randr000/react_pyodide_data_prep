import React, { useState } from 'react';

// import custom hooks
import useGetContexts from '../../custom-hooks/useGetContexts';
import useDownloadData from '../../custom-hooks/useDownloadData';
import useGetComponentSourceData from '../../custom-hooks/useGetComponentSourceData';

// import other utility component(s)
import DataComponentWrapper from '../utilities/DataComponentWrapper';
import DownloadForm from '../utilities/DownloadForm';

const FileDownload = ({compID, cardTitle, iconClassNames}) => {

    const {appState} = useGetContexts();
    const {isDragging} = appState;

    const {downloadData, updateCheckedFileTypes, isCheckedFileType} = useDownloadData();

    // const sourceData = components.get(compID).sourceComponents.size ? components.get([...components.get(compID).sourceComponents][0]).data : null;
    const sourceData = useGetComponentSourceData(compID);

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
        downloadData(sourceData, filename);
    }

    return (
       <DataComponentWrapper
        compID={compID}
        cardTitle={cardTitle}
        iconClassNames={iconClassNames}
        iconOnClick={handleIconClick}
        canHaveTargets={false}
        canHaveDownloadPill={false}
       >
            <DownloadForm
                isDragging={isDragging}
                filename={filename}
                setFilename={setFilename}
                handleCustomCheckboxChange={handleCheckboxChange}
                targetDataJSONStr={sourceData}
                includeDownloadBtn={false}
            />
       </DataComponentWrapper>
    );
};

export default FileDownload;
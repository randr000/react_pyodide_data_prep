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

    const {downloadData} = useDownloadData();

    // A JSON formatted string containing the source data
    const [sourceDataJSONStr, setSourceDataJSONStr] = useState(null);

    // A JSON formatted string containing the transformed data
    const [targetDataJSONStr, setTargetDataJSONStr] = useState(null);

    // Filename to use for downloaded file
    const [filename, setFilename] = useState(`${compID}-${cardTitle}`);

    // Keeps track of which download file type checkboxes are clicked
    const [isCheckedFileType, setIsCheckedFileType] = useState([
        {label: "csv", isChecked: false},
        {label: "xlsx", isChecked: false},
        {label: "txt", isChecked: false},
        {label: "json (split)", isChecked: false},
        {label: "json (records)", isChecked: false},
    ]);

    /**
     * Updates the isCheckedFileType state by updatding the checked state of the file type name that was passed
     * 
     * @param {string} colName 
     * @param {boolean} isChecked 
     */
    function handleCheckboxChange(label, isChecked) {
        setIsCheckedFileType(prevState => prevState.map(fType => fType.label === label ? ({label: label, isChecked: isChecked}) : fType));
    }

    function handleIconClick() {
        if (isDragging) return;
        downloadData(sourceDataJSONStr, isCheckedFileType, filename)
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
        targetDataJSONStr={sourceDataJSONStr}
        canHaveDownloadPill={false}
       >
            <DownloadForm
                isDragging={isDragging}
                filename={filename}
                setFilename={setFilename}
                isCheckedFileType={isCheckedFileType}
                handleCheckboxChange={handleCheckboxChange}
                targetDataJSONStr={targetDataJSONStr}
                includeDownloadBtn={false}
            />
       </DataComponentWrapper>
    );
};

export default FileDownload;
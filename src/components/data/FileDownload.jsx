import React from 'react';

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

    const {downloadData} = useDownloadData(compID);

    const sourceData = useGetComponentSourceData(compID);

    function handleIconClick() {
        if (isDragging) return;
        downloadData(sourceData);
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
                compID={compID}
                cardTitle={cardTitle}
                isDragging={isDragging}
                targetDataJSONStr={sourceData}
                includeDownloadBtn={false}
            />
       </DataComponentWrapper>
    );
};

export default FileDownload;
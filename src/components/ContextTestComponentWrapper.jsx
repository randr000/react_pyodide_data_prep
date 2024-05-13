import React, { useState, useContext, useEffect } from 'react';
import AppDataContext from '../context/AppDataContext';
import { dataComponentMaker } from '../js/functions';
import Xarrow, { useXarrow } from 'react-xarrows';
import DeleteArrow from './utilities/DeleteArrow';
import FileUpload from './data/FileUpload';
import Filter from './data/FilterCols';
import FileDownload from './data/FileDownload';

const ContextTestComponentWrapper = () => {

    // const [uploadedFile, setUploadedFile] = useState(null);
    // const [filteredData, setFilteredData] = useState(null);
    const {appState, dispatch} = useContext(AppDataContext);
    const {components, arrows} = appState;
    const updateXarrow = useXarrow();

    useEffect(() => {
        // Debugging purposes only
        // console.log(`nextID: ${appState.nextID}`);
        // console.log('connectComponents:', appState.connectComponents);
        console.log('components:', appState.components);
        console.log('arrows:', appState.arrows);
        updateXarrow();
    }, [appState]);

    return (
        <>
            {Array.from(components.values()).map(c => <div key={c.compID}>{dataComponentMaker({type: c.type, compID: c.compID})}</div>)}
            {arrows.map(a => <Xarrow 
                key={a.arrowID}
                start={a.start}
                end={a.end}
                startAnchor='bottom'
                endAnchor='top'
                zIndex={0}
                labels={<DeleteArrow start={parseInt(a.start)} end={parseInt(a.end)} arrowID={a.arrowID}/>} />)}
        </>
    );
};

export default ContextTestComponentWrapper;
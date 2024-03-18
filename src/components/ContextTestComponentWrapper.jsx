import React, { useState, useContext } from 'react';
import AppDataContext from '../context/AppDataContext';
import { dataComponentMaker } from '../js/functions';
import Xarrow from 'react-xarrows';
import FileUpload from './data/FileUpload';
import Filter from './data/FilterCols';
import FileDownload from './data/FileDownload';

const ContextTestComponentWrapper = () => {

    // const [uploadedFile, setUploadedFile] = useState(null);
    // const [filteredData, setFilteredData] = useState(null);
    const {appState, dispatch} = useContext(AppDataContext);
    const {components, arrows} = appState;

    return (
        <>
            {components.map(c => <div key={c.compID}>{dataComponentMaker({type: c.type, compID: c.compID})}</div>)}
            {arrows.map(a => <Xarrow key={a.arrowID} start={a.start} end={a.end} startAnchor='bottom' endAnchor='top' zIndex={5}/>)}
        </>
    );
};

export default ContextTestComponentWrapper;
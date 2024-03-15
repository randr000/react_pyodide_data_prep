import React, { useState, useContext } from 'react';
import AppDataContext from '../context/AppDataContext';
import { dataComponentMaker } from '../js/functions';
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
            {components.map(c => c && <div key={c.compID}>{dataComponentMaker({type: c.type, compID: c.compID})}</div>)}
        </>
    );
};

export default ContextTestComponentWrapper;
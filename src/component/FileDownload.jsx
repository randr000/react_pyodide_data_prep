import React, {useState, useContext, useEffect } from 'react';
import Draggable from 'react-draggable';
import DataFlowPill from './DataFlowPill';
import ToggleTablePill from './ToggleTablePill';
import CardSummary from './CardSummary';

import { PyodideContext } from '../context/PyodideContext';
import Table from './Table';

import { useXarrow } from 'react-xarrows';

const FileDownload = ({cardTitle, fileExtension, iconClassNames, jsonData}) => {

    const [showTable, setShowTable] = useState(true);
    const [outputData, setOutputData] = useState(jsonData);

    const updateXarrow = useXarrow();

    useEffect(() => {
        setOutputData(jsonData);
    }, [jsonData]);

    useEffect(() => {
        updateXarrow();
    }, [showTable]);

    return (
        <div className="d-flex">
            <Draggable bounds="" onDrag={updateXarrow} onStop={updateXarrow}>
                <div className="d-flex align-items-start">
                    <div className="card border border-primary border-3" style={{width: "12rem"}}>
                        <div className="card-body text-center">

                            <DataFlowPill isOnTop={true} id="export-csv" />
                            <ToggleTablePill showTable={showTable} toggleTable={setShowTable} />
                            <CardSummary cardTitle={cardTitle} iconClassNames={iconClassNames} />
                            <DataFlowPill isOnTop={false} />

                        </div>
                    </div>
                    {outputData && <Table tableData={outputData} show={showTable} />}
                </div>
            </Draggable>
        </div>
    );
};

export default FileDownload;
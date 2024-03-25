import React, { useState } from "react";
import DataComponentDragWrapper from "./DataComponentDragWrapper";
import DeleteDataComponentPill from "./DeleteDataComponentPill";
import DataFlowPill from "./DataFlowPill";
import ToggleTablePill from "./ToggleTablePill";
import CardSummary from "./CardSummary";
import Table from "./Table";

const DataComponentWrapper = ({
    children,
    compID,
    cardTitle = 'Blank',
    iconClassNames = '',
    canHaveSources = true,
    canHaveOutput = true,
    outputData = null
}) => {

    const [showTable, setShowTable] = useState(true);
    const [disableDrag, setDisableDrag] = useState(false);

    return (
        <DataComponentDragWrapper disableDrag={disableDrag}>
            <div className="card border border-primary border-3" style={{width: "12rem"}}>
                <div className="card-body text-center">
                    <DeleteDataComponentPill compID={compID} setDisableDrag={setDisableDrag} />
                    {canHaveSources && <DataFlowPill isOnTop={true} id={`${compID}-top`} />}
                    <ToggleTablePill showTable={showTable} toggleTable={setShowTable} />
                    <CardSummary cardTitle={cardTitle} iconClassNames={iconClassNames} />
                    {children}
                    {canHaveOutput && <DataFlowPill isOnTop={false} id={`${compID}-btm`} />}
                </div>
            </div>
            {outputData && <Table tableData={outputData} show={showTable} />}
        </DataComponentDragWrapper>
    );
};

export default DataComponentWrapper;
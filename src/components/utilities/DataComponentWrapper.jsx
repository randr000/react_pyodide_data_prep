import React, { useEffect, useState, Children, cloneElement } from "react";
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
    iconOnClick = () => {},
    canHaveSources = true,
    canHaveOutput = true,
    outputData = null,
    // isDragDisabled = false
}) => {

    const [showTable, setShowTable] = useState(true);
    const [disableDrag, setDisableDrag] = useState(false);
    // useEffect(() => {
    //     setDisableDrag(isDragDisabled);
    //     console.log(`DataComponentWrapper: ${disableDrag}`)
    // },[disableDrag])

    function handleDragOnMouseOver() {
        setDisableDrag(true);
    }

    function handleDragOnMouseOut() {
        setDisableDrag(false);
    }

    return (
        <DataComponentDragWrapper disableDrag={disableDrag}>
            <div className="card border border-primary border-3" style={{width: "12rem"}}>
                <div className="card-body text-center">
                    <DeleteDataComponentPill compID={compID} setDisableDrag={setDisableDrag} />
                    {canHaveSources && <DataFlowPill isOnTop={true} id={`${compID}-top`} />}
                    <ToggleTablePill showTable={showTable} toggleTable={setShowTable} />
                    <CardSummary cardTitle={cardTitle} iconClassNames={iconClassNames} iconOnClick={iconOnClick} />
                    {/* {children} */}
                    {Children.map(children, child => {
                        // console.log(child.props.hasOwnProperty("disabledragonhover"));
                        // return child;
                        if (child.props.hasOwnProperty("disabledragonhover")) {
                            return cloneElement(child, {onMouseOver: handleDragOnMouseOver, onMouseOut: handleDragOnMouseOut});
                        } else return child;
                    })}
                    {canHaveOutput && <DataFlowPill isOnTop={false} id={`${compID}-btm`} />}
                </div>
            </div>
            {outputData && <Table tableData={outputData} show={showTable} />}
        </DataComponentDragWrapper>
    );
};

export default DataComponentWrapper;
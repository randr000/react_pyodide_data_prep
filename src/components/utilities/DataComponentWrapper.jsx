import React, { useEffect, useState, useContext, Children, cloneElement } from "react";
import AppDataContext from "../../context/AppDataContext";
import APP_ACTION_TYPES from "../../action-types/appActionTypes";
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
    canHaveTargets = true,
    outputData = null,
}) => {

    const {appState, dispatch} = useContext(AppDataContext);
    const {components} = appState;

    const [showTable, setShowTable] = useState(true);
    const [disableDrag, setDisableDrag] = useState(false);

    function handleDragOnMouseOver() {
        setDisableDrag(true);
    }

    function handleDragOnMouseOut() {
        setDisableDrag(false);
    }

    // Update component output data anytime source data is modified
    useEffect(() => {

        if (outputData && canHaveTargets) {
            const c = [...components];
            // Find the current index of this component
            const idx = c.findIndex(comp => comp.compID === compID);
            // Updates this component's data property with the outputData JSON string
            c[idx] = {...c[idx], data: outputData};
            // Updates the app state with the modified outputData
            dispatch({
                type: APP_ACTION_TYPES.MODIFY_COMPONENT_DATA,
                payload: c
            });
        };
    }, [outputData]);

    /**
     * 
     * Clone the children components and add the correct event handlers to enable and disable dragging on the
     * specified sub-components.
     * 
     * Any child component with the property 'disabledragonhover' will disable dragging when the mouse is over
     * that sub-component.
     * 
     * Any child component with the property 'disabledragdrilldown' will recursively call this function and look
     * for the 'disabledragonhover' property in the children components of the child.
     * 
     * @param {Array} children - An array of React child components
     * @returns The cloned React children components
     */
    function cloneChildren(children) {
        return Children.map(children, child => {
            if (child.props.hasOwnProperty("disabledragdrilldown")) {
                return cloneChildren(child.props.children);
            } else if(child.props.hasOwnProperty("disabledragonhover")) {
                return cloneElement(child, {onMouseOver: handleDragOnMouseOver, onMouseOut: handleDragOnMouseOut});
            } else return child;
        })
    }

    return (
        <DataComponentDragWrapper disableDrag={disableDrag}>
            <div className="card border border-primary border-3" style={{width: "12rem"}}>
                <div className="card-body text-center">
                    <DeleteDataComponentPill compID={compID} handleDragOnMouseOver={handleDragOnMouseOver} handleDragOnMouseOut={handleDragOnMouseOut} />
                    {canHaveSources && <DataFlowPill isOnTop={true} id={`${compID}-top`} />}
                    <ToggleTablePill showTable={showTable} toggleTable={setShowTable} />
                    <CardSummary cardTitle={cardTitle} iconClassNames={iconClassNames} iconOnClick={iconOnClick} />
                    {cloneChildren(children)}
                    {canHaveTargets && <DataFlowPill isOnTop={false} id={`${compID}-btm`} />}
                </div>
            </div>
            {outputData && <Table tableData={outputData} show={showTable} />}
        </DataComponentDragWrapper>
    );
};

export default DataComponentWrapper;
import React, { useEffect, useState } from "react";
import useGetContexts from "../../custom-hooks/useGetContexts";
import useGetComponentSourceData from "../../custom-hooks/useGetComponentSourceData";
import APP_ACTION_TYPES from "../../action-types/appActionTypes";
import DataComponentDragWrapper from "./DataComponentDragWrapper";
import DeleteDataComponentPill from "./DeleteDataComponentPill";
import DataFlowPill from "./DataFlowPill";
import ToggleTablePill from "./ToggleTablePill";
import DownloadPill from "./DownloadPill";
import CardSummary from "./CardSummary";
import Table from "./Table";
import CONSTANTS from "../../js/app-constants";

const DataComponentWrapper = ({
    children,
    compID,
    cardTitle = 'Blank',
    iconClassNames = '',
    iconOnClick = () => {},
    canHaveSources = true,
    file = null,
    maxSources = 1,
    canHaveTargets = true,
    updateTargetData = false,
    transformTargetData = false,
    targetDataDeps = [],
    canHaveDownloadPill = true
}) => {

    const {appState, dispatch, pyodide, isPyodideLoaded} = useGetContexts();
    const {components} = appState;

    // A reference to this components properties in the components global state variable
    const thisComponent = components.get(compID);

    // A reference to this component's showTable property
    const showTable = thisComponent.showTable;

    // This components source data
    const sourceDataJSONStr = useGetComponentSourceData(compID) || file;

    // A JSON formatted string that can be used to create a pandas dataframe
    const [
        targetDataJSONStr,
        setTargetDataJSONStr
    ] = useState(thisComponent.hasOwnProperty('data') ? thisComponent.data : sourceDataJSONStr);

    // Actions to take when source data or uploaded file changes
    useEffect(() => {
        updateTargetData
        ? canHaveSources
            ? updateTargetData(sourceDataJSONStr, setTargetDataJSONStr, pyodide, isPyodideLoaded)
            : updateTargetData(file, setTargetDataJSONStr, pyodide, isPyodideLoaded)
        : setTargetDataJSONStr(sourceDataJSONStr);
    }, [sourceDataJSONStr, file]);

    // Actions to take when target data needs to change due to user changing the varaibles used to transform the source data
    useEffect(() => {
        transformTargetData && targetDataDeps.length && transformTargetData(sourceDataJSONStr, setTargetDataJSONStr, pyodide, isPyodideLoaded);
    }, targetDataDeps);

    // Update component output data anytime target data is modified
    useEffect(() => {
        if (targetDataJSONStr && canHaveTargets) {
            const c = components;
            c.set(compID, {...thisComponent, data: targetDataJSONStr});
            // Updates the app state with the modified targetDataJSONStr
            dispatch({
                type: APP_ACTION_TYPES.MODIFY_COMPONENT_DATA,
                payload: c
            });
        }
    }, [targetDataJSONStr]);
    

    return (
        <DataComponentDragWrapper compID={compID} coordinates={thisComponent.coordinates}>
            <div data-testid={`${cardTitle}-${compID}`} className="card border border-primary border-3" style={{width: "12rem"}}>
                <div className="card-body text-center">
                    <DeleteDataComponentPill compID={compID} />
                    {
                        canHaveSources && 
                        <DataFlowPill
                            isOnTop={true}
                            id={`${compID}-top`}
                            maxSources={maxSources}
                            numOfSourceComponents={thisComponent.sourceComponents.size}
                        />
                    }

                    <ToggleTablePill compID={compID} showTable={showTable} />
                        
                    {
                        canHaveDownloadPill && 
                        <DownloadPill
                            compID={compID}
                            cardTitle={cardTitle}
                            targetDataJSONStr={targetDataJSONStr}
                        />
                    }
                    <CardSummary cardTitle={cardTitle} compID={compID} iconClassNames={iconClassNames} iconOnClick={iconOnClick} />
                    {children}
                    {canHaveTargets && <DataFlowPill isOnTop={false} id={`${compID}-btm`} />}
                </div>
            </div>
            {
                targetDataJSONStr
                && targetDataJSONStr.length > CONSTANTS.BLANK_TABLE_DATA_STR.length
                && <Table tableData={targetDataJSONStr} show={showTable} compID={compID} />
            }
        </DataComponentDragWrapper>
    );
};

export default DataComponentWrapper;
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
    uploadFileName = '',
    maxSources = 1,
    canHaveTargets = true,
    updateTargetData = false,
    transformTargetData = false,
    targetDataDeps = [],
    canHaveDownloadPill = true
}) => {

    const {appState, dispatch, pyodide, isPyodideLoaded} = useGetContexts();
    const {components} = appState;

    const [showTable, setShowTable] = useState(true);

    // A JSON formatted string containing the source data
    const [sourceDataJSONStr, setSourceDataJSONStr] = useState(null);

    // A JSON formatted string that can be used to create a pandas dataframe
    const [targetDataJSONStr, setTargetDataJSONStr] = useState(sourceDataJSONStr);

    // A reference to this components properties in the components global state variable
    const thisComponent = components.get(compID);

    // This components source data
    const sourceData = useGetComponentSourceData(compID);
    
    useEffect(() => {
        // If this component can have a source component, then it loads the source component's JSON data as a string, else null
        if (canHaveSources) setSourceDataJSONStr(sourceData);
    });

    // Actions to take when source data changes
    useEffect(() => {
        updateTargetData
        ? canHaveSources
            ? updateTargetData(sourceDataJSONStr, setTargetDataJSONStr, pyodide, isPyodideLoaded)
            : updateTargetData(file, setTargetDataJSONStr, pyodide, isPyodideLoaded)
        : setTargetDataJSONStr(sourceDataJSONStr);
    }, [sourceDataJSONStr, file]);

    // Actions to take when target data needs to change due to user changing the varaibles used to transform the source data
    useEffect(() => {
        transformTargetData &&  targetDataDeps.length && transformTargetData(sourceDataJSONStr, setTargetDataJSONStr, pyodide, isPyodideLoaded);
    }, targetDataDeps);

    // Update component output data anytime source data is modified
    useEffect(() => {

        if (targetDataJSONStr && canHaveTargets) {
            const c = components;
            c.set(compID, {...thisComponent, data: targetDataJSONStr});
            // Updates the app state with the modified targetDataJSONStr
            dispatch({
                type: APP_ACTION_TYPES.MODIFY_COMPONENT_DATA,
                payload: c
            });
        };
    }, [targetDataJSONStr]);

    // Filename to use for downloaded file
    const [filename, setFilename] = useState(`${compID}-${cardTitle}`);

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

                    <ToggleTablePill showTable={showTable} toggleTable={setShowTable} />
                        
                    {
                        canHaveDownloadPill && 
                        <DownloadPill
                            compID={compID}
                            cardTitle={cardTitle}
                            filename={filename}
                            setFilename={setFilename} 
                            targetDataJSONStr={targetDataJSONStr}
                        />
                    }
                    <CardSummary cardTitle={cardTitle} iconClassNames={iconClassNames} iconOnClick={iconOnClick} />
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
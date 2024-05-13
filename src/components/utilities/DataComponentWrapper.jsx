import React, { useEffect, useState, Children, cloneElement } from "react";
import useGetContexts from "../../custom-hooks/useGetContexts";
import APP_ACTION_TYPES from "../../action-types/appActionTypes";
import DataComponentDragWrapper from "./DataComponentDragWrapper";
import DeleteDataComponentPill from "./DeleteDataComponentPill";
import DataFlowPill from "./DataFlowPill";
import ToggleTablePill from "./ToggleTablePill";
import DownloadPill from "./DownloadPill";
import CardSummary from "./CardSummary";
import Table from "./Table";

const DataComponentWrapper = ({
    children,
    compID,
    cardTitle = 'Blank',
    iconClassNames = '',
    iconOnClick = () => {},
    canHaveSources = true,
    maxSources = 1,
    sourceDataJSONStr = null,
    setSourceDataJSONStr = () => {},
    canHaveTargets = true,
    updateTargetData = false,
    transformTargetData = false,
    targetDataDeps = [],
    canHaveDownloadPill = true
}) => {

    const {appState, dispatch, pyodide, isPyodideLoaded} = useGetContexts();
    const {components} = appState;

    const [showTable, setShowTable] = useState(true);

    // A JSON formatted string that can be used to create a pandas dataframe
    const [targetDataJSONStr, setTargetDataJSONStr] = useState(sourceDataJSONStr);

    // A reference to this components properties in the components global state variable
    const thisComponent = components.get(compID);
    
    useEffect(() => {

        // If this component can have a source component, then it loads the source component's JSON data as a string, else null
        if (canHaveSources) {
            if (maxSources === 1) {
                setSourceDataJSONStr(
                    thisComponent.sourceComponents.size
                    ? components.get([...thisComponent.sourceComponents][0]).data
                    : null
                );
            } else if (thisComponent.sourceComponents.size) {
                const sourceDataArray = [];
                thisComponent.sourceComponents.forEach(id => {
                    const data = components.get(id).data;
                    data && sourceDataArray.push(JSON.parse(data));
                });
                sourceDataArray.length ? setSourceDataJSONStr(JSON.stringify(sourceDataArray)) : setSourceDataJSONStr(null);

            } else setSourceDataJSONStr(null);
        }
    });

    // Actions to take when source data changes
    useEffect(() => {
        updateTargetData
        ? updateTargetData(sourceDataJSONStr, setTargetDataJSONStr, pyodide, isPyodideLoaded)
        : setTargetDataJSONStr(sourceDataJSONStr);
    }, [sourceDataJSONStr]);

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
        <DataComponentDragWrapper>
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
            {targetDataJSONStr && <Table tableData={targetDataJSONStr} show={showTable} compID={compID} />}
        </DataComponentDragWrapper>
    );
};

export default DataComponentWrapper;
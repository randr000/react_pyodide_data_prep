import React, { useEffect, useState, Children, cloneElement } from "react";
import useGetContexts from "../../custom-hooks/useGetContexts";
import { utils, writeFileXLSX } from 'xlsx';
import APP_ACTION_TYPES from "../../action-types/appActionTypes";
import DataComponentDragWrapper from "./DataComponentDragWrapper";
import DeleteDataComponentPill from "./DeleteDataComponentPill";
import DataFlowPill from "./DataFlowPill";
import ToggleTablePill from "./ToggleTablePill";
import DownloadPill from "./DownloadPill";
import CardSummary from "./CardSummary";
import Table from "./Table";

// import Python function(s)
import df_to_output from '../../python_code_js_modules/df_to_output';

const DataComponentWrapper = ({
    children,
    compID,
    cardTitle = 'Blank',
    iconClassNames = '',
    iconOnClick = () => {},
    canHaveSources = true,
    sourceDataJSONStr = null,
    setSourceDataJSONStr = () => {},
    canHaveTargets = true,
    targetDataJSONStr = null,
    setTargetDataJSONStr = () => {},
    updateTargetData = false,
    transformTargetData = false,
    targetDataDeps = [],
    canHaveDownloadPill = true
}) => {

    const {pyodide, isPyodideLoaded, appState, dispatch} = useGetContexts();
    const {isDragging, components} = appState;

    const [showTable, setShowTable] = useState(true);
    const [disableDrag, setDisableDrag] = useState(false);

    // A reference to this components properties in the components global state variable
    const thisComponent = components.filter(comp => comp.compID === compID)[0];

    // If this component can have a source component, then it loads the source component's JSON data as a string, else null
    if (canHaveSources) {
        setSourceDataJSONStr(thisComponent.sourceComponents.size ? components[components.findIndex(comp => [...thisComponent.sourceComponents][0] === comp.compID)].data : null);
        // TODO: Update in case component has more than one source component
    }

    // Actions to take when source data changes
    useEffect(() => {
        updateTargetData
        ? updateTargetData(sourceDataJSONStr, setTargetDataJSONStr)
        : setTargetDataJSONStr(sourceDataJSONStr);
    }, [sourceDataJSONStr]);

    // Actions to take when target data needs to change due to user changing the varaibles used to transform the source data
    useEffect(() => {
        transformTargetData &&  targetDataDeps.length && transformTargetData(sourceDataJSONStr, setTargetDataJSONStr);
    }, targetDataDeps);

    function handleDragOnMouseOver() {
        setDisableDrag(true);
    }

    function handleDragOnMouseOut() {
        setDisableDrag(false);
    }

    // Update component output data anytime source data is modified
    useEffect(() => {

        if (targetDataJSONStr && canHaveTargets) {
            const c = [...components];
            // Find the current index of this component
            const idx = c.findIndex(comp => comp.compID === compID);
            // Updates this component's data property with the targetDataJSONStr JSON string
            c[idx] = {...c[idx], data: targetDataJSONStr};
            // Updates the app state with the modified targetDataJSONStr
            dispatch({
                type: APP_ACTION_TYPES.MODIFY_COMPONENT_DATA,
                payload: c
            });
        };
    }, [targetDataJSONStr]);

    // Keeps track of which download file type checkboxes are clicked
    const [isCheckedFileType, setIsCheckedFileType] = useState([
        {label: "csv", isChecked: false},
        {label: "xlsx", isChecked: false},
        {label: "txt", isChecked: false},
        {label: "json (split)", isChecked: false},
        {label: "json (records)", isChecked: false},
    ]);

    // Filename to use for downloaded file
    const [filename, setFilename] = useState(`${compID}-${cardTitle}`);

    // Download data into file
    function downloadData() {

        const fileTypes = isCheckedFileType.filter(obj => obj.isChecked).map(obj => obj.label);
        pyodide.runPython(df_to_output);
        const dataJSONStrings = JSON.parse(pyodide.globals.get('df_to_output')(targetDataJSONStr, fileTypes))

        const downloadCsv = fileTypes.includes('csv');
        const downloadTxt = fileTypes.includes('txt');
        const downloadExcel = fileTypes.includes('xlsx');
        const downloadJSONSplit = fileTypes.includes('json (split)');
        const downloadJSONRecords = fileTypes.includes('json (records)');

        // Handle downloads for csv and txt files
        if (downloadCsv || downloadTxt) {
            const blob = new Blob([dataJSONStrings['csv_txt']], {type: 'text/csv'});
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);

            if (downloadCsv) {
                a.setAttribute('download', `${filename}.csv`);
                a.click();
            }

            if (downloadTxt) {
                a.setAttribute('download', `${filename}.txt`);
                a.click();
            }

            a.remove(); 
        }

        // Handle downloads for json (split) files
        if (downloadJSONSplit) {
            const blob = new Blob([JSON.stringify(JSON.parse(targetDataJSONStr), null, 4)], {type: 'application/json'});
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.setAttribute('download', `${filename}-split.json`);
            a.click();
            a.remove();
        }

        // Handles downloads for Excel and json (records) files
        if (downloadExcel || downloadJSONRecords) {
            const jSONData = JSON.parse(dataJSONStrings['xlsx_json']);

            // Handle downloads for Excel files
            if (downloadExcel) {
                const workbook = utils.book_new();
                const worksheet = utils.json_to_sheet(jSONData);
                utils.book_append_sheet(workbook, worksheet, 'data');
                writeFileXLSX(workbook, `${filename}.xlsx`)
            }

            // Handle downloads for json (records) files
            if (downloadJSONRecords) {
                const dataStr = JSON.stringify(jSONData, null, 4);
                const blob = new Blob([dataStr], {type: 'application/json'});
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.setAttribute('download', `${filename}-records.json`);
                a.click();
                a.remove();
            }
        } 
    }

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
                    {/* <div className="position-absolute  start-100 translate-middle d-flex flex-column">
                        <ToggleTablePill showTable={showTable} toggleTable={setShowTable} />
                        {canHaveDownloadPill && <DownloadPill compID={compID} cardTitle={cardTitle} />}
                    </div> */}
                    <div className="position-absolute mt-1 start-100 translate-middle">
                        <ToggleTablePill showTable={showTable} toggleTable={setShowTable} />
                        
                    </div>
                    {
                        canHaveDownloadPill && 
                        <div className="position-absolute mt-5 start-100 translate-middle">
                            <DownloadPill compID={compID} cardTitle={cardTitle} downloadData={downloadData} filename={filename} setFilename={setFilename} isCheckedFileType={isCheckedFileType} setIsCheckedFileType={setIsCheckedFileType} />
                        </div>
                    }
                   
                    <CardSummary cardTitle={cardTitle} iconClassNames={iconClassNames} iconOnClick={iconOnClick} />
                    {cloneChildren(children)}
                    {canHaveTargets && <DataFlowPill isOnTop={false} id={`${compID}-btm`} />}
                </div>
            </div>
            {targetDataJSONStr && <Table tableData={targetDataJSONStr} show={showTable} />}
        </DataComponentDragWrapper>
    );
};

export default DataComponentWrapper;
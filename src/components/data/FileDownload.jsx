import React, { useState, useContext, useEffect } from 'react';
import { utils, writeFileXLSX } from 'xlsx';
import Form from 'react-bootstrap/Form';
import AppDataContext from '../../context/AppDataContext';

// import other utility component(s)
import Checkboxes from '../utilities/Checkboxes';
import DataComponentWrapper from '../utilities/DataComponentWrapper';

// import Pyodide context
import { PyodideContext } from '../../context/PyodideContext';

// import Python function(s)
import df_to_output from '../../python_code_js_modules/df_to_output';


const FileDownload = ({compID, cardTitle, iconClassNames}) => {

    const {pyodide, isPyodideLoaded} = useContext(PyodideContext);
    const {appState, dispatch} = useContext(AppDataContext);
    const {connectComponents, components, isDragging} = appState;

    // A JSON formatted string that can be used to create a pandas dataframe
    const [outputData, setOutputData] = useState(null);

    // A reference to this components properties in the components global state variable
    const thisComponent = components.filter(comp => comp.compID === compID)[0];

    // If this component has a source component, then it loads the source component's JSON data as a string, else null
    const jsonDataStr = thisComponent.sourceComponents.size ?
                components[components.findIndex(comp => [...thisComponent.sourceComponents][0] === comp.compID)].data : null;
     
    useEffect(() => {
        setOutputData(jsonDataStr);
    }, [jsonDataStr]);

    // Filename to use for downloaded file
    const [filename, setFilename] = useState(`${compID}-${cardTitle}`);

    // Keeps track of which download file type checkboxes are clicked
    const [isCheckedFileType, setIsCheckedFileType] = useState([
        {label: "csv", isChecked: false},
        {label: "xlsx", isChecked: false},
        {label: "txt", isChecked: false},
        {label: "json (split)", isChecked: false},
        {label: "json (records)", isChecked: false},
    ]);

    /**
     * Updates the isCheckedFileType state by updatding the checked state of the file type name that was passed
     * 
     * @param {string} colName 
     * @param {boolean} isChecked 
     */
    function handleCheckboxChange(label, isChecked) {
        setIsCheckedFileType(prevState => prevState.map(fType => fType.label === label ? ({label: label, isChecked: isChecked}) : fType));
    }

    function handleIconClick() {
        if (isDragging) return;

        const fileTypes = isCheckedFileType.filter(obj => obj.isChecked).map(obj => obj.label);
        pyodide.runPython(df_to_output);
        const dataJSONStrings = JSON.parse(pyodide.globals.get('df_to_output')(outputData, fileTypes))

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
            const blob = new Blob([JSON.stringify(JSON.parse(outputData), null, 4)], {type: 'application/json'});
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

    return (
       <DataComponentWrapper
        compID={compID}
        cardTitle={cardTitle}
        iconClassNames={iconClassNames}
        iconOnClick={handleIconClick}
        canHaveTarget={false}
        outputData={outputData}
       >
            <Form disabledragdrilldown>
                <Form.Group disabledragdrilldown>
                    <div className="d-flex justify-content-start">
                        <Form.Label className="fw-bold cursor-grab">Filename:</Form.Label>
                    </div>
                    <Form.Control
                        disabledragonhover
                        type="text"
                        value={filename}
                        onChange={e => setFilename(e.target.value)}
                    />
                </Form.Group>
            </Form>
            <div className="mt-2">
                <Checkboxes
                    checkboxes={isCheckedFileType}
                    onChange={handleCheckboxChange}
                />
            </div>
       </DataComponentWrapper>
    );
};

export default FileDownload;
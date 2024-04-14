import React, { useState, useContext, useEffect } from 'react';
import { utils, read, writeFileXLSX } from 'xlsx';
import Checkboxes from '../utilities/Checkboxes';
import Form from 'react-bootstrap/Form';
import DataComponentWrapper from '../utilities/DataComponentWrapper';
import AppDataContext from '../../context/AppDataContext';
import APP_ACTION_TYPES from '../../action-types/appActionTypes';

// import other utility component(s)


// import Pyodide context
import { PyodideContext } from '../../context/PyodideContext';

// import Python function(s)
import df_to_csv from '../../python_code_js_modules/df_to_csv';


const FileDownload = ({compID, cardTitle, iconClassNames}) => {

    const {pyodide, isPyodideLoaded} = useContext(PyodideContext);
    const {appState, dispatch} = useContext(AppDataContext);
    const {connectComponents, components} = appState;

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

    // // Disable and enable the data component to be dragged
    // const [disableDrag, setDisableDrag] = useState(false);

    // function handleOnMouseOver() {
    //     setDisableDrag(true);
    // }

    // function handleOnMouseOut() {
    //     setDisableDrag(false);
    // }

    // useEffect(() => {
    //     console.log(`FileDownload: ${disableDrag}`)
    // }, [disableDrag])

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
        pyodide.runPython(df_to_csv);
        const file = pyodide.globals.get('df_to_csv')(outputData);
        // const file = read(pyodide.globals.get('df_to_csv')(outputData));
        console.log(JSON.parse(file)["xlsx"]);
        const excelJSON = read(JSON.stringify(JSON.parse(file)["xlsx"]));
        const workbook = utils.book_new();
        const worksheet = utils.json_to_sheet([
            {"state": "ny", "city": "buffalo"},
            {"state": "fl", "city": "miami"}
        ]);
        utils.book_append_sheet(workbook, worksheet, 'data');
        writeFileXLSX(workbook, 'test.xlsx');
        // const blob = new Blob([file], {type: "text/csv"});
        // const blob = new Blob([excelJSON], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
        // const blob = new Blob([workbook], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
        // console.log(blob);
        // const a = document.createElement('a');
        // const a2 = document.createElement('a');
        // a.setAttribute('download', 'test.csv');
        // a.setAttribute('download', 'test.xlsx');
        // const href = URL.createObjectURL(blob);
        // const href2 = URL.createObjectURL(blob2);
        // a.href = href;
        // a2.href = href2;
        // a.click();
        // a2.click();
        // a.setAttribute('download', 'test.txt');
        // a.click();
        // URL.revokeObjectURL(href);
        // a.remove();
        // a2.remove();
    }

    return (
       <DataComponentWrapper
        compID={compID}
        cardTitle={cardTitle}
        iconClassNames={iconClassNames}
        iconOnClick={handleIconClick}
        canHaveOutput={false}
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
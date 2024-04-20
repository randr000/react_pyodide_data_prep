import DATA_COMPONENT_TYPES from "./dataComponentTypes";
import FileUpload from "../components/data/FileUpload";
import FileDownload from "../components/data/FileDownload";
import FilterCols from "../components/data/FilterCols";
import Union from "../components/data/Union";
import useGetContexts from "../custom-hooks/useGetContexts";

/**
 * Creates a URL string pointing to the file passed as the argument 
 * 
 * @param {object} file 
 * @returns {string} A URL to the file passed as the argument or null
 */
export function createObjectURL(file) {
    if (window.webkitURL) return window.webkitURL.createObjectURL(file);
    if (window.URL.createObjectURL) return window.URL.createObjectURL(file);
    else return null;
}

/**
 * Creates a React component depending on the properties contained within the JSON
 * object passed as the arguement.
 * 
 * @param {object} obj A JSON object containing properties that will be used to create a React
 *                      component. The type property determines the component to be created.
 * @returns {object} A React component
 */
export function dataComponentMaker(obj) {
    const {type, compID} = obj;
    switch(type) {

        case DATA_COMPONENT_TYPES.FILE_UPLOAD:
            return <FileUpload
                compID={compID}
                cardTitle="Upload"
                fileExtension="csv"
                iconClassNames={false}
            />;

        case DATA_COMPONENT_TYPES.FILE_DOWNLOAD:
            return <FileDownload
                compID={compID}
                cardTitle="Download"
                iconClassNames="bi bi-file-earmark-arrow-down cursor-pointer"
            />;
        
        case DATA_COMPONENT_TYPES.FILTER_COLS:
            return <FilterCols 
                compID={compID}
                cardTitle="Filter Columns"
                iconClassNames="bi bi-funnel"
            />;

        case DATA_COMPONENT_TYPES.UNION:
            return <Union
                compID={compID}
                cardTitle={"Union"}
                iconClassNames={"bi bi-union"}
            />;
    }
}

export function downloadData(sourceDataJSONStr, checkedFileTypeStatuses) {
    // if (isDragging) return;

    const {pyodide, isPyodideLoaded} = useGetContexts();

    const fileTypes = checkedFileTypeStatuses.filter(obj => obj.isChecked).map(obj => obj.label);
    
    if (!isPyodideLoaded) return;
    pyodide.runPython(df_to_output);
    const dataJSONStrings = JSON.parse(pyodide.globals.get('df_to_output')(sourceDataJSONStr, fileTypes))

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
        const blob = new Blob([JSON.stringify(JSON.parse(sourceDataJSONStr), null, 4)], {type: 'application/json'});
        const a = document.createElement('a');
        a.href = createObjectURL(blob);
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
            a.href = createObjectURL(blob);
            a.setAttribute('download', `${filename}-records.json`);
            a.click();
            a.remove();
        }
    } 
}
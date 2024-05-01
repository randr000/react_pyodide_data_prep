import { useState } from 'react';
import useGetContexts from './useGetContexts';
import { utils, writeFileXLSX } from 'xlsx';
import df_to_output from '../python_code_js_modules/df_to_output';
import { createObjectURL } from '../js/functions';

const useDownloadData = () => {
    
    const {pyodide, isPyodideLoaded} = useGetContexts();

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
    function updateCheckedFileTypes(label, isChecked) {
        setIsCheckedFileType(prevState => prevState.map(fType => fType.label === label ? ({label: label, isChecked: isChecked}) : fType));
    }

    function downloadData(targetDataJSONStr, filename) {
        
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
            const blob = new Blob([dataJSONStrings.csv_txt], {type: 'text/csv'});
            const a = document.createElement('a');
            a.href = createObjectURL(blob);

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

    return {downloadData, updateCheckedFileTypes, isCheckedFileType}
}

export default useDownloadData;
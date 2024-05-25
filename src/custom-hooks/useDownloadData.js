import useGetContexts from './useGetContexts';
import useGetDataComponentLocalState from './useGetDataComponentLocalState';
import { utils, writeFileXLSX } from 'xlsx';
import df_to_output from '../python_code_js_modules/df_to_output';
import { createObjectURL } from '../js/functions';

const useDownloadData = (compID) => {
    
    const {pyodide, isPyodideLoaded} = useGetContexts();
    const {localState, updateLocalState} = useGetDataComponentLocalState(compID);
    const {downloadProps} = localState;
    const {fileName, isCheckedFileType} = downloadProps;

    /**
     * Updates the isCheckedFileType state by updatding the checked state of the file type name that was passed
     * 
     * @param {string} colName 
     * @param {boolean} isChecked 
     */
    function updateCheckedFileTypes(label, isChecked) {
        const temp = isCheckedFileType.map(fType => fType.label === label ? ({label: label, isChecked: isChecked}) : fType)
        updateLocalState({downloadProps: {...downloadProps, isCheckedFileType: [...temp]}});
    }

    /**
     * 
     * Updates the fileName of the files that will be downloaded
     * 
     * @param {string} fileName 
     */
    function updateFileName(fileName) {
        updateLocalState({downloadProps: {...downloadProps, fileName: fileName}})
    }

    function downloadData(targetDataJSONStr) {
        
        const fileTypes = isCheckedFileType.filter(obj => obj.isChecked).map(obj => obj.label);
        if (!isPyodideLoaded) return;
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
                a.setAttribute('download', `${fileName}.csv`);
                a.click();
            }

            if (downloadTxt) {
                a.setAttribute('download', `${fileName}.txt`);
                a.click();
            }

            a.remove(); 
        }

        // Handle downloads for json (split) files
        if (downloadJSONSplit) {
            const blob = new Blob([JSON.stringify(JSON.parse(targetDataJSONStr), null, 4)], {type: 'application/json'});
            const a = document.createElement('a');
            a.href = createObjectURL(blob);
            a.setAttribute('download', `${fileName}-split.json`);
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
                writeFileXLSX(workbook, `${fileName}.xlsx`)
            }

            // Handle downloads for json (records) files
            if (downloadJSONRecords) {
                const dataStr = JSON.stringify(jSONData, null, 4);
                const blob = new Blob([dataStr], {type: 'application/json'});
                const a = document.createElement('a');
                a.href = createObjectURL(blob);
                a.setAttribute('download', `${fileName}-records.json`);
                a.click();
                a.remove();
            }
        } 
    }

    return {downloadData, fileName, updateFileName, isCheckedFileType, updateCheckedFileTypes}
}

export default useDownloadData;
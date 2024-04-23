import useGetContexts from './useGetContexts';
import { utils, writeFileXLSX } from 'xlsx';
import df_to_output from '../python_code_js_modules/df_to_output';
import { createObjectURL } from '../js/functions';

const useDownloadData = () => {
    
    const {pyodide, isPyodideLoaded} = useGetContexts();

    function downloadData(targetDataJSONStr, isCheckedFileType, filename) {

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

    return {downloadData}
}

export default useDownloadData;
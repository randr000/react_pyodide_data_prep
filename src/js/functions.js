import DATA_COMPONENT_TYPES from "./dataComponentTypes";
import FileUpload from "../components/data/FileUpload";

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
                cardTitle="Import CSV"
                fileExtension="csv"
                iconClassNames="bi bi-filetype-csv"
                setUploadedFile={() => {}}
            />;
    }
}
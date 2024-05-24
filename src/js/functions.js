import DATA_COMPONENT_TYPES from "./dataComponentTypes";
import FileUpload from "../components/data/FileUpload";
import FileDownload from "../components/data/FileDownload";
import FilterCols from "../components/data/FilterCols";
import FilterRows from "../components/data/FilterRows";
import Join from "../components/data/Join";
import Union from "../components/data/Union";
import Script from "../components/data/Script";
import { upload } from "@testing-library/user-event/dist/upload";

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

        case DATA_COMPONENT_TYPES.FILTER_ROWS:
            return <FilterRows 
                compID={compID}
                cardTitle="Filter Rows"
                iconClassNames="bi bi-funnel"
            />;

        case DATA_COMPONENT_TYPES.JOIN:
            return <Join
                compID={compID}
                cardTitle={"Join"}
                iconClassNames={"bi bi-intersect"}
            />

        case DATA_COMPONENT_TYPES.UNION:
            return <Union
                compID={compID}
                cardTitle={"Union"}
                iconClassNames={"bi bi-union"}
            />;

        case DATA_COMPONENT_TYPES.SCRIPT:
            return <Script
                compID={compID}
                cardTitle={"Script"}
                iconClassNames={"bi bi-filetype-py cursor-pointer"}
            />;
    }
}

/**
 * 
 * Takes in the type of component and then returns the default local state values
 * 
 * @param {string} type - A string containing the type of data component
 * @returns {object} - A JSON formated object containing the default local state values for the type of component passed
 */
export function createLocalState(type) {
    switch(type) {
        case DATA_COMPONENT_TYPES.FILE_UPLOAD:
            return {
                uploadStyles: {borderWidth: '3px', borderStyle: 'dashed', borderColor: '#6c757d'},
                fileMetaData: null,
                isInvalidFile: false,
                invalidFileMsg: ''
            };

        case DATA_COMPONENT_TYPES.FILE_DOWNLOAD:
            return;
        case DATA_COMPONENT_TYPES.FILTER_COLS:
            return {
                filteredCols: []
            };
        case DATA_COMPONENT_TYPES.FILTER_ROWS:
            return {
                columns: [],
                col: '',
                operator: '',
                colValue: ''
            };
        case DATA_COMPONENT_TYPES.JOIN:
            return {
                joinType: 'inner',
                columns: null,
                onCol: '',
                leftSuffix: 'left',
                rightSuffix: 'right'
            };
        case DATA_COMPONENT_TYPES.UNION:
            return;
        case DATA_COMPONENT_TYPES.SCRIPT:
            return {
                body: ''
            };
        
        
    }
}

// function dispatchLocalStateUpdate()
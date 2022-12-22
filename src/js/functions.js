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
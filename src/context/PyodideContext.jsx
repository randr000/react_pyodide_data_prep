import React, { useEffect, useRef, useState } from 'react';
import { loadPyodide } from 'pyodide/pyodide.js';

export const PyodideContext = React.createContext(null);

export const PyodideContextWrapper = ({children, toLoadPyodide=true}) => {

    const [isPyodideLoaded, setIsPyodideLoaded] = useState(!toLoadPyodide);
    const pyodideRef = useRef(null);

    useEffect(() => {
        toLoadPyodide &&
        (async function () {
            pyodideRef.current = await loadPyodide({
                indexURL : "https://cdn.jsdelivr.net/pyodide/v0.21.3/full/"
              });
            await pyodideRef.current.loadPackage('pandas');
            setIsPyodideLoaded(true);
            return pyodideRef.current.runPythonAsync('2 * 3');
            
        })().then(res => console.log(`Python result: ${res}`));

    }, [pyodideRef]);
    
    return (
        <PyodideContext.Provider value={{pyodide: pyodideRef.current, isPyodideLoaded}}>
            {
                isPyodideLoaded ?
                children :
                <p className="text-center fs-1 fw-bold">Pyodide is Loading<span data-testid="pyodide-loading-spinner" className="spinner-border" role="status"></span></p>
            }
            
        </PyodideContext.Provider>
    );
};
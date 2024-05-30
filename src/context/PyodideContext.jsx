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
            await pyodideRef.current.loadPackage('numpy');
            await pyodideRef.current.loadPackage('matplotlib');
            setIsPyodideLoaded(true);
            return pyodideRef.current.runPythonAsync('2 * 3');
            
        })().then(res => res === 6 ? console.log("Pyodide has loaded") : console.log("Something wrong appears to have happended when loading Pyodide"));

    }, [pyodideRef]);
    
    return (
        <PyodideContext.Provider value={{pyodide: pyodideRef.current, isPyodideLoaded}}>
            {
                isPyodideLoaded ?
                children :
                <div className="d-flex align-items-center justify-content-center" style={{height: "100vh"}}>
                    <p className="text-center fs-1 fw-bold">Pyodide is Loading<span data-testid="pyodide-loading-spinner" className="spinner-border" role="status"></span></p>
                </div>
            }
            
        </PyodideContext.Provider>
    );
};
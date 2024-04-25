import React, { useEffect, useRef, useState } from 'react';

export const PyodideContext = React.createContext(null);

export const PyodideContextWrapper = ({children}) => {

    // const [isPyodideLoaded, setIsPyodideLoaded] = useState(true);
    const [isPyodideLoaded, setIsPyodideLoaded] = useState(false);
    const pyodideRef = useRef(null);

    useEffect(() => {

        (async function () {

            pyodideRef.current = await window.loadPyodide();
            // pyodideRef.current = await window.loadPyodide({
            //     indexURL : "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
            //   });
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
                <p className="text-center fs-1 fw-bold">Pyodide is Loading <span className="spinner-border" role="status"></span></p>
            }
            
        </PyodideContext.Provider>
    );
};
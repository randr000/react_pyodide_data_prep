import React, { useEffect, useRef, useState } from 'react';

export const PyodideContext = React.createContext(null);

export const PyodideContextWrapper = ({children}) => {

    const [isPyodideLoaded, setIsPyodideLoaded] = useState(false);
    const pyodideRef = useRef(null);

    useEffect(() => {

        (async function () {

            pyodideRef.current = await loadPyodide();
            await pyodideRef.current.loadPackage('pandas');
            setIsPyodideLoaded(true);
            return pyodideRef.current.runPythonAsync('2 * 3');
            
        })().then(res => console.log(`Python result: ${res}`));

    }, [pyodideRef]);
    
    return (
        <PyodideContext.Provider value={{pyodide: pyodideRef.current, isPyodideLoaded}}>
            {
                isPyodideLoaded ?
                <p>Pyodide has loaded.</p> :
                <p>Pyodide is loading...</p>
            }
            {children}
        </PyodideContext.Provider>
    );
};
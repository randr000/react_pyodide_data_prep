import React, { useEffect, useRef, useState } from 'react';

export const PyodideContext = React.createContext(null);

export const PyodideContextWrapper = ({children}) => {

    const [isPyodideLoaded, setIsPyodideLoaded] = useState(false);
    const pyodideRef = useRef(null);

    useEffect(() => {

        async function load_python() {

            pyodideRef.current = await loadPyodide();
            await pyodideRef.current.loadPackage('pandas');
            setIsPyodideLoaded(true);
            console.log(pyodideRef.current.runPythonAsync('1 + 1'));
        }

        load_python();

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
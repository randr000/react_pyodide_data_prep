import React, { useEffect } from 'react';
// import { loadPyodide } from 'pyodide';

const Button = () => {

    useEffect(() => {
        
        async function hello_python() {

            let pyodide = await loadPyodide();
            await pyodide.loadPackage('pandas');
            return pyodide.runPythonAsync('1 + 1');
        }

        hello_python().then(res => console.log(`Python result: ${res}`))

    }, []);

    return (
        <button className="btn btn-primary">Working</button>
    );
};

export default Button;
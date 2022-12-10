import React, { useState, useContext } from 'react';
import { PyodideContext } from '../context/PyodideContext.jsx';

const TestComponent = ({a = 1, b, isLastComponent = false}) => {

    const {pyodide, isPyodideLoaded} = useContext(PyodideContext);
    const [result, setResult] = useState(0);

    async function handleClick() {
        // pyodide.runPython('../python/test.py');
        pyodide.runPython(`
            def mult(a, b):
                return a * b
        `);
        setResult(pyodide.globals.get('mult')(a, b));
    }

    return (
        <div>
            <p>{`${a} * ${b} = ${result}`}</p>
            <button className="btn btn-primary" onClick={handleClick}></button>
            {isLastComponent ? null : <TestComponent a={result} b={3} isLastComponent={true} />}
        </div>
    );
};

export default TestComponent;
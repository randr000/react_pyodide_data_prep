import React, { useState, useContext, useEffect } from 'react';
import { PyodideContext } from '../context/PyodideContext.jsx';
import test1 from '../python_code_js_modules/test1.js';
import create_df_from_json from '../python_code_js_modules/create_df_from_json.js';

const TestComponent = ({a = 1, b, isLastComponent = false}) => {

    const {pyodide, isPyodideLoaded} = useContext(PyodideContext);
    const [result, setResult] = useState(0);

    async function handleClick() {
        // pyodide.runPython('../python/test.py');
        // pyodide.runPython(`
        //     def mult(a, b):
        //         return a * b
        // `);

        // pyodide.runPython(test1);
        // setResult(pyodide.globals.get('mult')(a, b));

        let jsonStr = {
            col1: [1, 2, 3],
            col2: ['A', 'B', 'C']
        }
        pyodide.runPython(create_df_from_json);

        setResult(pyodide.globals.get('create_df_from_json')(JSON.stringify(jsonStr)));
    }

    useEffect(() => {
        console.log(result);
    }, [result]);

    return (
        <div>
            <p>{`${a} * ${b} = ${result}`}</p>
            <button className="btn btn-primary" onClick={handleClick}></button>
            {isLastComponent ? null : <TestComponent a={result} b={3} isLastComponent={true} />}
        </div>
    );
};

export default TestComponent;
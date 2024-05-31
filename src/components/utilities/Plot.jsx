import React, { useEffect, useState, useRef } from "react";
import useGetContexts from "../../custom-hooks/useGetContexts";

const Plot = ({show, compID, plotScript}) => {

    const {pyodide, isPyodideLoaded} = useGetContexts();

    const plotRef = useRef(null);
    const [run, setRun] = useState(false);
    
    function plot() {
        if (isPyodideLoaded) {
            try {
                console.log(`pyScript: ${plotScript}`);
                pyodide.runPython(plotScript);
                if (document.body.childElementCount > 2) {
                    // const lastChild = document.body.lastChild;
                    // plotRef.current.appendChild(document.body.lastChild);
                    plotRef.current.replaceChildren(document.body.lastChild);
                }
                // pyodide.globals.get('draw_plot')();
            } catch (error) {
                console.log(error);
            }
        }
    }

    // const [myPlot, setMyPlot] = useState(null);

    useEffect(() => {
        // document.pyodideMplTarget = plotRef.current;
        // document.thispy = plotRef.current;
    }, [])

    useEffect(() => {
        // document.pyodideMplTarget = plotRef.current;
        // document.pyodideMplTarget = document.getElementById('this-plot');
        plot();
        console.log('this');
        // console.log(document.pyodideMplTarget);
        console.log(`body len ${document.body.children.length}`)
        // console.log(document.thispy)
    }, [plotScript])

    return (
        <div title="plot-container" className="plot-container">
            <div id="this-plot" ref={plotRef} data-testid={`plot-${compID}`} style={{zIndex: 1000}}>
            </div>
        </div>
    );
};

export default Plot;
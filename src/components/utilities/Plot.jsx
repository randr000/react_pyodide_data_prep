import React, { useEffect, useState, useRef } from "react";
import useGetContexts from "../../custom-hooks/useGetContexts";

const Plot = ({show, compID, plotScript}) => {

    const {pyodide, isPyodideLoaded} = useGetContexts();

    const plotRef = useRef(null);
    // const [run, setRun] = useState(false);
    const [plots, setPlots] = useState([]);
    
    function plot() {
        if (isPyodideLoaded && document.body.childElementCount > 2) {
            try {
    
                while (plotRef.current.firstChild) {
                    plotRef.current.removeChild(plotRef.current.firstChild);
                }
                pyodide.runPython(plotScript);

                while (document.body.childElementCount > 4) {
                    const lastChild = document.body.lastElementChild;

                    

                    /^matplotlib_.*/.test(lastChild.id) && plotRef.current.appendChild(lastChild);
                    console.log(`count ${document.body.childElementCount}`);

                }

                // for (let i = 0; i < document.body.childElementCount; i++) {
                //     /^matplotlib_.*/.test(document.body.children[i].id) && plotRef.current.appendChild(document.body.children[i]);
                // }


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

        // console.log(document.pyodideMplTarget);

        // console.log(document.thispy)
    }, [plotScript])

    return (
        <div title="plot-container" className="plot-container">
            <div className="d-flex flex-column-reverse" id="this-plot" ref={plotRef} data-testid={`plot-${compID}`} style={{zIndex: 1000}}>
            </div>
        </div>
    );
};

export default Plot;
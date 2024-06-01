import React, { useEffect, useState, useRef } from "react";
import useGetContexts from "../../custom-hooks/useGetContexts";

const Plot = ({show, compID, plotScript}) => {

    const {pyodide, isPyodideLoaded} = useGetContexts();

    const plotRef = useRef(null);
    
    /**
     * Renders the plots everytime plt.show() is called in the script
     */
    function plot() {
        if (isPyodideLoaded && document.body.childElementCount > 2) {
            try {
                // Remove all old plots
                while (plotRef.current.firstChild) {
                    plotRef.current.removeChild(plotRef.current.firstChild);
                }

                pyodide.runPython(plotScript);

                // plt.show causes the plots to be appended to body, this moves them to div specified
                // First four elements are noscript, react app, 2 other modal elements that have not yet been removed from
                //  the DOM when the script modal is edited and saved. CSS is used to display plots in the order plt.show()
                //  was called.
                while (document.body.childElementCount > 4) {
                    const lastChild = document.body.lastElementChild;
                    /^matplotlib_.*/.test(lastChild.id) && plotRef.current.appendChild(lastChild);
                }

            } catch (error) {
                console.log(error);
            }
        }
    }

    // Updates plots anytime script changes
    useEffect(() => {
        plot();
    }, [plotScript])

    return (
        <div title="plot-container" className="plot-container">
            <div className="d-flex flex-column-reverse" id="this-plot" ref={plotRef} data-testid={`plot-${compID}`} style={{zIndex: 1000}}>
            </div>
        </div>
    );
};

export default Plot;
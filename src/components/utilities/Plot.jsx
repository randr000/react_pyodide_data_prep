import React, { useEffect, useRef } from "react";
import useGetContexts from "../../custom-hooks/useGetContexts";
import APP_ACTION_TYPES from "../../action-types/appActionTypes";
import useGetComponentSourceData from "../../custom-hooks/useGetComponentSourceData";

const Plot = ({show, compID, plotScript, setScriptingError}) => {

    const {dispatch, pyodide, isPyodideLoaded} = useGetContexts();

    const plotRef = useRef(null);

    const sourceData = useGetComponentSourceData(compID);
    
    /**
     * Renders the plots everytime plt.show() is called in the script
     */
    function plot() {
        // if (isPyodideLoaded && document.body.childElementCount > 2) {
        if (isPyodideLoaded && sourceData) {
            try {
                // Remove all old plots
                while (plotRef.current.firstChild) {
                    plotRef.current.removeChild(plotRef.current.firstChild);
                }

                // Pass source data to python script
                let myNamespace = pyodide.toPy({jsonStr: sourceData.charAt(0) === '{' ? `[${sourceData}]` : sourceData});
                pyodide.runPython(plotScript, {globals: myNamespace});

                // Append only the plots
                for(let i = document.body.childElementCount - 1; i >= 0; i--) {
                    if (/^matplotlib_.*/.test(document.body.children[i].id)) plotRef.current.appendChild(document.body.children[i]);
                }

                // Each plot is plotted with the text 'Figure' followed by its figure number on top of the plot. ex "Figure 3"
                // This removes it from each plot.
                document.querySelectorAll('[id^="matplotlib_"][id$="top"]').forEach(e => e.remove())

            } catch (error) {
                console.log(error);
                setScriptingError(error);
            }
        } else {
            // Remove all old plots if source data is removed
            while (plotRef.current.firstChild) {
                plotRef.current.removeChild(plotRef.current.firstChild);
            }
        }
    }

    function handleOnMouseOver() {
        dispatch({type: APP_ACTION_TYPES.TOGGLE_IS_DRAGGING_DISABLED, payload: true});
    }

    function handleOnMouseOut() {
        dispatch({type: APP_ACTION_TYPES.TOGGLE_IS_DRAGGING_DISABLED, payload: false});
    }

    // Updates plots anytime script or source data changes
    useEffect(() => {
        plot();
    }, [plotScript, sourceData]);

    return (
        <div title="plot-container" className="plot-container ms-4" onMouseOver={handleOnMouseOver} onMouseOut={handleOnMouseOut}>
            <div className={`d-flex flex-column-reverse ${!show && "d-none"}`} id="this-plot" ref={plotRef} data-testid={`plot-${compID}`} style={{zIndex: 1000}}>
            </div>
        </div>
    );
};

export default Plot;
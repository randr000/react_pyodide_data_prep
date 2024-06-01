import React, { useEffect, useState, useRef } from "react";
import useGetContexts from "../../custom-hooks/useGetContexts";
import APP_ACTION_TYPES from "../../action-types/appActionTypes";

const Plot = ({show, compID, plotScript}) => {

    const {dispatch, pyodide, isPyodideLoaded} = useGetContexts();

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

                // Each plot is plotted with the text 'Figure' followed by its figure number on top of the plot. ex "Figure 3"
                // This removes it from each plot.
                document.querySelectorAll('[id^="matplotlib_"][id$="top"]').forEach(e => e.remove())

            } catch (error) {
                console.log(error);
            }
        }
    }

    function handleOnMouseOver() {
        dispatch({type: APP_ACTION_TYPES.TOGGLE_IS_DRAGGING_DISABLED, payload: true});
    }

    function handleOnMouseOut() {
        dispatch({type: APP_ACTION_TYPES.TOGGLE_IS_DRAGGING_DISABLED, payload: false});
    }

    // Updates plots anytime script changes
    useEffect(() => {
        plot();
    }, [plotScript])

    return (
        <div title="plot-container" className="plot-container ms-4" onMouseOver={handleOnMouseOver} onMouseOut={handleOnMouseOut}>
            <div className={`d-flex flex-column-reverse ${!show && "d-none"}`} id="this-plot" ref={plotRef} data-testid={`plot-${compID}`} style={{zIndex: 1000}}>
            </div>
        </div>
    );
};

export default Plot;
import React, { useRef } from "react";
import Draggable from "react-draggable";
import { useXarrow } from "react-xarrows";
import APP_ACTION_TYPES from "../../action-types/appActionTypes";
import useGetContexts from "../../custom-hooks/useGetContexts";
import CONSTANTS from "../../js/app-constants";

const DataComponentDragWrapper = ({children, coordinates}) => {

    const updateXarrow = useXarrow();

    const {appState, dispatch} = useGetContexts();
    const {isDraggingDisabled, defaultX, defaultY} = appState;

    /* 
        If x and y are both zero, then use default x and y.
        Saving the last known coordinates allows components to render in the same position
        they were in case the user loads the app state from memory or a file. 
    */
    const {x, y} = coordinates;

    const defaultPosition = x || y ? {x: x, y: y} : {
        x: defaultX + CONSTANTS.DEFAULT_X_OFFSET, y: defaultY + CONSTANTS.DEFAULT_Y_OFFSET
    };

    // To prevent warning when running in React strict mode
    // Followed steps from React-Draggable documentation
    const nodeRef = useRef(null);

    function handleOnDrag() {
        updateXarrow();
        dispatch({type: APP_ACTION_TYPES.TOGGLE_IS_DRAGGING, payload: true});
    }

    function handleOnStop() {
        updateXarrow();
        // Allows click event to be effectively canceled when data component is done being dragged
        setTimeout(() => {
            dispatch({type: APP_ACTION_TYPES.TOGGLE_IS_DRAGGING, payload: false});
        }, 0);
    }
 
    return (
        <div className="d-flex" style={{position: "absolute"}}>
            <Draggable
                nodeRef={nodeRef}
                bounds=""
                onDrag={handleOnDrag}
                onStop={handleOnStop}
                disabled={isDraggingDisabled}
                defaultPosition={defaultPosition}
            >
                <div ref={nodeRef} className="d-flex align-items-start cursor-grab">
                    {children}
                </div>
            </Draggable>
        </div>
    );
};

export default DataComponentDragWrapper;
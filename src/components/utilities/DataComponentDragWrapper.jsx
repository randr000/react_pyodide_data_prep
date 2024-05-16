import React, { useRef } from "react";
import Draggable from "react-draggable";
import { useXarrow } from "react-xarrows";
import APP_ACTION_TYPES from "../../action-types/appActionTypes";
import useGetContexts from "../../custom-hooks/useGetContexts";

const DataComponentDragWrapper = ({children}) => {

    const updateXarrow = useXarrow();

    const {appState, dispatch} = useGetContexts();
    const {isDraggingDisabled} = appState;

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
                defaultPosition={{x: 2, y: 150}}
            >
                <div ref={nodeRef} className="d-flex align-items-start cursor-grab">
                    {children}
                </div>
            </Draggable>
        </div>
    );
};

export default DataComponentDragWrapper;
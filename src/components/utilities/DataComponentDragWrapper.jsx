import React, { useRef, useContext } from "react";
import Draggable from "react-draggable";
import { useXarrow } from "react-xarrows";
import AppDataContext from "../../context/AppDataContext";
import APP_ACTION_TYPES from "../../action-types/appActionTypes";

const DataComponentDragWrapper = ({children, disableDrag = false}) => {

    const  updateXarrow = useXarrow();

    const {_, dispatch} = useContext(AppDataContext);

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
            <Draggable nodeRef={nodeRef} bounds="" onDrag={handleOnDrag} onStop={handleOnStop} disabled={disableDrag}>
                <div ref={nodeRef} className="d-flex align-items-start cursor-grab">
                    {children}
                </div>
            </Draggable>
        </div>
    );
};

export default DataComponentDragWrapper;
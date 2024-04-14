import React, { useRef } from "react";
import Draggable from "react-draggable";
import { useXarrow } from "react-xarrows";

const DataComponentDragWrapper = ({children, disableDrag = false}) => {

    const  updateXarrow = useXarrow();

    // To prevent warning when running in React strict mode
    // Followed steps from React-Draggable documentation
    const nodeRef = useRef(null);

    return (
        <div className="d-flex" style={{position: "absolute"}}>
            <Draggable nodeRef={nodeRef} bounds="" onDrag={updateXarrow} onStop={updateXarrow} disabled={disableDrag}>
                <div ref={nodeRef} className="cursor-grab">
                    {children}
                </div>
            </Draggable>
        </div>
    );
};

export default DataComponentDragWrapper;
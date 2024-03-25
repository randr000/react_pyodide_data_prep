import React, { useState } from "react";
import Draggable from "react-draggable";
import { useXarrow } from "react-xarrows";

const DataComponentDragWrapper = ({children}) => {

    const [disableDrag, setDisableDrag] = useState(false);
    const  updateXarrow = useXarrow();

    return (
        <div className="d-flex" style={{position: "absolute"}}>
            <Draggable bounds="" onDrag={updateXarrow} onStop={updateXarrow} disabled={disableDrag}>
                <div className="d-flex align-items-start">
                    {children}
                </div>
            </Draggable>
        </div>
    );
};

export default DataComponentDragWrapper;
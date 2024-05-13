import React, { useState } from "react";
import APP_ACTION_TYPES from "../../action-types/appActionTypes";
import useGetContexts from "../../custom-hooks/useGetContexts";

const DeleteDataComponentPill = ({compID}) => {

    const {appState, dispatch} = useGetContexts();
    const {components, arrows} = appState;

    const [styles, setStyles] = useState({
        visibility: "hidden",
        cursor: "pointer"
    });

    function handleOnClick() {

        // Filter out component being deleted
        const c = components;
        c.delete(compID);

        /* Remove references to the component being deleted from the other components' sourceComponents
           and outputComponents properties */
        c.forEach(comp => {
            comp.hasOwnProperty('sourceComponents') && comp.sourceComponents.delete(compID);
            comp.hasOwnProperty('outputComponents') && comp.outputComponents.delete(compID);
        });

        // Filters out arrows that reference this components in their compIDs property
        const a = new Map();
        Array.from(arrows.values()).filter(a => !a.compIDs.has(compID)).forEach(arrow => {
            a.set(`${arrow.start}_${arrow.end}`, arrow);
        });
      
        dispatch({
            type: APP_ACTION_TYPES.REMOVE_DATA_COMPONENT,
            payload: {
                components: c,
                arrows: a
            }
        });
    }

    function handleOnMouseOver() {
        setStyles({...styles, visibility: "visible"});
        dispatch({type: APP_ACTION_TYPES.TOGGLE_IS_DRAGGING_DISABLED, payload: true})
    }

    function handleOnMouseOut() {
        setStyles({...styles, visibility: "hidden"});
        dispatch({type: APP_ACTION_TYPES.TOGGLE_IS_DRAGGING_DISABLED, payload: false});
    }

    return (
        <span
            className={`
                position-absolute
                top-0
                start-0
                translate-middle
                fs-5
                text-danger
                fw-bold
            `}
            onMouseOver={handleOnMouseOver}
            onMouseOut={handleOnMouseOut}
        >
            <i 
                className="bi bi-x-circle bg-white"
                style={styles}
                onClick={handleOnClick}
            />
            
        </span>
    );
};

export default DeleteDataComponentPill;
import React, { useState } from "react";
import APP_ACTION_TYPES from "../../action-types/appActionTypes";
import useGetContexts from "../../custom-hooks/useGetContexts";
import CONSTANTS from "../../js/app-constants";

const DeleteDataComponentPill = ({compID}) => {

    const {appState, dispatch} = useGetContexts();
    const {components, arrows} = appState;

    const [styles, setStyles] = useState({
        visibility: "hidden",
        cursor: "pointer"
    });

    function handleOnClick() {

        const c = components;
        const thisComp = c.get(compID);
        
        // Reset table data for sources that were output components of this component
        if (thisComp.hasOwnProperty('outputComponents')) {
            thisComp.outputComponents.forEach(id => {
                c.set(id, {...c.get(id), data: CONSTANTS.BLANK_TABLE_DATA_STR});
            })
        }

        // Filter out component being deleted
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
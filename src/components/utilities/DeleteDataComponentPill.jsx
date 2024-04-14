import React, { useState, useContext } from "react";
import AppDataContext from "../../context/AppDataContext";
import APP_ACTION_TYPES from "../../action-types/appActionTypes";

const DeleteDataComponentPill = ({compID, handleDragOnMouseOver, handleDragOnMouseOut}) => {

    const {appState, dispatch} = useContext(AppDataContext);
    const {components, arrows} = appState;

    const [styles, setStyles] = useState({
        visibility: "hidden",
        cursor: "pointer"
    });

    function handleOnClick() {

        // Filter out component being deleted
        const c = components.filter(comp => comp.compID !== compID);

        /* Remove references to the component being deleted from the other components' sourceComponents
           and outputComponents properties */
        c.forEach(comp => {
            comp.hasOwnProperty('sourceComponents') && comp.sourceComponents.delete(compID);
            comp.hasOwnProperty('outputComponents') && comp.outputComponents.delete(compID);
        });
      
        dispatch({
            type: APP_ACTION_TYPES.REMOVE_DATA_COMPONENT,
            payload: {
                components: c,
                // Filters out arrows that reference this components in their compIDs property
                arrows: arrows.filter(a => !a.compIDs.has(compID))
            }
        });
    }

    function handleOnMouseOver() {
        setStyles({...styles, visibility: "visible"});
        handleDragOnMouseOver();
    }

    function handleOnMouseOut() {
        setStyles({...styles, visibility: "hidden"});
        handleDragOnMouseOut();
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
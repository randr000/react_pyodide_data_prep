import React, { useState, useContext } from "react";
import AppDataContext from "../../context/AppDataContext";
import APP_ACTION_TYPES from "../../action-types/appActionTypes";

const DeleteArrow = ({start, end, arrowID}) => {

    const {appState, dispatch} = useContext(AppDataContext);
    const {components, arrows} = appState;

    const [styles, setStyles] = useState({
        visibility: "hidden",
        cursor: "pointer"
    });

    function handleOnMouseOver() {
        setStyles({...styles, visibility: "visible"});
    }

    function handleOnMouseOut() {
        setStyles({...styles, visibility: "hidden"});
    }

    function handleOnClick() {
        console.log(`start: ${start}`);
        console.log(`end: ${end}`);
        
        const c = [...components]; // Deep copy of components

        // find index of arrow's source component
        const sourceIdx = c.findIndex(o => o.hasOwnProperty('outputComponents') && o.outputComponents.has(end));

        // find index of arrow's output component
        const outputIdx = c.findIndex(o => o.hasOwnProperty('sourceComponents') && o.sourceComponents.has(start));

        // remove source and output component references
        c[sourceIdx].outputComponents.delete(end);
        c[outputIdx].sourceComponents.delete(start); 

        dispatch({
            type: APP_ACTION_TYPES.REMOVE_ARROW,
            payload: {
                arrows: arrows.filter(a => a.arrowID !== arrowID),
                components: c
            }
        });
    }

    return (
        <span
            className={`
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
    )
};

export default DeleteArrow;
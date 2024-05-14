import React, { useState, useContext } from "react";
import AppDataContext from "../../context/AppDataContext";
import APP_ACTION_TYPES from "../../action-types/appActionTypes";
import CONSTANTS from "../../js/app-constants";

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
        
        const c = components; // Deep copy of components

        // remove source and output component references
        c.get(start).outputComponents.delete(end);
        c.get(end).sourceComponents.delete(start);

        // delete component's target data
        c.set(end, {...c.get(end), data: CONSTANTS.BLANK_TABLE_DATA_STR});
        
        const a = arrows;
        a.delete(arrowID);

        dispatch({
            type: APP_ACTION_TYPES.REMOVE_ARROW,
            payload: {
                arrows: a,
                components: c
            }
        });
    }

    return (
        <span
            id={`del-${arrowID}`}
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
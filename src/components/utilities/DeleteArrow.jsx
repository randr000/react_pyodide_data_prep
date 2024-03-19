import React, { useState, useContext } from "react";
import AppDataContext from "../../context/AppDataContext";
import APP_ACTION_TYPES from "../../action-types/appActionTypes";

const DeleteArrow = ({start, end}) => {

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
        
        // dispatch({
        //     type: APP_ACTION_TYPES.REMOVE_ARROW,
        //     payload: ''
        // });
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
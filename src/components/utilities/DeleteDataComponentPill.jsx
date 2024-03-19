import React, { useState, useContext } from "react";
import AppDataContext from "../../context/AppDataContext";
import APP_ACTION_TYPES from "../../action-types/appActionTypes";

const DeleteDataComponentPill = ({compID, setDisableDrag}) => {

    const {appState, dispatch} = useContext(AppDataContext);
    const {components} = appState;

    const [styles, setStyles] = useState({
        visibility: "hidden",
        cursor: "pointer"
    });

    function handleOnClick() {
        // console.log(components);
        // console.log(compID);
        // console.log(components.filter(c => c.compID !== compID));
        
      
        dispatch({type: APP_ACTION_TYPES.REMOVE_DATA_COMPONENT, payload: components.filter(c => c.compID !== compID)})
    }

    function handleOnMouseOver() {
        setStyles({...styles, visibility: "visible"});
        setDisableDrag(true);
    }

    function handleOnMouseOut() {
        setStyles({...styles, visibility: "hidden"});
        setDisableDrag(false);
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
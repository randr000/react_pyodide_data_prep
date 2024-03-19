import React, { useState } from "react";

const DeleteArrow = ({start, end}) => {

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
        return;
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
import React from 'react'

const NavBarComponentButton = ({btnText, onClick}) => {

    return <button 
        className="btn btn-primary mx-1"
        onClick={onClick}
        >{btnText}</button>
};

export default NavBarComponentButton;
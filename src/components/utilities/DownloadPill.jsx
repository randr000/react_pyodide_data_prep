import React, { useState, useContext } from 'react';
import AppDataContext from '../../context/AppDataContext';
import { Dropdown } from 'react-bootstrap';

const DownloadPill = () => {

    const [showDropdown, setShowDropdown] = useState(false);
    const {appState} = useContext(AppDataContext);
    const {isDragging} = appState;

    function handleOnClick(event) {
        !isDragging && setShowDropdown(prev => !prev);
    }

    return (
            <span
                onClick={handleOnClick}
                className={`
                    my-2
                    bg-white border
                    border-primary
                    rounded-pill
                    fs-5
                    btn
                `}>
                <Dropdown
                    show={showDropdown}
                >
                    <Dropdown.Toggle className='' as="div">
                        <i className="bi bi-file-earmark-arrow-down"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="mt-2">
                        <Dropdown.Item><input type="text" /></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </span>
  );
};

export default DownloadPill;
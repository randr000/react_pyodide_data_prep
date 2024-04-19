import React, { useState, useContext } from 'react';
import AppDataContext from '../../context/AppDataContext';
import { Dropdown } from 'react-bootstrap';

const DownloadPill = () => {

    const [showDropdown, setShowDropdown] = useState(false);
    const {appState} = useContext(AppDataContext);
    const {isDragging} = appState;

    function handleOnClick() {
        handleOnToggle(!showDropdown);
    }

    function handleOnToggle(nextShow) {
        !isDragging && setShowDropdown(nextShow);
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
                    onToggle={handleOnToggle}
                >
                    <Dropdown.Toggle as="div">
                        <i className="bi bi-file-earmark-arrow-down"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="mt-2">
                        <Dropdown.Item onClick={(e) => e.stopPropagation()}>
                            <input type="text" />
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </span>
  );
};

export default DownloadPill;
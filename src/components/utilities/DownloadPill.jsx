import React, { useState, useContext } from 'react';
import AppDataContext from '../../context/AppDataContext';
import { Dropdown } from 'react-bootstrap';
import DownloadForm from './DownloadForm';

const DownloadPill = ({filename, setFilename, targetDataJSONStr}) => {

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
                    mt-5
                    bg-white
                    border
                    border-primary
                    rounded-pill
                    fs-5
                    btn
                `}
                disabledragdrilldown
            >
                <Dropdown
                    show={showDropdown}
                    onToggle={handleOnToggle}
                    disabledragdrilldown
                >
                    <Dropdown.Toggle as="div">
                        <i className="bi bi-file-earmark-arrow-down"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="mt-2 px-2" onClick={e => e.stopPropagation()} disabledragdrilldown>
                        <DownloadForm
                            isDragging={isDragging}
                            filename={filename}
                            setFilename={setFilename}
                            // isCheckedFileType={isCheckedFileType}
                            // handleCheckboxChange={handleCheckboxChange}
                            targetDataJSONStr={targetDataJSONStr}
                        />
                    </Dropdown.Menu>
                </Dropdown>
            </span>
  );
};

export default DownloadPill;
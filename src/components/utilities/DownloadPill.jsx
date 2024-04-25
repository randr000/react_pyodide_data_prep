import React, { useState, useContext } from 'react';
// import AppDataContext from '../../context/AppDataContext';
import { Dropdown } from 'react-bootstrap';
import DownloadForm from './DownloadForm';
import useGetContexts from '../../custom-hooks/useGetContexts';

const DownloadPill = ({filename, setFilename, targetDataJSONStr}) => {

    const [showDropdown, setShowDropdown] = useState(false);
    const {appState} = useGetContexts();
    const {isDragging} = appState;

    function handleOnClick() {
        handleOnToggle(!showDropdown);
    }

    function handleOnToggle(nextShow) {
        !isDragging && setShowDropdown(nextShow);
    }

    return (
            <div
                className="position-absolute mt-5 start-100 translate-middle"
                onClick={handleOnClick}
            >
                <span
                    className={`
                        mt-5
                        bg-white
                        border
                        border-primary
                        rounded-pill
                        fs-5
                        btn
                    `}
                
                >
                    <Dropdown
                        show={showDropdown}
                        onToggle={handleOnToggle}
                
                    >
                        <Dropdown.Toggle as="div">
                            <i className="bi bi-file-earmark-arrow-down"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="mt-2 px-2" onClick={e => e.stopPropagation()} >
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
            </div>
  );
};

export default DownloadPill;
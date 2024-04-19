import React, { useState, useContext } from 'react';
import AppDataContext from '../../context/AppDataContext';
import { Dropdown, Form } from 'react-bootstrap';
import Checkboxes from './Checkboxes';

const DownloadPill = ({compID, cardTitle}) => {

    const [showDropdown, setShowDropdown] = useState(false);
    const {appState} = useContext(AppDataContext);
    const {isDragging} = appState;

    // Keeps track of which download file type checkboxes are clicked
    const [isCheckedFileType, setIsCheckedFileType] = useState([
        {label: "csv", isChecked: false},
        {label: "xlsx", isChecked: false},
        {label: "txt", isChecked: false},
        {label: "json (split)", isChecked: false},
        {label: "json (records)", isChecked: false},
    ]);

    /**
     * Updates the isCheckedFileType state by updatding the checked state of the file type name that was passed
     * 
     * @param {string} colName 
     * @param {boolean} isChecked 
     */
    function handleCheckboxChange(label, isChecked) {
        setIsCheckedFileType(prevState => prevState.map(fType => fType.label === label ? ({label: label, isChecked: isChecked}) : fType));
    }

    // Filename to use for downloaded file
    const [filename, setFilename] = useState(`${compID}-${cardTitle}`);

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
                        
                        <Form disabledragdrilldown>
                            <Form.Group disabledragdrilldown>
                                <div className="d-flex justify-content-between">
                                    <Form.Label className="fw-bold cursor-grab">Filename:</Form.Label>
                                    <icon className="bi bi-file-earmark-arrow-down cursor-pointer" />
                                </div>
                                <Form.Control
                                    disabledragonhover
                                    type="text"
                                    value={filename}
                                    onChange={e => setFilename(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                        <div className="mt-2">
                            <Checkboxes
                                checkboxes={isCheckedFileType}
                                onChange={handleCheckboxChange}
                            />
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
            </span>
  );
};

export default DownloadPill;
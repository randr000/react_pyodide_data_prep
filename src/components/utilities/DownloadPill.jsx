import React, { useState, useContext } from 'react';
import AppDataContext from '../../context/AppDataContext';
import { Dropdown, Form } from 'react-bootstrap';
import Checkboxes from './Checkboxes';
import DownloadForm from './DownloadForm';
import { downloadData } from '../../js/functions';

const DownloadPill = ({compID, cardTitle, filename, setFilename, downloadData, isCheckedFileType, setIsCheckedFileType}) => {

    const [showDropdown, setShowDropdown] = useState(false);
    const {appState} = useContext(AppDataContext);
    const {isDragging} = appState;

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
    // const [filename, setFilename] = useState(`${compID}-${cardTitle}`);

    function handleOnClick() {
        handleOnToggle(!showDropdown);
    }

    function handleOnToggle(nextShow) {
        !isDragging && setShowDropdown(nextShow);
    }

    function handleIconOnClick() {
        if (isDragging) return;
        downloadData();
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
                        <DownloadForm isDragging={isDragging} filename={filename} setFilename={setFilename} isCheckedFileType={isCheckedFileType} handleCheckboxChange={handleCheckboxChange} downloadData={downloadData}/>
                        {/* <Form disabledragdrilldown>
                            <Form.Group disabledragdrilldown>
                                <div className="d-flex justify-content-between">
                                    <Form.Label className="fw-bold cursor-grab">Filename:</Form.Label>
                                   
                                    <icon className="bi bi-box-arrow-down cursor-pointer fs-5" onClick={handleIconOnClick} />
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
                        </div> */}
                    </Dropdown.Menu>
                </Dropdown>
            </span>
  );
};

export default DownloadPill;
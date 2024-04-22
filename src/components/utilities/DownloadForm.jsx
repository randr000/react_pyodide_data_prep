import React from "react";
import { Form } from "react-bootstrap";
import Checkboxes from "./Checkboxes";

const DownloadForm = ({isDragging, filename, setFilename, isCheckedFileType, handleCheckboxChange, downloadData, includeDownloadBtn=true}) => {

    function handleOnClick() {
        if (isDragging) return;
        downloadData();
    }

    return (
        <div>
            <Form>
                <Form.Group>
                    <div className="d-flex justify-content-between">
                        <Form.Label className="fw-bold cursor-grab">Filename:</Form.Label>
                        <icon className="bi bi-box-arrow-down cursor-pointer fs-5" onClick={handleOnClick} />
                    </div>
                    <Form.Control
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
        </div>
    );
};

export default DownloadForm;
import React from "react";
import { Form } from "react-bootstrap";
import Checkboxes from "./Checkboxes";
import useDownloadData from "../../custom-hooks/useDownloadData";

const DownloadForm = ({isDragging, filename, setFilename, handleCustomCheckboxChange=false, includeDownloadBtn=true, targetDataJSONStr}) => {

    const {downloadData, updateCheckedFileTypes, isCheckedFileType} = useDownloadData();

    function handleOnClick() {
        if (isDragging) return;
        handleDownload();
    }

    function handleDownload() {
        downloadData(targetDataJSONStr, filename);
    }

    function handleCheckboxChange(label, isChecked) {
        if (handleCustomCheckboxChange) handleCustomCheckboxChange(label, isChecked);
        else updateCheckedFileTypes(label, isChecked);
    }

    return (
        <div>
            <Form>
                <Form.Group>
                    <div className="d-flex justify-content-between">
                        <Form.Label className="fw-bold cursor-grab">Filename:</Form.Label>
                        {includeDownloadBtn && <i className="bi bi-box-arrow-down cursor-pointer fs-5" onClick={handleOnClick} />}
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
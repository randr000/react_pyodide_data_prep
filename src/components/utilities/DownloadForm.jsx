import React from "react";
import { Form } from "react-bootstrap";
import Checkboxes from "./Checkboxes";
import useDownloadData from "../../custom-hooks/useDownloadData";

const DownloadForm = ({isDragging, filename, setFilename, isCheckedFileType, handleCheckboxChange, includeDownloadBtn=true, targetDataJSONStr}) => {

    const {downloadData} = useDownloadData();

    function handleOnClick() {
        if (isDragging) return;
        handleDownload();
    }

    function handleDownload() {
        downloadData(targetDataJSONStr, isCheckedFileType, filename);
    }

    return (
        <div>
            <Form>
                <Form.Group>
                    <div className="d-flex justify-content-between">
                        <Form.Label className="fw-bold cursor-grab">Filename:</Form.Label>
                        {includeDownloadBtn && <icon className="bi bi-box-arrow-down cursor-pointer fs-5" onClick={handleOnClick}></icon>}
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
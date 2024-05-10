import React from "react";
import { Form } from "react-bootstrap";
import Checkboxes from "./Checkboxes";
import useDownloadData from "../../custom-hooks/useDownloadData";
import useGetContexts from "../../custom-hooks/useGetContexts";
import APP_ACTION_TYPES from "../../action-types/appActionTypes";

const DownloadForm = ({isDragging, filename, setFilename, handleCustomCheckboxChange=false, includeDownloadBtn=true, targetDataJSONStr}) => {

    const {downloadData, updateCheckedFileTypes, isCheckedFileType} = useDownloadData();
    const {dispatch} = useGetContexts();

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

    function handleOnMouseOver() {
        dispatch({type: APP_ACTION_TYPES.TOGGLE_IS_DRAGGING_DISABLED, payload: true});
    }

    function handleOnTouchStart() {handleOnMouseOver()}

    function handleOnMouseOut() {
        dispatch({type: APP_ACTION_TYPES.TOGGLE_IS_DRAGGING_DISABLED, payload: false});
    }

    function handleOnTouchEnd() {handleOnMouseOut()}

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
                        onMouseOver={handleOnMouseOver}
                        onTouchStart={handleOnTouchStart}
                        onMouseOut={handleOnMouseOut}
                        onTouchEnd={handleOnTouchEnd}
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
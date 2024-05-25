import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import Checkboxes from "./Checkboxes";
import useDownloadData from "../../custom-hooks/useDownloadData";
import useGetContexts from "../../custom-hooks/useGetContexts";
import APP_ACTION_TYPES from "../../action-types/appActionTypes";

const DownloadForm = ({compID, cardTitle, isDragging, handleCustomCheckboxChange=false, includeDownloadBtn=true, targetDataJSONStr}) => {

    const {downloadData, fileName, updateFileName, isCheckedFileType, updateCheckedFileTypes} = useDownloadData(compID);
    const {dispatch} = useGetContexts();


    // Update default download fileName on first render if there is no fileName
    useEffect(() => {
        fileName && updateFileName(`${compID}-${cardTitle}`);
    }, []);

    function handleOnClick() {
        if (isDragging) return;
        handleDownload();
    }

    function handleDownload() {
        downloadData(targetDataJSONStr);
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
                        value={fileName}
                        onChange={e => updateFileName(e.target.value)}
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
                    onChange={updateCheckedFileTypes}
                />
            </div>
        </div>
    );
};

export default DownloadForm;
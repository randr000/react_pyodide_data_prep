import React from "react";
import { Modal, Button } from "react-bootstrap";

const PythonErrorModal = ({compID, error, showModal, setShowModal}) => {

    function handleClose() {setShowModal(false)}
    
    /**
     * 
     * Return an array with a length of the amount of begginning white space characters in a string
     * 
     * @param {string} str
     * @returns {Array}
     */
    function calcWSLenArr(str) {
        return Array.from(Array(str.match(/^\s*/)[0].length));
    }

    return (
        <div id={`python-err-modal-${compID}`} className="modal show" style={{display: "block", position: "initial"}}>
            <Modal show={showModal} onHide={handleClose} size="xl">
                <Modal.Header className="fs-5 fw-bold" closeButton>Python Error</Modal.Header>
                <Modal.Body>
                    {
                        error.toString().split('\n').map((line, idx) => {
                            return  <div key={idx}>
                                        {calcWSLenArr(line).map((_, i) => <span key={i}>&nbsp;</span>)}{line.trim()}
                                    </div>;
                        })
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PythonErrorModal;
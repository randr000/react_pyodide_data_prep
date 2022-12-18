import React from 'react';
import Draggable from 'react-draggable';

const ImportCSV = () => {

    const uploadStyles = {
        border: "dashed 3px lightgray"
    }

    return (


        <Draggable bounds="parent">
            <div className="card border border-primary border-3" style={{width: "12rem"}}>
                <div className="card-body text-center">
                    <div className="card" style={uploadStyles}>
                        <i className="bi bi-file-earmark-arrow-up display-3"></i>
                        <button className="btn btn-primary">Browse</button>
                    </div>
                    <h5 className="card-title">Import CSV</h5>
                    <p className="card-text display-1" >
                        <i className="bi bi-filetype-csv"></i>
                    </p>
                </div>
            </div>
        </Draggable>
    );
};

export default ImportCSV;
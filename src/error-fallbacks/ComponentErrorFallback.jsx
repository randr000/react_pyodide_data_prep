import React from "react";

const ComponentErrorFallback = () => {

    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{height: "100vh"}}>
            <p className="fs-1">There has been an error processing the data of one or more of the components. Please reload page.</p>
            <p className="fs-1">Please see the console for more information.</p>
            <button className="fs-1 btn btn-primary" onClick={() => window.location.reload()}>Reload</button>
        </div>
    );
};

export default ComponentErrorFallback;
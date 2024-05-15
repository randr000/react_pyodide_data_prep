import React from "react";

const AppErrorFallback = () => {

    return (
        <div className="d-flex flex-column align-items-center mt-5">
            <p className="fs-1">There has been an error</p>
            <p className="fs-1">Please see the console for more information.</p>
            <button className="fs-1 btn btn-primary" onClick={() => window.location.reload()}>Reload</button>
        </div>
    );
};

export default AppErrorFallback;
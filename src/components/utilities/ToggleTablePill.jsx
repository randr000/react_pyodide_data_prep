import React, { useEffect } from 'react';

const ToggleTablePill = ({isOnTop, id, showTable, toggleTable}) => {

    return (
        <span
            onClick={() => toggleTable(prev => !prev)}
            id={id}
            className={`
                position-absolute
                mt-3
                start-100
                translate-middle
                bg-white border
                border-primary
                rounded-pill
                fs-5
                ${showTable ? "text-danger" : "text-success"}
                btn
            `}>
            <i className="bi bi-table"></i>
        </span>
  );
};

export default ToggleTablePill;
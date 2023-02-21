import React, { useEffect } from 'react';
import { useXarrow } from 'react-xarrows';

const ToggleTablePill = ({isOnTop, id, showTable, toggleTable}) => {

    const updateXarrow = useXarrow();

    function updateToggle() {
        toggleTable(prev => !prev);
        updateXarrow();
    }

    useEffect(() => {
        updateXarrow();
    }, [showTable])

    return (
        <span
            // onClick={() => toggleTable(prev => !prev)}
            onClick={updateToggle}
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
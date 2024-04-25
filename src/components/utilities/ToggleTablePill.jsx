import React, { useEffect, useContext } from 'react';
import useGetContexts from '../../custom-hooks/useGetContexts';
// import AppDataContext from '../../context/AppDataContext';

const ToggleTablePill = ({id, showTable, toggleTable}) => {

    const {appState} = useGetContexts();
    const {isDragging} = appState;

    function handleOnClick() {
        if (isDragging) return;
        toggleTable(prev => !prev);
    }

    return (
        <div 
            className="position-absolute mt-1 start-100 translate-middle"
            onClick={handleOnClick} style={{zIndex: 10}}
        >
            <span
                id={id}
                className={`
                    mt-4
                    bg-white
                    border
                    border-primary
                    rounded-pill
                    fs-5
                    ${showTable ? "text-danger" : "text-success"}
                    btn
                `}>
                <i className="bi bi-table"></i>
            </span>
        </div>
  );
};

export default ToggleTablePill;
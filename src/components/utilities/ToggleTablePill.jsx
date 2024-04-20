import React, { useEffect, useContext } from 'react';
import AppDataContext from '../../context/AppDataContext';

const ToggleTablePill = ({isOnTop, id, showTable, toggleTable}) => {

    const {appState, dispatch} = useContext(AppDataContext);
    const {isDragging} = appState;

    return (
        <span
            onClick={() => !isDragging && toggleTable(prev => !prev)}
            id={id}
            className={`
                mt-4
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
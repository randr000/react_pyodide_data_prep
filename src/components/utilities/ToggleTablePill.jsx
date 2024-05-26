import React, { useEffect } from 'react';
import useGetContexts from '../../custom-hooks/useGetContexts';
import APP_ACTION_TYPES from '../../action-types/appActionTypes';

const ToggleTablePill = ({compID, showTable}) => {

    const {appState, dispatch} = useGetContexts();
    const {isDragging, showAllTables, hideAllTables} = appState;

    // When Show All Tables button is clicked, show this table
    useEffect(() => {
        if (showAllTables) {
            dispatch({
                type: APP_ACTION_TYPES.TOGGLE_COMPONENT_SHOW_TABLE,
                payload: {compID: compID, showTable: true, showAllTables: true, hideAllTables: false}
            });
        }
    }, [showAllTables])

    // When Hide All Tables button is clicked, hide this table
    useEffect(() => {
        if (hideAllTables) {
            dispatch({
                type: APP_ACTION_TYPES.TOGGLE_COMPONENT_SHOW_TABLE,
                payload: {compID: compID, showTable: false, showAllTables: false, hideAllTables: true}
            });
        }
    }, [hideAllTables])

    function handleOnClick() {
        if (isDragging) return;
        // Set show and hide all tables to false because at least this component's table will be hidden or shown
        dispatch({
            type: APP_ACTION_TYPES.TOGGLE_COMPONENT_SHOW_TABLE,
            payload: {compID: compID, showTable: !showTable, showAllTables: false, hideAllTables: false}
        });
    }

    return (
        <div 
            className="position-absolute mt-1 start-100 translate-middle"
            onClick={handleOnClick} style={{zIndex: 10}}
        >
            <span
                id={`${compID}-table-pill`}
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
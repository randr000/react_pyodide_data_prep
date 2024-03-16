import React, {useContext, useState} from 'react';
import AppDataContext from '../../context/AppDataContext';
import APP_ACTION_TYPES from '../../action-types/appActionTypes';

const DataFlowPill = ({isOnTop, id, maxConnections=1}) => {

    const {appState, dispatch} = useContext(AppDataContext);
    const {connectComponents} = appState;

    function openConn() {
        dispatch({
            type: APP_ACTION_TYPES.OPEN_CONNECT_COMPONENTS,
            payload: {pillID: id}
        });
    }

    function closeConn() {
        dispatch({type: APP_ACTION_TYPES.CLOSE_CONNECT_COMPONENTS});
    }

    function handleOnClick() {
        if (isOnTop) {
            return;

        } else if (connectComponents) {

            // This allows a user to click on another bottom pill and simultaneously
            // close the old opening connection and open a new one.
            if (connectComponents.pillID !== id) {
                openConn();

            } else closeConn();
            
        } else {

            openConn();
        }
    }
    
    return (
        <span
            id={id}
            className={`
                position-absolute
                top-${isOnTop ? '0' : '100'}
                start-50
                translate-middle
                ${connectComponents && !isOnTop && connectComponents.pillID === id ? 'bg-primary' : 'bg-white'}
                border
                border-primary
                rounded-pill
                fs-5
            `}
            onClick={handleOnClick}
        >
            <i className="bi bi-arrow-down"></i>
        </span>
  );
};

export default DataFlowPill;
import React, {useContext, useState} from 'react';
import AppDataContext from '../../context/AppDataContext';
import APP_ACTION_TYPES from '../../action-types/appActionTypes';

const DataFlowPill = ({isOnTop, id, maxConnections=1}) => {

    const {appState, dispatch} = useContext(AppDataContext);
    const {connectComponents} = appState;

    function handleOnClick() {
        if (isOnTop) {
            return;
        } else {
            dispatch({
                type: APP_ACTION_TYPES.OPEN_CONNECT_COMPONENTS,
                payload: {pillID: id}
            });
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
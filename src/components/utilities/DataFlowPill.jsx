import React, {useContext, useState} from 'react';
import AppDataContext from '../../context/AppDataContext';
import APP_ACTION_TYPES from '../../action-types/appActionTypes';

const DataFlowPill = ({isOnTop, id, maxConnections=1}) => {

    const {appState, dispatch} = useContext(AppDataContext);
    const {connectComponents, components} = appState;

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
            // Only creates arrow connection if they are different data components
            if (connectComponents && parseInt(connectComponents.pillID) !== parseInt(id)) {
                dispatch({
                    type: APP_ACTION_TYPES.ADD_ARROW,
                    payload: {arrowID: `${connectComponents.pillID}_${id}`, start: connectComponents.pillID, end: id}
                });

                const parentID = parseInt(id);
                const sourceID = parseInt(connectComponents.pillID);
                const c = [...components];

                c[parentID] = {...c[parentID], sourceComponents: new Set([sourceID])};
                c[sourceID] = {...c[sourceID], outputComponents: new Set([parentID])};

                dispatch({
                    type: APP_ACTION_TYPES.ADD_SOURCE_OUTPUT_REFS,
                    payload: c
                });
            }
            closeConn();

        } else if (connectComponents) {

            // This allows a user to click on another bottom pill and simultaneously
            // close the old opening connection and open a new one.
            if (connectComponents.pillID !== id) openConn();
            else closeConn();
            
        } else openConn();
    }
    
    return (
        <span
            id={id}
            className={`
                position-absolute
                top-${isOnTop ? '0' : '100'}
                start-50
                translate-middle
                ${
                    connectComponents && !isOnTop && connectComponents.pillID === id
                    ? 'bg-primary'
                    : connectComponents && isOnTop && connectComponents.pillID !== `${parseInt(id)}-btm`
                    ? 'bg-success'
                    : 'bg-white'
                }
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
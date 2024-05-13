import React from 'react';
// import AppDataContext from '../../context/AppDataContext';
import APP_ACTION_TYPES from '../../action-types/appActionTypes';
import useGetContexts from '../../custom-hooks/useGetContexts';

const DataFlowPill = ({isOnTop, id, maxSources=0, numOfSourceComponents=0}) => {

    const {appState, dispatch} = useGetContexts();
    const {arrows, connectComponents, components, isDragging} = appState;

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
        if (isDragging) return;
        if (isOnTop) {
            // Do not allow connection if component already has the number of max sources
            if (maxSources === numOfSourceComponents) return;

            // Do not allow duplicate connections
            if (arrows.has(`${connectComponents.pillID}_${id}`)) {
                closeConn();
                return;
            }

            // Only creates arrow connection if they are different data components
            if (connectComponents && parseInt(connectComponents.pillID) !== parseInt(id)) {
                dispatch({
                    type: APP_ACTION_TYPES.ADD_ARROW,
                    payload: {
                        id: `${connectComponents.pillID}_${id}`,
                        data: {
                            arrowID: `${connectComponents.pillID}_${id}`,
                            start: connectComponents.pillID,
                            end: id,
                            compIDs: new Set([parseInt(connectComponents.pillID), parseInt(id)])
                        }
                    }
                });

                const parentID = parseInt(id);
                const sourceID = parseInt(connectComponents.pillID);
                const c = components;

                c.set(parentID, {...c.get(parentID), sourceComponents: new Set([...c.get(parentID).sourceComponents, sourceID])});
                c.set(sourceID, {...c.get(sourceID), outputComponents: new Set([...c.get(sourceID).outputComponents, parentID])});

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
                    : connectComponents && isOnTop && connectComponents.pillID !== `${parseInt(id)}-btm` && numOfSourceComponents < maxSources
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
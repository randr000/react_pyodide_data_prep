import { useContext } from 'react';
import AppDataContext from '../context/AppDataContext';
import APP_ACTION_TYPES from '../action-types/appActionTypes';

const useGetDataComponentLocalState = (compID) => {

    const {appState, dispatch} = useContext(AppDataContext);
    const {components} = appState;
    const localState = components.get(compID).localState;

    function updateLocalState(updatedStateValues, componentID=compID) {
        components.set(componentID, {...components.get(componentID), localState: {...localState, ...updatedStateValues}});
        dispatch({
            type: APP_ACTION_TYPES.UPDATE_DATA_COMPONENT_LOCAL_STATE,
            payload: components
        });
    }

    return {localState, updateLocalState};
}

export default useGetDataComponentLocalState;
import APP_ACTION_TYPES from "../action-types/appActionTypes";
import sampleStates from "./sampleStates";

function resetState() {
    return {
        isDragging: false,
        isDraggingDisabled: false,
        showAllTables: false,
        hideAllTables: false,
        nextID: 0,
        connectComponents: false,
        components: new Map(),
        arrows: new Map(),
    };
}

export const APP_INITIAL_STATE = {...sampleStates.a};

/*
*   APP INITIAL STATE:
*   
*   See README
*/

export const appReducer = (state, action) => {
    const {type, payload} = action;
    const {nextID, components, arrows} = state;
    switch(type) {
        case APP_ACTION_TYPES.LOAD_INITIAL_STATE:
            return payload;
        case APP_ACTION_TYPES.UPDATE_DATA_COMPONENT_LOCAL_STATE:
            return {...state, components: payload};
        case APP_ACTION_TYPES.ADD_DATA_COMPONENT:
            return {...state, nextID: nextID + 1, components: new Map([...components, [nextID, payload]])};
        case APP_ACTION_TYPES.REMOVE_DATA_COMPONENT:
            return {...state, components: payload.components, arrows: payload.arrows, isDraggingDisabled: false};
        case APP_ACTION_TYPES.OPEN_CONNECT_COMPONENTS:
            return {...state, connectComponents: payload};
        case APP_ACTION_TYPES.CLOSE_CONNECT_COMPONENTS:
            return {...state, connectComponents: false};
        case APP_ACTION_TYPES.ADD_ARROW:
            return {...state, arrows: new Map([...arrows, [payload.id, payload.data]])};
        case APP_ACTION_TYPES.REMOVE_ARROW:
            return {...state, components: payload.components, arrows: payload.arrows};
        case APP_ACTION_TYPES.MODIFY_COMPONENT_DATA:
            return {...state, components: payload};
        case APP_ACTION_TYPES.ADD_SOURCE_OUTPUT_REFS:
            return {...state, components: payload};
        case APP_ACTION_TYPES.TOGGLE_IS_DRAGGING:
            return {...state, isDragging: payload};
        case APP_ACTION_TYPES.TOGGLE_IS_DRAGGING_DISABLED:
            return {...state, isDraggingDisabled: payload};
        case APP_ACTION_TYPES.REMOVE_ALL:
            return {...state, ...resetState()}
        case APP_ACTION_TYPES.UPDATE_DEFAULT_COORDINATES:
            return {...state, ...payload};
        case APP_ACTION_TYPES.UPDATE_COMPONENT_LAST_COORDINATES:
            return {...state, components: new Map([...components, [payload.compID, {...components.get(payload.compID), coordinates: {...payload.coords}}]])};
        case APP_ACTION_TYPES.SHOW_ALL_TABLES:
            return {...state, showAllTables: true, hideAllTables: false};
        case APP_ACTION_TYPES.HIDE_ALL_TABLES:
            return {...state, showAllTables: false, hideAllTables: true};
        case APP_ACTION_TYPES.TOGGLE_COMPONENT_SHOW_TABLE:
            return {
                ...state,
                components: new Map([...components, [payload.compID, {...components.get(payload.compID), showTable: payload.showTable}]]),
                showAllTables: payload.showAllTables,
                hideAllTables: payload.hideAllTables
            };
    }
};
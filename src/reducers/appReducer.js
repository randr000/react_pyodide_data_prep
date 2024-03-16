import APP_ACTION_TYPES from "../action-types/appActionTypes";

export const APP_INITIAL_STATE = {
    nextID: 0,
    connectComponents: false,
    components: [],
    arrows: []
};

export const appReducer = (state, action) => {
    const {type, payload} = action;
    const {nextID, connectComponents, components, arrows} = state;
    switch(type) {
        case APP_ACTION_TYPES.ADD_DATA_COMPONENT:
            return {...state, nextID: nextID + 1, components: [...components, payload]};
        case APP_ACTION_TYPES.REMOVE_DATA_COMPONENT:
            return {...state, components: payload};
        case APP_ACTION_TYPES.OPEN_CONNECT_COMPONENTS:
            return {...state, connectComponents: payload};
        case APP_ACTION_TYPES.CLOSE_CONNECT_COMPONENTS:
            return {...state, connectComponents: false};
    }
};
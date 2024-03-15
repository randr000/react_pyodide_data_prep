import APP_ACTION_TYPES from "../action-types/appActionTypes";

export const APP_INITIAL_STATE = {
    nextID: 0,
    // components: [{type: 'FILE_UPLOAD', compID: '0'}, {type: 'FILE_UPLOAD', compID: '1'}],
    components: [],
    arrows: []
};

export const appReducer = (state, action) => {
    const {type, payload} = action;
    const {nextID, components, arrows} = state;
    switch(type) {
        case APP_ACTION_TYPES.ADD_DATA_COMPONENT:
            return {...state, nextID: nextID + 1, components: [...components, payload]};
        case APP_ACTION_TYPES.REMOVE_DATA_COMPONENT:
            return {...state, components: payload};
        
    }
};
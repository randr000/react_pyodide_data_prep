import APP_ACTION_TYPES from "../action-types/appActionTypes";

export const APP_INITIAL_STATE = {
    lastID: 0,
    // components: [{type: 'FILE_UPLOAD', compID: '0'}, {type: 'FILE_UPLOAD', compID: '1'}],
    components: [],
    arrows: []
};

export const appReducer = (state, action) => {
    const {type, payload} = action;
    const {components} = state;
    switch(type) {
        case APP_ACTION_TYPES.ADD_FILE_UPLOAD:
            return {...state, components: [...components, payload]};
        // case APP_ACTION_TYPES.REMOVE_FILE_UPLOAD:
        //     return {...state};
        // case APP_ACTION_TYPES.ADD:
        //     return {...state, lastID: lastID + 1};
        // case APP_A
    }
};
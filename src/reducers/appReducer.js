import APP_ACTION_TYPES from "../action-types/appActionTypes";

export const APP_INITIAL_STATE = {
    lastID: 0,
    components: [<div>1</div>, null, null, <div>not null</div>,<div>2</div>],
    arrows: []
};

export const appReducer = (state, action) => {
    const {type, payload} = action;

    switch(type) {
        case APP_ACTION_TYPES.ADD_FILE_UPLOAD:
            return {...state};
        // case APP_ACTION_TYPES.REMOVE_FILE_UPLOAD:
        //     return {...state};
        // case APP_ACTION_TYPES.ADD:
        //     return {...state, lastID: lastID + 1};
        // case APP_A
    }
};
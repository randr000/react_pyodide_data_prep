import APP_ACTION_TYPES from "../action-types/appActionTypes";
import sampleStates from "./sampleStates";

function resetState() {
    return {
        isDragging: false,
        isDraggingDisabled: false,
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
*   isDragging: bool - True means a data component is currently being dragged. Prevents click event from firing
                       after component is finished being dragged.
*   nextID: int - Would be the next value to use as a unique React component key for the data components
*   connectComponentes: bool - True means a user can click on another valid data component in order to
*                              create a connection between both of them and an arrow.
*
*   components: Array (Object) - An array of json objects whose properties are used to create the data components:
*       Ex.
*           type: string - states what data component to create and render
*           compID: int - used as the React component key as well as to keep track of connections between data components.
*           data: Object - A json formatted object containing the output table data of the component.
*           outputComponents: Set (int) - A set of integers stating which data components the data was outputted to.
*           sourceComponents: Set (int) - An set of integers containing the source(s) components where the input data is coming from.
*
*   arrows: Array (Object) - An array of json objects whose properties tell which two components to connect with an arrow.
*       Ex.
*           arrowID: string - A unique id used as the React component key. 
*                               Ex. '0-btm_1-top' Draws an arrow from the bottom data pill of component 0 to the top data pill
*                               of component 1.
*           start: string - The id of the sub component where the arrow starts from. Ex. '0-btm'
*           end: string - The id of the sub component where the arrow ends. Ex. '1-top'
*           compIDs: Set (int) - A set of two integers representing the ids of the connected data components. Ex. new Set([0, 1])
*/

export const appReducer = (state, action) => {
    const {type, payload} = action;
    const {nextID, connectComponents, components, arrows} = state;
    switch(type) {
        case APP_ACTION_TYPES.ADD_DATA_COMPONENT:
            return {...state, nextID: nextID + 1, components: new Map([...components, [nextID, payload]])};
        case APP_ACTION_TYPES.REMOVE_DATA_COMPONENT:
            return {...state, components: payload.components, arrows: payload.arrows};
        case APP_ACTION_TYPES.OPEN_CONNECT_COMPONENTS:
            return {...state, connectComponents: payload};
        case APP_ACTION_TYPES.CLOSE_CONNECT_COMPONENTS:
            return {...state, connectComponents: false};
        case APP_ACTION_TYPES.ADD_ARROW:
            return {...state, arrows: new Map([...arrows, [payload.id, payload.data]])};
        case APP_ACTION_TYPES.REMOVE_ARROW:
            return {...state, components: payload.components, arrows: payload.arrows}
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
    }
};
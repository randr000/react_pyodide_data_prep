import DATA_COMPONENT_TYPES from "../js/dataComponentTypes";

const sampleStates = {
    a: {
        nextID: 0,
        connectComponents: false,
        components: [],
        arrows: []
    },

    b: {
        nextID: 2,
        connectComponents: false,
        components: [
            {
                type: DATA_COMPONENT_TYPES.FILE_UPLOAD,
                compID: 0,
                outputComponents: new Set([1])
            },
            {
                type: DATA_COMPONENT_TYPES.FILTER_COLS,
                compID: 1,
                outputComponents: new Set([]),
                sourceComponents: new Set([0])
            }
        ],
        arrows: [
            {
                arrowID: '0-btm_1-top',
                start: '0-btm',
                end: '1-top',
                compIDs: new Set([0, 1])
            }
        ]
    },
    
    c: {
        nextID: 4,
        connectComponents: false,
        components: [
            {
                type: DATA_COMPONENT_TYPES.FILE_UPLOAD,
                compID: 0,
                outputComponents: new Set([1, 2, 3])
            },
            {
                type: DATA_COMPONENT_TYPES.FILTER_COLS,
                compID: 1,
                outputComponents: new Set([]),
                sourceComponents: new Set([0])
            },
            {
                type: DATA_COMPONENT_TYPES.FILTER_COLS,
                compID: 2,
                outputComponents: new Set([]),
                sourceComponents: new Set([0])
            },
            {
                type: DATA_COMPONENT_TYPES.FILTER_COLS,
                compID: 3,
                outputComponents: new Set([]),
                sourceComponents: new Set([0])
            }
        ],
        arrows: [
            {
                arrowID: '0-btm_1-top',
                start: '0-btm',
                end: '1-top',
                compIDs: new Set([0, 1])
            },
            {
                arrowID: '0-btm_2-top',
                start: '0-btm',
                end: '2-top',
                compIDs: new Set([0, 2])
            },
            {
                arrowID: '0-btm_3-top',
                start: '0-btm',
                end: '3-top',
                compIDs: new Set([0, 3])
            }
        ]
    }
};

export default sampleStates;
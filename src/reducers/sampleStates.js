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
    }
};

export default sampleStates;
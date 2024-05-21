import DATA_COMPONENT_TYPES from "../js/dataComponentTypes";

const sampleStates = {
    a: {
        isDragging: false,
        isDraggingDisabled: false,
        nextID: 0,
        connectComponents: false,
        components: new Map(),
        arrows: new Map(),

        defaultX: 0,
        defaultY: 0
    },

    b: {
        isDragging: false,
        nextID: 2,
        connectComponents: false,
        components: new Map([
            [0, {
                type: DATA_COMPONENT_TYPES.FILE_UPLOAD,
                compID: 0,
                outputComponents: new Set([1]),
                coordinates: {x: 300, y: 100}
            }],
            [1, {
                type: DATA_COMPONENT_TYPES.FILTER_COLS,
                compID: 1,
                outputComponents: new Set([]),
                sourceComponents: new Set([0]),
                coordinates: {x: 1000, y: 1000}
            }]
        ]),
        arrows: new Map([
            ['0-btm_1-top', {
                arrowID: '0-btm_1-top',
                start: '0-btm',
                end: '1-top',
                compIDs: new Set([0, 1])
            }]
        ]),

        defaultX: 0,
        defaultY: 0
    },
    
    c: {
        isDragging: false,
        nextID: 4,
        connectComponents: false,
        components: new Map([
            [0, {
                type: DATA_COMPONENT_TYPES.FILE_UPLOAD,
                compID: 0,
                outputComponents: new Set([1, 2, 3])
            }],
            [1, {
                type: DATA_COMPONENT_TYPES.FILTER_COLS,
                compID: 1,
                outputComponents: new Set([]),
                sourceComponents: new Set([0])
            }],
            [2, {
                type: DATA_COMPONENT_TYPES.FILTER_COLS,
                compID: 2,
                outputComponents: new Set([]),
                sourceComponents: new Set([0])
            }],
            [3, {
                type: DATA_COMPONENT_TYPES.FILTER_COLS,
                compID: 3,
                outputComponents: new Set([]),
                sourceComponents: new Set([0])
            }]
        ]),
        arrows: new Map([
            ['0-btm_1-top', {
                arrowID: '0-btm_1-top',
                start: '0-btm',
                end: '1-top',
                compIDs: new Set([0, 1])
            }],
            ['0-btm_2-top', {
                arrowID: '0-btm_2-top',
                start: '0-btm',
                end: '2-top',
                compIDs: new Set([0, 2])
            }],
            ['0-btm_3-top', {
                arrowID: '0-btm_3-top',
                start: '0-btm',
                end: '3-top',
                compIDs: new Set([0, 3])
            }]
        ])
    },

    d: {
        isDragging: false,
        nextID: 5,
        connectComponents: false,
        components: new Map([
            [0, {
                type: DATA_COMPONENT_TYPES.FILE_UPLOAD,
                compID: 0,
                outputComponents: new Set([1, 2, 3])
            }],
            [1, {
                type: DATA_COMPONENT_TYPES.FILTER_COLS,
                compID: 1,
                outputComponents: new Set([]),
                sourceComponents: new Set([0])
            }],
            [2, {
                type: DATA_COMPONENT_TYPES.FILTER_COLS,
                compID: 2,
                outputComponents: new Set([4]),
                sourceComponents: new Set([0])
            }],
            [3, {
                type: DATA_COMPONENT_TYPES.FILTER_COLS,
                compID: 3,
                outputComponents: new Set([]),
                sourceComponents: new Set([0])
            }],
            [4, {
                type: DATA_COMPONENT_TYPES.FILTER_COLS,
                compID: 4,
                outputComponents: new Set([]),
                sourceComponents: new Set([2])
            }]
        ]),
        arrows: new Map([
            ['0-btm_1-top', {
                arrowID: '0-btm_1-top',
                start: '0-btm',
                end: '1-top',
                compIDs: new Set([0, 1])
            }],
            ['0-btm_2-top', {
                arrowID: '0-btm_2-top',
                start: '0-btm',
                end: '2-top',
                compIDs: new Set([0, 2])
            }],
            ['0-btm_3-top', {
                arrowID: '0-btm_3-top',
                start: '0-btm',
                end: '3-top',
                compIDs: new Set([0, 3])
            }],
            ['2-btm_4-top', {
                arrowID: '2-btm_4-top',
                start: '2-btm',
                end: '4-top',
                compIDs: new Set([2, 4])
            }]
        ])
    },

    e: {
        isDragging: false,
        nextID: 3,
        connectComponents: false,
        components: new Map([
            [0, {
                type: DATA_COMPONENT_TYPES.FILE_UPLOAD,
                compID: 0,
                outputComponents: new Set([1])
            }],
            [1, {
                type: DATA_COMPONENT_TYPES.FILTER_COLS,
                compID: 1,
                outputComponents: new Set([]),
                sourceComponents: new Set([0])
            }],
            [2, {
                type: DATA_COMPONENT_TYPES.FILE_DOWNLOAD,
                compID: 2,
                sourceComponents: new Set([1])
            }]
        ]),
        arrows: new Map([
            ['0-btm_1-top', {
                arrowID: '0-btm_1-top',
                start: '0-btm',
                end: '1-top',
                compIDs: new Set([0, 1])
            }],
            ['1-btm_2-top', {
                arrowID: '1-btm_2-top',
                start: '1-btm',
                end: '2-top',
                compIDs: new Set([1, 2])
            }]
        ])
    },

    f: {
        isDragging: false,
        nextID: 1,
        connectComponents: false,
        components: new Map([
            [0, {
                type: DATA_COMPONENT_TYPES.FILE_UPLOAD,
                compID: 0,
                outputComponents: new Set([])
            }]
        ]),
        arrows: new Map()
    }
};

export default sampleStates;
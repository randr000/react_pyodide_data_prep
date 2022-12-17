import React,  { useState, useEffect } from 'react';

const DraggableComponent = () => {

    const [state, setState] = useState({
        diffX: 0,
        diffY: 0,
        dragging: false,
        styles: {
            position: "absolute",
            width: "12rem"
        }
    });

    function dragStart(event) {
        setState(prevState => ({
            ...prevState,
            diffX: event.screenX - event.currentTarget.getBoundingClientRect().left,
            diffY: event.screenY - event.currentTarget.getBoundingClientRect().top,
            dragging: true
        }));
    }

    function dragging(event) {
        
        if (state.dragging) {
        
            const left = event.screenX - state.diffX;
            const top = event.screenY - state.diffY;

            setState(prevState => ({
                ...prevState,
                styles: {
                    ...prevState.styles,
                    left: left,
                    top: top
                }
            }));

        }
    }

    function dragEnd() {
        setState(prevState => ({
            ...prevState,
            dragging: false
        }));
    }

    return (
        <div className="card" styles={state.styles} onPointerDown={dragStart} onPointerMove={dragging} onMouseUp={dragEnd}>
            <div className="card-body">
                <p className="card-text fs-1">Testing Dragging</p>
            </div>
        </div>
    );
};

export default DraggableComponent;
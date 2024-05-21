import React, { useContext, useEffect } from 'react';
import AppDataContext from '../context/AppDataContext';
import { dataComponentMaker } from '../js/functions';
import Xarrow, { useXarrow } from 'react-xarrows';
import DeleteArrow from './utilities/DeleteArrow';
import APP_ACTION_TYPES from '../action-types/appActionTypes';

const ContextTestComponentWrapper = () => {

    const {appState, dispatch} = useContext(AppDataContext);
    const {components, arrows} = appState;
    const updateXarrow = useXarrow();

    useEffect(() => {
        updateXarrow();
        console.log(`components: ${JSON.stringify(Object.fromEntries([...appState.components]),null,4)}`);
    }, [appState]);
    
    /**
     * Adjust the default x and y coordinates for a new data component when the user scrolls the page.
     * This allows a new component to appear on the top left of the current viewport regardless of where the user has
     * scrolled to.
     * 
     */
    function handleScroll() {
        dispatch({
            type: APP_ACTION_TYPES.UPDATE_DEFAULT_COORDINATES,
            payload: {defaultX: window.scrollX, defaultY: window.scrollY}
        });
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll); 
    }, []);

    return (
        <div>
            {Array.from(components.values()).map(c => <div key={c.compID}>{dataComponentMaker({type: c.type, compID: c.compID})}</div>)}
            {Array.from(arrows.values()).map(a => <Xarrow 
                key={a.arrowID}
                start={a.start}
                end={a.end}
                startAnchor='bottom'
                endAnchor='top'
                zIndex={0}
                labels={<DeleteArrow start={parseInt(a.start)} end={parseInt(a.end)} arrowID={a.arrowID}/>} />)}
        </div>
    );
};

export default ContextTestComponentWrapper;
import { useContext } from 'react';
import AppDataContext from '../context/AppDataContext';

const useGetComponentTargetData = (compID) => {

    const {appState} = useContext(AppDataContext);
    const {components} = appState;

    if (components.has(compID)) {

        const component = components.get(compID);

        if (component.hasOwnProperty('data')) return component.data;
    }

    return null;
}

export default useGetComponentTargetData;
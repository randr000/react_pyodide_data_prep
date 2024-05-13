import { useContext } from 'react';
import AppDataContext from '../context/AppDataContext';

const useGetComponentSourceData = (compID) => {

    const {appState} = useContext(AppDataContext);
    const {components} = appState;

    if (components.has(compID)) {

        const component = components.get(compID);

        if (component.hasOwnProperty('sourceComponents')) {

            const size = component.sourceComponents.size;

            if (size === 1) return components.get([...component.sourceComponents][0]).data
            else {
                const sourceDataArray = [];
                component.sourceComponents.forEach(id => {
                    const data = components.get(id).data;
                    data && sourceDataArray.push(JSON.parse(data))
                });
                return sourceDataArray.length ? JSON.stringify(sourceDataArray) : null;
            }
        }

    }

    return null;
}

export default useGetComponentSourceData;
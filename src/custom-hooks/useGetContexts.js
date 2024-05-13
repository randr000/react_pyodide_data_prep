import { useContext } from 'react';
import AppDataContext from '../context/AppDataContext';
import { PyodideContext } from '../context/PyodideContext';

const useGetContexts = () => {

    const {pyodide, isPyodideLoaded} = useContext(PyodideContext);
    const {appState, dispatch} = useContext(AppDataContext);
    return {pyodide, isPyodideLoaded, appState, dispatch};
};

export default useGetContexts;
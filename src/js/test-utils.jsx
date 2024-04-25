import React, { useReducer } from "react";
import { render } from "@testing-library/react";
import { Xwrapper } from "react-xarrows";
import AppDataContext from "../context/AppDataContext";
import { APP_INITIAL_STATE, appReducer } from "../reducers/appReducer";
import { PyodideContextWrapper } from "../context/PyodideContext";

const PyodideProvider = ({children}) => {

    const [appState, dispatch] = useReducer(appReducer, APP_INITIAL_STATE);
    
    return (
        <Xwrapper>
            <AppDataContext.Provider value={{appState: appState, dispatch: dispatch}}>
                <PyodideContextWrapper>
              
                    {children}
                
                </PyodideContextWrapper>
            </AppDataContext.Provider>
        </Xwrapper>
    );
};

const pyodideRender = (ui, options) => {
    render(ui, {wrapper: PyodideProvider, ...options});
};

const ContextProvider = ({children}) => {

    const [appState, dispatch] = useReducer(appReducer, APP_INITIAL_STATE);
    
    return (
        <Xwrapper>
            <AppDataContext.Provider value={{appState: appState, dispatch: dispatch}}>
                {children}
            </AppDataContext.Provider>
        </Xwrapper>
    );
};

const contextRender = (ui, options) => {
    render(ui, {wrapper: ContextProvider, ...options});
};

// re-export everything
export * from '@testing-library/react';

export { pyodideRender, contextRender };
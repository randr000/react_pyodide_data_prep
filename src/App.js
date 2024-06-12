import './App.css';
import { useReducer } from 'react';
import AppDataContext from './context/AppDataContext.jsx';
import { APP_INITIAL_STATE, appReducer } from './reducers/appReducer.js';
import DataComponentContainer from './components/DataComponentContainer.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import AppErrorFallback from './error-fallbacks/AppErrorFallback.jsx';
import ComponentErrorFallback from './error-fallbacks/ComponentErrorFallback.jsx';
import NavBar from './components/NavBar.jsx';
import { PyodideContextProvider } from './context/PyodideContext.jsx';
import { Xwrapper } from 'react-xarrows';


function App({toLoadPyodide=true}) {

  const [appState, dispatch] = useReducer(appReducer, APP_INITIAL_STATE);

  return (
    <ErrorBoundary fallback={<AppErrorFallback/>}>
      <Xwrapper>
        <AppDataContext.Provider value={{appState: appState, dispatch: dispatch}}>
          <NavBar/>
          <ErrorBoundary fallback={<ComponentErrorFallback/>}>
            <PyodideContextProvider toLoadPyodide={toLoadPyodide}>
              <DataComponentContainer />
            </PyodideContextProvider>
          </ErrorBoundary>
        </AppDataContext.Provider>
      </Xwrapper>
    </ErrorBoundary>
  );
}

export default App;

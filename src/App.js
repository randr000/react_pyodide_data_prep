import './App.css';
import { useReducer } from 'react';
import AppDataContext from './context/AppDataContext.jsx';
import { APP_INITIAL_STATE, appReducer } from './reducers/appReducer.js';
import ContextTestComponentWrapper from './components/ContextTestComponentWrapper.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import AppErrorFallback from './error-fallbacks/AppErrorFallback.jsx';
import ComponentErrorFallback from './error-fallbacks/ComponentErrorFallback.jsx';
import NavBar from './components/NavBar.jsx';
import { PyodideContextWrapper } from './context/PyodideContext.jsx';
import { Xwrapper } from 'react-xarrows';


function App({toLoadPyodide=true}) {

  const [appState, dispatch] = useReducer(appReducer, APP_INITIAL_STATE);

  return (
    <ErrorBoundary fallback={<AppErrorFallback/>}>
      <Xwrapper>
        <AppDataContext.Provider value={{appState: appState, dispatch: dispatch}}>
          <NavBar/>
          <ErrorBoundary fallback={<ComponentErrorFallback/>}>
            <PyodideContextWrapper toLoadPyodide={toLoadPyodide}>
              <ContextTestComponentWrapper />
            </PyodideContextWrapper>
          </ErrorBoundary>
        </AppDataContext.Provider>
      </Xwrapper>
    </ErrorBoundary>
  );
}

export default App;

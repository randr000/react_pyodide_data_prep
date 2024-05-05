import './App.css';
import { useReducer } from 'react';
import AppDataContext from './context/AppDataContext.jsx';
import { APP_INITIAL_STATE, appReducer } from './reducers/appReducer.js';
import APP_ACTION_TYPES from './action-types/appActionTypes.js';
import TestComponentWrapper from './components/TestComponentWrapper';
import ContextTestComponentWrapper from './components/ContextTestComponentWrapper.jsx';
import NavBar from './components/NavBar.jsx';
import { PyodideContextWrapper } from './context/PyodideContext.jsx';
import { Xwrapper } from 'react-xarrows';


function App({toLoadPyodide=false}) {

  const [appState, dispatch] = useReducer(appReducer, APP_INITIAL_STATE);

  return (
    <Xwrapper>
      <AppDataContext.Provider value={{appState: appState, dispatch: dispatch}}>
        <NavBar/>
        <PyodideContextWrapper toLoadPyodide={toLoadPyodide}>
          
            
          {/* <TestComponentWrapper /> */}
          <ContextTestComponentWrapper />
            
          
        </PyodideContextWrapper>
      </AppDataContext.Provider>
    </Xwrapper>
  );
}

export default App;

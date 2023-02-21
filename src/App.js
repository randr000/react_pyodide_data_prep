import './App.css';
import TestComponentWrapper from './component/TestComponentWrapper';
import NavBar from './component/NavBar.jsx';
import { PyodideContextWrapper } from './context/PyodideContext.jsx';
import { Xwrapper } from 'react-xarrows';


function App() {
  return (
    <>
      <NavBar/>
      <PyodideContextWrapper>
        <Xwrapper>
          <TestComponentWrapper />
        </Xwrapper>
      </PyodideContextWrapper>
    </>
  );
}

export default App;

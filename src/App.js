import logo from './logo.svg';
import './App.css';
import TestComponent from './component/TestComponent.jsx';
import NavBar from './component/NavBar.jsx';
import ImportCSV from './component/ImportCSV.jsx';
import ComponentContainer from './component/ComponentContainer.jsx';
import { PyodideContextWrapper } from './context/PyodideContext.jsx';


function App() {
  return (
    <>
      <NavBar/>
      <PyodideContextWrapper>
        <TestComponent b={5} />
        <ComponentContainer><ImportCSV/></ComponentContainer>
      </PyodideContextWrapper>
    </>
  );
}

export default App;

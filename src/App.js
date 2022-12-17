import logo from './logo.svg';
import './App.css';
import TestComponent from './component/TestComponent.jsx';
import NavBar from './component/NavBar.jsx';
import ImportCSV from './component/ImportCSV.jsx';
import DraggableComponent from './component/DraggableComponent.jsx';
import { PyodideContextWrapper } from './context/PyodideContext.jsx';


function App() {
  return (
    <>
      <NavBar/>
      <PyodideContextWrapper>
        <TestComponent b={5} />
        <ImportCSV/>
        <DraggableComponent />
      </PyodideContextWrapper>
    </>
  );
}

export default App;

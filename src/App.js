import logo from './logo.svg';
import './App.css';
import TestComponent from './component/TestComponent.jsx';
import NavBar from './component/NavBar.jsx';
import { PyodideContextWrapper } from './context/PyodideContext.jsx';

function App() {
  return (
    <>
      <NavBar/>
      <PyodideContextWrapper>
        <TestComponent b={5} />
      </PyodideContextWrapper>
    </>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import TestComponent from './component/TestComponent.jsx';
import TestComponentWrapper from './component/TestComponentWrapper';
import NavBar from './component/NavBar.jsx';
import FileUpload from './component/FileUpload';
import Filter from './component/Filter';
import ComponentContainer from './component/ComponentContainer.jsx';
import { PyodideContextWrapper } from './context/PyodideContext.jsx';


function App() {
  return (
    <>
      <NavBar/>
      <PyodideContextWrapper>
        {/* <TestComponent b={5} /> */}
        {/* <ComponentContainer>
          <FileUpload
            cardTitle="Import CSV"
            fileExtension="csv"
            iconClassNames="bi bi-filetype-csv"
          />
          <Filter
            jsonData={{}}
            cardTitle="Filter"
            iconClassNames="bi bi-funnel"
          />
        </ComponentContainer> */}
        <TestComponentWrapper />
      </PyodideContextWrapper>
    </>
  );
}

export default App;

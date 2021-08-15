import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import GlobalContextProvider from './Context/GlobalContext'
import Search from './components/Search'

function App() {
  return (
    <>
      <CssBaseline />
      <div className="App">
          <GlobalContextProvider>
            <Search />
          </GlobalContextProvider>
      </div>
    </>
  );
}

export default App;

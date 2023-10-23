import './App.css';
import ContactDetails from './Components/ContactDetails';
import Header from './Components/Header';
import {BrowserRouter,Routes,Route} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Header />}></Route>
      <Route path='/ContactDetails/:id' element={<ContactDetails />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

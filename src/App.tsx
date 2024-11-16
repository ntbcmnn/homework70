import './App.css';
import Toolbar from './components/Toolbar/Toolbar.tsx';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home.tsx';
import Add from './containers/Add/Add.tsx';
import Edit from './containers/Edit/Edit.tsx';

const App = () => (
  <>
    <Toolbar/>
    <div className="container m-5">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/contacts" element={<Home/>}/>
        <Route path="/contacts/add-contact" element={<Add/>}/>
        <Route path="/contacts/:contactId/edit" element={<Edit/>}/>
        <Route path="*" element={<h3 className="text-center">Page not found</h3>}/>
      </Routes>
    </div>
  </>
);

export default App;
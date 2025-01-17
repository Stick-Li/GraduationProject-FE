// import './App.css';
// import 'antd/dist/antd.min.css'
import './App.less';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/' element={<Admin />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

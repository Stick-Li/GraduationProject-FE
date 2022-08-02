// import './App.css';
// import 'antd/dist/antd.min.css'
import './App.less';

import { useRoutes } from 'react-router-dom';
import router from './routers';

// import Login from './pages/Login';
// import Admin from './pages/Admin';

function App() {

  const element = useRoutes(router)
  
  return (
    <>
      {/* <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/' element={<Admin />}></Route>
      </Routes> */}

      {element}
    </>
  );
}

export default App;

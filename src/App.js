// import './App.css';
// import 'antd/dist/antd.min.css'
import './App.less';

import { useRoutes, Link, Route, Routes } from 'react-router-dom';
import router from './routers';

// import Login from './pages/Login';
// import Admin from './pages/Admin';
// import Home from './pages/Home'
// import Role from './pages/Role'
// import User from './pages/User'
// import Declaration from './pages/Info/declaration';
// import TextRoute from './pages/TestRoute'
// import TextRoute2 from './pages/TestRoute/index2'
// import Login from './pages/Login';
// import MoreNotice from './pages/Notice/MoreNotice';

function App() {

  const element = useRoutes(router)

  return (
    <>

      {element}

      {/* <Link to='/home'>首页</Link><br />
      <Link to='/role'>规则</Link><br />
      <Link to='/user'>用户</Link><br /> */}
      {/* <Routes>
        <Route path='/' element={<Admin />}>
          <Route path='home' element={<Home />}></Route>
          <Route path='role' element={<Role />}></Route>
          <Route path='user' element={<User />}></Route>
          <Route path='declaration' element={<Declaration />}></Route>
          <Route path='test' element={<TextRoute />}>
            <Route path='test2' element={<TextRoute2 />}></Route>
          </Route>
          <Route path='/' element={<Home />}></Route>
        </Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/notice/more' element={<MoreNotice />}></Route>
        <Route path='*' element={<h1>要访问的页面不存在</h1>}></Route>
      </Routes> */}
    </>
  );
}

export default App;

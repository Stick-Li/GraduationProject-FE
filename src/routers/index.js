import { Navigate } from "react-router-dom";
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Role from "../pages/Role";
import User from '../pages/User';
import TextRoute from "../pages/TestRoute"
import TextRoute2 from '../pages/TestRoute/index2'
import Declaration from "../pages/Info/declaration";
import Notice from "../pages/Notice";
import MoreNotice from "../pages/Notice/MoreNotice";
// import First from '../pages/First'
import First from '../pages/FirstPage'
import TwoWaySelection from '../pages/TwoWaySelection'
import MyHooks from '../pages/MyHooks'
import TestSetState from '../pages/TestState/setState'
import TestUseState from '../pages/TestState/useState'
import Department from '../pages/Department'
import PersonalInfo from '../pages/PersonalInfo'
import Report from '../pages/Report'
import Xuantishenbao from "../pages/Files/xuantishenbao";
import Kaitibaogao from '../pages/Files/kaitibaogao'
import Zhongqijiancha from '../pages/Files/zhongqijiancha'
import Shenqingdabian from '../pages/Files/shenqingdabian'

const router = [
    {
        path: '/',
        element: <Admin />,
        children: [
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'role',
                element: <Role />
            },
            {
                path: 'department',
                element: <Department />
            },
            {
                path: 'user',
                element: <User />
            },
            {
                path: '/declaration',
                element: <Declaration />
            },
            {
                path: '/selection',
                element: <TwoWaySelection />
            },
            {
                path: '/report',
                element: <Report />
            },
            // 表们
            {
                path: '/xuantishenbao',
                element: <Xuantishenbao />
            },
            {
                path: '/kaitibaogao',
                element: <Kaitibaogao />
            },
            {
                path: '/zhongqijiancha',
                element: <Zhongqijiancha />
            },
            {
                path: '/shenqingdabian',
                element: <Shenqingdabian />
            },
            // 表们
            {
                path: 'test',
                element: <TextRoute />,
                children: [
                    {
                        path: 'test2',
                        element: <TextRoute2 />
                    },
                    // {
                    //     path: 'testsetstate',
                    //     element: <TestSetState />
                    // },
                    // {
                    //     path: 'testusestate',
                    //     element: <TestUseState />
                    // },
                ]
            },
            {
                path: 'myhooks',
                element: <MyHooks />
            },
            {
                path: '/',
                element: <Navigate to='home' />,
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/first',
        element: <First />
    },
    {
        path: 'personalinfo',
        element: <PersonalInfo />
    },
    {
        path: 'testsetstate',
        element: <TestSetState />
    },
    {
        path: 'testusestate',
        element: <TestUseState />
    },
    {
        path: '/notice',
        element: <Notice />,
    },
    {
        path: '/notice/more',
        element: <MoreNotice />,
    },
    {
        path: '*',
        // element: <Navigate to='/' />
        element: <h1>要访问的页面不存在</h1>
    }
]

export default router;
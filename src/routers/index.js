import { Navigate } from "react-router-dom";
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Role from "../pages/Role";
import User from '../pages/User';
import TextRoute from "../pages/TestRoute"
import Declaration from "../pages/Info/declaration";
import Notice from "../pages/Notice";

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
                path: 'user',
                element: <User />
            },
            // {
            //     path: 'one',
            //     element: <User />
            // },

            {
                path: '/declaration',
                element: <Declaration />
            },
            {
                path: 'test',
                element: <TextRoute />
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
        path: '/notice',
        element: <Notice />
    },
    {
        path: '*',
        // element: <Navigate to='/' />
        element: <h1>要访问的页面不存在</h1>
    }
]

export default router;
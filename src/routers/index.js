import { Navigate } from "react-router-dom";
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Role from "../pages/Role";
import TextRoute from "../pages/TestRoute"

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
                path: 'test2',
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
        path: '*',
        // element: <Navigate to='/' />
        element: <h1>要访问的页面不存在</h1>
    }
]

export default router;
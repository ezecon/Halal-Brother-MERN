import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../../Pages/Home/Home";
import Signup from "../../Pages/Signup/Signup";
import { Login } from "../../Pages/Login/Login";
import Products from "../../Pages/Products/Products";
import { AdminHome } from "../../Pages/Admin/Home/AdminHome";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/products',
                element: <Products />
            },
            {
                path: '/admin',
                element: <AdminHome />
            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: "/register",
        element: <Signup />,
    },
    {
        path: '*',
        element: <div>404 Not Found</div>
    }
]);

export default router;

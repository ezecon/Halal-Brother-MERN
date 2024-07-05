import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../../Pages/Home/Home";
import Signup from "../../Pages/Signup/Signup";
import { Login } from "../../Pages/Login/Login";
import Products from "../../Pages/Products/Products";
import { AdminHome } from "../../Pages/Admin/Home/AdminHome";
import Profile from "../../Pages/Customer/Profile/Profile";
import ProfileUpdate from "../../Pages/Customer/Profile/ProfileUpdate";


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
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/profile-update',
                element: <ProfileUpdate />
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

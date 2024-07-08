import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../../Pages/Home/Home";
import Signup from "../../Pages/Signup/Signup";
import { Login } from "../../Pages/Login/Login";
import Products from "../../Pages/Products/Products";
import { AdminHome } from "../../Pages/Admin/Home/AdminHome";
import Profile from "../../Pages/Customer/Profile/Profile";
import ProfileUpdate from "../../Pages/Customer/Profile/ProfileUpdate";
import Cart from "../../Pages/Cart.jsx/Cart";
import { Reservation } from "../../Pages/Reservation/Reservation";
import { Dashboard } from "../../Pages/Customer/Dashboard/Dashboard";
import Items from "../Items/Items";


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
                path: '/cart',
                element: <Cart/>
            },
            {
                path: '/check-items/:id',
                element: <Items/>
            },
            {
                path: '/reservation',
                element: <Reservation/>
            },
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
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

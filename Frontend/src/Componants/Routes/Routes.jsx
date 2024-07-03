import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../../Pages/Home/Home";
import { Login } from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
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

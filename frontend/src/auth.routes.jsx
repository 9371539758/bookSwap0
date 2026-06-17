import { createBrowserRouter } from "react-router-dom";
import Home from "./features/auth/pages/Home";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Landing from "./features/landing/pages/Landing";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />
    },
    {
        path: "/home",
        element: <Landing />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
]);

export default router;
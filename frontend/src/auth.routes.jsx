import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./features/auth/pages/Home";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Landing from "./features/landing/pages/Landing";
import AddBook from "./features/book/pages/AddBook";
import MyBooks from "./features/book/pages/MyBooks";
import Navbar from "./features/landing/components/Navbar";

const RootLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/home",
        element: <Landing />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/add-book",
        element: <AddBook />,
      },
      {
        path: "/my-books",
        element: <MyBooks />,
      },
    ],
  },
]);

export default router;
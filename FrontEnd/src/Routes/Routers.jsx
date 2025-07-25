import {
  createBrowserRouter,
} from "react-router-dom";

import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Privateroutes from "./Privateroutes";
import Secret from "../pages/Shared/secret/Secret";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/DashBoard/Cart/Cart";
import AlluSers from "../pages/DashBoard/Cart/Allusers/AlluSers";
import Additem from "../pages/DashBoard/Cart/AddItems/Additem";

export const router = createBrowserRouter([
  // Public Main Layout Routes
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "order/:category",
        element: <Order />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "secret",
        element: (
          <Privateroutes>
            <Secret />
          </Privateroutes>
        ),
      },
    ],
  },

  // Protected Dashboard Routes
  {
    path: "/dashboard",
    element: (
      <Privateroutes><Dashboard /></Privateroutes>


    ),
    children: [
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: 'addItems',
        element: <Additem></Additem>

      },
      {
        path: 'users',
        element: <AlluSers></AlluSers>
      }
    ],
  },
]);

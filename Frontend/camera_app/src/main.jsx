import React from "react";
import { useContext } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import HomePage from "./home_page";
import SearchPage from "./SearchPage";
import ShowCamera from "./ShowCamera";
import Data from "./components/data";
import Cart from "./cart.jsx";
import Login from "./login.jsx";
import Sign_up from "./sign_up.jsx";
import Openai_chatbot from "./components/second_chatbot.jsx";
import List_item from "./list_item.jsx";

import { CartContextProvider } from "./hooks/shopping_cart_context.jsx";
import { AuthContextProvider, AuthContext } from "./hooks/auth_context.jsx";
import { SearchContextProvider } from "./hooks/search_context.jsx";
import "./index.css";
import Profile from "./profile_page.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/search/:id",
    element: <SearchPage />,
  },

  {
    path: "/search/",
    element: <SearchPage />,
  },
  {
    path: "/camera/:id",
    element: <ShowCamera />,
  },
  {
    path: "/chatbot",
    element: <Data />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign_up",
    element: <Sign_up />,
  },
  {
    path: "/openai",
    element: <Openai_chatbot />,
  },
  {
    path: "/list_camera",
    element: <List_item />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <CartContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </CartContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

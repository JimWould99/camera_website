import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./home_page";
import SearchPage from "./SearchPage";
import ShowCamera from "./ShowCamera";
import Data from "./components/data";
import Cart from "./cart.jsx";
import { CartContextProvider } from "./shopping_cart_context";
import "./index.css";

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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </CartContextProvider>
  </React.StrictMode>
);

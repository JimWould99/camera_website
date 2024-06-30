import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./home_page";
import SearchPage from "./SearchPage";
import ShowCamera from "./ShowCamera";
import Chatbot from "./components/chatbot";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/camera/:id",
    element: <ShowCamera />,
  },
  {
    path: "/chatbot",
    element: <Chatbot />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

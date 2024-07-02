import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./home_page";
import SearchPage from "./SearchPage";
import ShowCamera from "./ShowCamera";
import Data from "./components/data";
import "./index.css";
import { ChatContextProvider } from "./chatContext";

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
    element: <Data />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChatContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </ChatContextProvider>
  </React.StrictMode>
);

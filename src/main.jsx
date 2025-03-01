import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";

// import { useState } from "react";
// import background from "./assets/ave maria.jpg";
import "./index.css";
import InputBox from "./components/input";
import ErrorPage from "./error-page";
import Result from "./components/result";
import Admin from "./components/admin";

const router = createHashRouter([
  {
    path: "/",
    element: <InputBox />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/song/:songId",
        element: <Result />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="main-content">
      <RouterProvider router={router} />
    </div>
  </StrictMode>
);

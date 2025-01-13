import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { useState } from "react";
// import background from "./assets/ave maria.jpg";
import "./index.css";
import InputBox from "./components/input";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="main-content">
      <InputBox />
    </div>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useState } from "react";
import "./index.css";
import InputBox from "./components/input";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <InputBox />
  </StrictMode>
);

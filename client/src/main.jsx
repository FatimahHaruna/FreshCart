import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import FreshCart from "./app";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FreshCart />
  </StrictMode>
);
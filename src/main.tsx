/**
 * node modules
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

/**
 * CSS link
 */
import "./index.css";

/**
 * components
 */
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

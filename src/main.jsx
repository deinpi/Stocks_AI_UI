import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/Authcontext";
import { DashboardProvider } from "./contexts/DashboardContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <DashboardProvider>
        <App />
      </DashboardProvider>
    </AuthProvider>
  </StrictMode>
);

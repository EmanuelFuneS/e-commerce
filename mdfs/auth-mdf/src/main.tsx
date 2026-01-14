import "@workspace/ui/styles/globals.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<RegisterPage />} />
        <Route path="/change-password" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

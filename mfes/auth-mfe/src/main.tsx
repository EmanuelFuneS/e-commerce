import "@workspace/ui/styles/globals.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import ChangePasswordPage from "./pages/change-password";
import ForgotPasswordPage from "./pages/forgot-password";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ResetPasswordPage from "./pages/reset-password";
import SuccessVerification from "./pages/success-verification";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/success" element={<SuccessVerification />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

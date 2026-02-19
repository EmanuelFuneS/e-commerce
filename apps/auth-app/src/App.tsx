import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router";

import ChangePasswordPage from "./pages/change-password";
import Layout from "./pages/layout";
import LoginPage from "./pages/login";
import RecoveryPasswordPage from "./pages/recovery-page";
import RegisterPage from "./pages/register";
import ResetPasswordPage from "./pages/reset-password";
import SuccessVerification from "./pages/success-verification";

const App = () => {
  return (
    <BrowserRouter basename="/auth">
      <AppRoutes />
    </BrowserRouter>
  );
};

const AppRoutes = () => {
  const location = useLocation();

  // trailingSlash
  if (location.pathname.match(/\/[^/]+$/)) {
    return <Navigate to={`${location.pathname}/`} replace />;
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/success/:id" element={<SuccessVerification />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/recovery-password" element={<RecoveryPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>
    </Routes>
  );
};

export default App;

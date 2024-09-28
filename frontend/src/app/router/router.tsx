import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "../../layout/auth-layout/auth-layout";
import ProtectedLayout from "../../layout/protected-layout/protected-layout";
import Dashboard from "../../pages/dashboard/dashboard";
import Login from "../../pages/login/login";
import NotFound from "../../pages/not-found/not-found";
import Products from "../../pages/products/products";
import Register from "../../pages/register/register";

const Router = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/dashboard" element={<ProtectedLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

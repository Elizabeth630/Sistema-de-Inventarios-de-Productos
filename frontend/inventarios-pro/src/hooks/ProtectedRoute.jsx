import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ user, redirectTo, children }) => {
  // Si el usuario no está logueado, lo redirigimos al login
  if (!user) {
    return <Navigate replace to={redirectTo} />;
  }
  return children ? children : <Outlet />;
};

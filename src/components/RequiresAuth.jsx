import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" state={{ from: location }} />;
};

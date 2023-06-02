import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { HookAuthType } from "../types/Auth";
const ProtectedRoute = ({ children }: any) => {
  const auth: HookAuthType = useAuth();

  if (!auth || !auth.user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

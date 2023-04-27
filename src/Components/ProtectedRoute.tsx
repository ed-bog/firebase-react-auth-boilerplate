import { Navigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }: { children: any }) => {
  const auth = authContext();
  const user = auth?.user;

  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }
  return children;
};

export default ProtectedRoute;

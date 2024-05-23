import { useAppSelector } from "../store/hooks";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoutes = () => {
  const { token } = useAppSelector((state) => state.auth);

  if (token) return <Navigate to="/todo" />;
  return <Outlet />;
};

export default AuthRoutes;

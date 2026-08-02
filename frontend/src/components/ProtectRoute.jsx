import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AppContext from "../context/ApiContext";

const ProtectdRoute = ({ children, anonymous = false }) => {
  const { isLoggedIn } = useContext(AppContext);

  const location = useLocation();
  const form = location.state?.form?.pathname || "/";

  if (isLoggedIn && anonymous) {
    return <Navigate to={form} replace />;
  }
  if (!isLoggedIn && !anonymous) {
    return <Navigate to="/login" state={{ form: location }} replace />;
  }

  return children
};

export default ProtectdRoute;
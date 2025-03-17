import { Navigate } from "react-router-dom";
import { privatePaths } from "../../config/routes";

const PublicRoute = ({ children }) => {
  if (localStorage.getItem("user") && localStorage.getItem("role")) {
    const role = localStorage.getItem("role");
    return (
      <Navigate
        to={privatePaths[role][Object.keys(privatePaths[role])[0]]}
        replace
      />
    );
  }

  return children;
};

export default PublicRoute;

import { Navigate } from "react-router-dom";
import { privatePaths } from "../../config/routes";

const PublicRoute = ({ children }) => {
  if (localStorage.getItem("email")) {
    console.log(
      "localStorage.getItem emil public",
      localStorage.getItem("email")
    );
    const role = localStorage.getItem("role");
    return (
      <Navigate
        // to={privatePaths[role][Object.keys(privatePaths[role])[0]]}
        to={privatePaths.dashbaord}
        replace
      />
    );
  }

  return children;
};

export default PublicRoute;

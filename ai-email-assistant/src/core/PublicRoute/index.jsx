import { Navigate } from "react-router-dom";
import { privatePaths } from "../../config/routes";

const PublicRoute = ({ children }) => {
  if (localStorage.getItem("email")) {
    return (
      <Navigate
        // to={privatePaths[role][Object.keys(privatePaths[role])[0]]}
        to={privatePaths.inbox}
        replace
      />
    );
  }

  return children;
};

export default PublicRoute;

import { Navigate } from "react-router-dom";
import { publicPaths } from "../../config/routes";
import Layout from "../../components/Layout";

const PrivateRoute = ({ children, setRole }) => {
  if (!localStorage.getItem("email")) {
    return <Navigate to={publicPaths.login} replace />;
  }

  return <Layout setRole={setRole}>{children}</Layout>;
};

export default PrivateRoute;

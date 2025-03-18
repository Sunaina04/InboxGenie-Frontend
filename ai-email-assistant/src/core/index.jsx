import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import LinearProgress from "@mui/material/LinearProgress";
import { privatePaths, publicPaths } from "../config/routes";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const LoginPage = lazy(() => import("../pages/login"));

const Dashboard = lazy(() => import("../pages/dashboard"));

const publicRoutes = [{ path: publicPaths.login, Component: <LoginPage /> }];

const privateRoutes = [
  {
    path: privatePaths.dashbaord,
    Component: <Dashboard />,
  },
];

const App = () => {
  const role = localStorage.getItem("role");

  return (
    <Suspense fallback={<LinearProgress />}>
      <Routes>
        {privateRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<PrivateRoute>{route.Component}</PrivateRoute>}
          />
        ))}
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<PublicRoute>{route.Component}</PublicRoute>}
          />
        ))}
        <Route path="*" element={<Navigate to={publicPaths.login} replace />} />
        <Route
          exact
          path="/"
          element={<Navigate to={publicPaths.login} replace />}
        />
      </Routes>
    </Suspense>
  );
};

export default observer(App);

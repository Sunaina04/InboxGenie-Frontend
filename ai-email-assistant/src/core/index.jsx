import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import LinearProgress from "@mui/material/LinearProgress";
import { privatePaths, publicPaths } from "../config/routes";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import LoginPage from "../pages/login";

const Inbox = lazy(() => import("../pages/inbox"));
const EmailDetail = lazy(() => import("../pages/emailDetail"));
const SentMails = lazy(() => import("../pages/SentMails"));
const HomePage = lazy(() => import("../pages/home"));

const publicRoutes = [{ path: publicPaths.login, Component: <LoginPage /> }];

const privateRoutes = [
  {
    path: privatePaths.home,
    Component: <HomePage />,
  },
  {
    path: privatePaths.inbox,
    Component: <Inbox />,
  },
  {
    path: privatePaths.email,
    Component: <EmailDetail />,
  },
  {
    path: privatePaths.sent,
    Component: <SentMails />,
  },
  {
    path: privatePaths.sentEmail,
    Component: <EmailDetail />,
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

// import { useEffect, useState } from "react";
// import { observer } from "mobx-react-lite";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Box, Typography } from "@mui/material";
// import { menuOptions } from "./arrays";
// import MenuItem from "./MenuItem";
// import { getStyles } from "./styles";
// import authStore from "../../stores/authStore";
// import Loading from "../Loading";
// import { LogoutOutlined } from "@mui/icons-material";

// const Layout = ({ children }) => {
//   const classes = getStyles();
//   const [menuRoutes, setMenuRoutes] = useState();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { logout, isLoadingUser, user } = authStore;

//   useEffect(() => {
//     setActive(menuRoutes?.find((item) => location.pathname === item.path));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [location, menuRoutes]);

//   useEffect(() => {
//     const menu = menuOptions()?.filter((menuItem) => menuItem);
//     setMenuRoutes(menu);
//   }, []); // No need to depend on `role` since it's not used

//   const [active, setActive] = useState(
//     menuRoutes?.find((item) => location.pathname === item.path)
//   );

//   const handleMenuItemClick = (route) => {
//     setActive(route);
//     navigate(route.path, { replace: true });
//   };

//   const isActive = (route) => {
//     return location.pathname.replace(/\/$/, "") === route.path;
//   };

//   const [isHovered, setIsHovered] = useState(false);
//   const handleMouseEnter = () => {
//     setIsHovered(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//   };

//   return isLoadingUser ? (
//     <Loading />
//   ) : (
//     <Box sx={classes.container}>
//       <Box
//         sx={classes.menu}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         <Box sx={classes.sideBarHeader}>
//           <img src={"LogoIcon"} alt="logo" />
//         </Box>
//         <Box sx={classes.sideBarContent}>
//           {menuRoutes &&
//             menuRoutes?.length !== 0 &&
//             menuRoutes?.map((route) => (
//               <MenuItem
//                 title={route?.menuTitle}
//                 hovered={isHovered}
//                 icon={route?.icon}
//                 disabled={route?.disabled}
//                 onClick={() => handleMenuItemClick(route)}
//                 active={isActive(route)}
//                 key={route?.id}
//               />
//             ))}

//           <Box
//             sx={classes.logout}
//             onClick={() => logout({ callback: navigate("/") })}
//           >
//             <LogoutOutlined />
//             <Typography variant="h6">Logout</Typography>
//           </Box>
//         </Box>
//       </Box>
//       <Box>
//         <Box sx={classes.content}>
//           <Box className="contentHeader">
//             <Box>
//               {active?.layoutIcon}
//               <Typography variant="h6">{active?.componentTitle}</Typography>
//             </Box>
//             <Box>{active?.toolbar && active?.toolbar}</Box>
//           </Box>
//           <Box className="contentBody">{children}</Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default observer(Layout);

import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  Badge,
  InputBase,
  IconButton,
} from "@mui/material";
import {
  LogoutOutlined,
  Notifications,
  Search,
  Tune,
} from "@mui/icons-material";
import { menuOptions } from "./arrays";
import MenuItem from "./MenuItem";
import authStore from "../../stores/authStore";
import Loading from "../Loading";
import "./layout.css";

const Layout = ({ children }) => {
  const [menuRoutes, setMenuRoutes] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, isLoadingUser, user } = authStore;

  useEffect(() => {
    setMenuRoutes(menuOptions()?.filter((menuItem) => menuItem));
  }, []);

  const isActive = (route) =>
    location.pathname.replace(/\/$/, "") === route.path;

  return isLoadingUser ? (
    <Loading />
  ) : (
    <Box className="layout-container">
      {/* Sidebar Navigation */}
      <Box className="sidebar">
        <Box className="sidebar-header">
          <img src={"/logo.png"} alt="logo" className="logo" />
        </Box>
        <Box className="sidebar-menu">
          {menuRoutes.map((route) => (
            <MenuItem
              key={route.id}
              title={route.menuTitle}
              icon={route.icon}
              active={isActive(route)}
              onClick={() => navigate(route.path, { replace: true })}
            />
          ))}
        </Box>
        <Box
          className="sidebar-footer logout-button"
          onClick={() => logout({ callback: navigate("/") })}
        >
          <LogoutOutlined className="logout-icon" />
          <Typography variant="h6">Logout</Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Box className="main-content">
        {/* Header */}
        <Box className="header">
          <Box className="search-bar">
            <Search className="search-icon" />
            <InputBase
              placeholder="Search or type a command"
              className="search-input"
            />
          </Box>
          <Box className="header-icons">
            <IconButton className="filter-icon">
              <Tune />
            </IconButton>
            <IconButton>
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <Avatar src={user?.avatar} className="avatar" />
          </Box>
        </Box>
        <Box className="content-body">{children}</Box>
      </Box>
    </Box>
  );
};

export default observer(Layout);

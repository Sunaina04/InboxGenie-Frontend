import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { menuOptions } from "./arrays";
import MenuItem from "./MenuItem";
import { getStyles } from "./styles";
import authStore from "../../stores/authStore";
import Loading from "../Loading";

const Layout = ({ children }) => {
  const classes = getStyles();
  const [menuRoutes, setMenuRoutes] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, isLoadingUser, user } = authStore;

  useEffect(() => {
    setActive(menuRoutes?.find((item) => location.pathname === item.path));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, menuRoutes]);

  useEffect(() => {
    const menu = menuOptions()?.filter((menuItem) => menuItem);
    setMenuRoutes(menu);
  }, []); // No need to depend on `role` since it's not used

  const [active, setActive] = useState(
    menuRoutes?.find((item) => location.pathname === item.path)
  );

  const handleMenuItemClick = (route) => {
    setActive(route);
    navigate(route.path, { replace: true });
  };

  const isActive = (route) => {
    return location.pathname.replace(/\/$/, "") === route.path;
  };

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return isLoadingUser ? (
    <Loading />
  ) : (
    <Box sx={classes.container}>
      <Box
        sx={classes.menu}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box sx={classes.sideBarHeader}>
          <img src={"LogoIcon"} alt="logo" />
        </Box>
        <Box sx={classes.sideBarContent}>
          {menuRoutes &&
            menuRoutes?.length !== 0 &&
            menuRoutes?.map((route) => (
              <MenuItem
                title={route?.menuTitle}
                hovered={isHovered}
                icon={route?.icon}
                disabled={route?.disabled}
                onClick={() => handleMenuItemClick(route)}
                active={isActive(route)}
                key={route?.id}
              />
            ))}

          <Box
            sx={classes.logout}
            onClick={() => logout({ callback: navigate("/") })}
          >
            <Typography variant="h6">Logout</Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box sx={classes.content}>
          <Box className="contentHeader">
            <Box>
              {active?.layoutIcon}
              <Typography variant="h6">{active?.componentTitle}</Typography>
            </Box>
            <Box>{active?.toolbar && active?.toolbar}</Box>
          </Box>
          <Box className="contentBody">{children}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default observer(Layout);

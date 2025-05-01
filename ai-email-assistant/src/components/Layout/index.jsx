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
  Settings,
} from "@mui/icons-material";
import { menuOptions } from "./arrays";
import MenuItem from "./MenuItem";
import authStore from "../../stores/authStore";
import Loading from "../Loading";
import "./layout.css";
import genbootLogo from "../../images/genboot_logo.png";

const Layout = ({ children }) => {
  const [menuRoutes, setMenuRoutes] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, isLoadingUser, fetchEmails } = authStore;

  useEffect(() => {
    setMenuRoutes(menuOptions()?.filter((menuItem) => menuItem));
    fetchEmails({ inquire: false });
  }, [fetchEmails]);

  const parsedEmails = JSON.parse(localStorage.getItem("email")) || [];
  const recentEmails = Array.isArray(parsedEmails) ? parsedEmails.slice(0, 3) : [];

  const isActive = (route) =>
    location.pathname.replace(/\/$/, "") === route.path;

  const getSenderName = (sender) => {
    if (!sender) return 'Unknown Sender';
    const match = sender.match(/(.*)<(.*)>/);
    return match ? match[1].trim() : sender;
  };

  const handleEmailClick = (email) => {
    navigate(`/email/${email.id}`, {
      state: { email },
      replace: true
    });
  };

  const getUserInfo = () => {
    const userStr = localStorage.getItem("userInfo");
    if (userStr) {
      const user = JSON.parse(userStr);
      return {
        name: user.name || "User",
        email: user.email || ""
      };
    }
    return { name: "User", email: "" };
  };

  const userInfo = getUserInfo();

  return isLoadingUser ? (
    <Loading />
  ) : (
    <Box className="layout-container" sx={{
      backgroundColor: "#f5f5f5",
      height: "100vh",
      overflow: "hidden",
      padding: "10px",
    }}>
      {/* Sidebar Navigation */}
      <Box className="sidebar" sx={{
        padding: "16px",
        margin: "18px",
        backgroundColor: "#fff",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        height: "calc(100vh - 40px)",
        overflowY: "auto",
      }}>
        <Box className="sidebar-header">
          <img src={genbootLogo} alt="GENBOOT" className="logo" />
        </Box>

        {/* Add Dashboard heading */}
        <Typography
          variant="h6"
          sx={{
            padding: "16px 20px",
            color: "#333",
            fontWeight: 500,
            fontSize: "18px"
          }}
        >
          DASHBOARD
        </Typography>

        {/* Main Menu Items */}
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

          {/* Recent Mails Section inside sidebar-menu */}
          <Box className="recent-mails-section" sx={{
            mt: 3,
            padding: "0 20px"
          }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#666",
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "uppercase",
                marginBottom: "12px"
              }}
            >
              RECENT MAILS
            </Typography>
            {recentEmails.length > 0 ? (
              recentEmails.map((email) => (
                <Box
                  className="recent-mail-item"
                  key={email.id}
                  onClick={() => handleEmailClick(email)}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    padding: "12px",
                    cursor: "pointer",
                    borderRadius: "8px",
                    mb: 1,
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)"
                    }
                  }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      marginRight: "12px",
                      bgcolor: "#5932EA",
                      color: "#fff"
                    }}
                  >
                    {email.from?.charAt(0)}
                  </Avatar>
                  <Box sx={{ flex: 1, overflow: "hidden" }}>
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#333",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {getSenderName(email.from)}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#666",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {email.subject || 'No subject'}
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography sx={{ color: "#666", fontSize: "12px" }}>
                No recent emails found
              </Typography>
            )}
          </Box>
        </Box>
        {/* Settings Section in Footer */}
        <Box sx={{
          marginTop: "auto", // Push to bottom
          padding: "20px"
        }}>
          <Typography
            variant="subtitle2"
            sx={{
              color: "#666",
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "uppercase",
              marginBottom: "12px"
            }}
          >
            SETTINGS
          </Typography>

          {/* Settings Menu Item */}
          <MenuItem
            title="Settings"
            icon={<Settings />}
            active={isActive({ path: "/settings" })}
            onClick={() => navigate("/settings")}
          />

          {/* Logout Button with red text */}
          <Box
            className="logout-button"
            onClick={() => logout({ callback: () => navigate("/login") })}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "12px",
              gap: "12px",
              cursor: "pointer",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)"
              }
            }}
          >
            <LogoutOutlined sx={{ color: "#FF4D4F" }} />
            <Typography sx={{ color: "#FF4D4F" }}>
              Logout
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box className="main-content">
        {/* Header */}
        <Box className="header">
          {/* Greeting */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            marginRight: '20px'
          }}>
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#333',
                marginLeft: '25px',
                textTransform: 'capitalize',
              }}
            >
              Hello, {userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1).toLowerCase()}
            </Typography>
          </Box>

          {/* Search Bar */}
          <Box className="search-bar">
            <Search className="search-icon" />
            <InputBase
              placeholder="Search or type a command"
              className="search-input"
            />
          </Box>

          {/* Header Icons */}
          <Box className="header-icons">
            <IconButton className="filter-icon">
              <Tune />
            </IconButton>
            <IconButton>
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            {/* Avatar section */}
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <Avatar
                sx={{
                  bgcolor: '#20B2AA',
                  width: 35,
                  height: 35,
                  marginLeft: '20px',
                  fontSize: '16px',
                  fontWeight: 500
                }}
              >
                {userInfo.name?.charAt(0)}
              </Avatar>
              <Typography
                sx={{
                  fontSize: '11px',
                  color: '#666',
                  mt: 0.5
                }}
              >
                {userInfo.email}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Content Body with Scroll */}
        <Box className="content-body">
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default observer(Layout);

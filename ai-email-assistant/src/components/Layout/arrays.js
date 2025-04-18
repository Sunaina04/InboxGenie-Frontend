import { SendOutlined, Settings, DraftsOutlined } from "@mui/icons-material";
import { privatePaths } from "../../config/routes";
import InboxIcon from "@mui/icons-material/Inbox";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import HomePage from "../../pages/home";
// import CreateIcon from "@mui/icons-material/Create";
// import SettingsIcon from "@mui/icons-material/Settings";

export const menuOptions = () => [
  {
    id: "mainPage",
    menuTitle: "Home",
    icon: <MailOutlineIcon />,
    path: privatePaths.home,
  },
 
  {
    id: "inbox",
    menuTitle: "Inbox",
    path: privatePaths.inbox,
    icon: <InboxIcon />,
    path: privatePaths.inbox,
  },
  {
    id: "compose",
    menuTitle: "Drafts",
    path: privatePaths.compose, // Define this path in your routes
    icon: <DraftsOutlined />, // Adding the DraftsOutlined icon
  },
  {
    id: "sentMails",
    menuTitle: "Sent",
    path: privatePaths.sent,
    icon: <SendOutlined />,
  },

  {
    id: "settings",
    menuTitle: "Settings",
    path: privatePaths.settings, // Define this path in your routes
    icon: <Settings />, // Use MUI icon for Settings
  },
];

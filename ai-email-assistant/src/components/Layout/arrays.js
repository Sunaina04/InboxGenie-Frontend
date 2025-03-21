import { SendOutlined } from "@mui/icons-material";
import { privatePaths } from "../../config/routes";
import InboxIcon from "@mui/icons-material/Inbox";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import CreateIcon from "@mui/icons-material/Create";
// import SettingsIcon from "@mui/icons-material/Settings";

export const menuOptions = () => [
  // {
  //   id: "mainPage",
  //   layoutTitle: "Homepage",
  //   menuTitle: "Main Page",
  //   componentTitle: "Dashboard",
  //   layoutTooltip: true,
  //   componentTooltip: false,
  //   icon: <MailOutlineIcon />,
  //   path: privatePaths.dashbaord,
  // },

  {
    id: "inbox",
    menuTitle: "Inbox",
    path: privatePaths.inbox, // Define this path in your routes
    icon: <InboxIcon />, // Use MUI icon
    componentTitle: "Inbox - View Emails",
    path: privatePaths.inbox,
  },
  {
    id: "sentMails",
    menuTitle: "Sent",
    path: privatePaths.sent,
    icon: <SendOutlined />,
    componentTitle: "Sent Items",
  },
  // {
  //   id: "compose",
  //   menuTitle: "Compose",
  //   path: privatePaths.compose, // Define this path in your routes
  //   // icon: <CreateIcon />, // Use MUI icon for Compose
  //   componentTitle: "Compose Email - Write New Email",
  // },
  // {
  //   id: "settings",
  //   menuTitle: "Settings",
  //   path: privatePaths.settings, // Define this path in your routes
  //   // icon: <SettingsIcon />, // Use MUI icon for Settings
  //   componentTitle: "Settings - Manage Preferences",
  // },
];

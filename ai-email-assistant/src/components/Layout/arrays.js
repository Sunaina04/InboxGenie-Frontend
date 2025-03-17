import { privatePaths } from "../../config/routes";

export const menuOptions = () => ({
  admin: [
    {
      id: "mainPage",
      layoutTitle: "Homepage",
      menuTitle: "Main Page",
      componentTitle: "Dashboard",
      layoutTooltip: true,
      componentTooltip: false,
      path: privatePaths.admin.dashbaord,
    },
  ],
});

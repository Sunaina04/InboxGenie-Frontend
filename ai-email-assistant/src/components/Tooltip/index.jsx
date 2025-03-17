import { Box, styled, Tooltip } from "@mui/material";

import theme from "config/theme";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }}>
    <Box className={className}>
      {props.children}
    </Box>
  </Tooltip>
))(() => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: theme.palette.main.darkPurple,
    color: theme.palette.secondary.white,
    fontSize: "12px",
    fontFamily: "Lato",
    borderRadius: "8px",
    padding: "20px 15px",
  },
  [`& .MuiTooltip-arrow`]: {
    color: theme.palette.main.darkPurple,
  },
}));

export default CustomTooltip;

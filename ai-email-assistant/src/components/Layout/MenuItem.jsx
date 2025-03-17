import { Box, Typography } from "@mui/material";

import { getMenuItemStyles } from "./styles";

const MenuItem = ({
  active,
  hovered,
  icon,
  title,
  disabled = false,
  onClick,
  ...props
}) => {
  const classes = getMenuItemStyles(active, disabled);

  const handleClick = () => {
    if (disabled) return;
    onClick();
  };
  return (
    <Box sx={classes.wrapper} onClick={handleClick} {...props}>
      {icon}
      <Typography variant="h6">{title}</Typography>
    </Box>
  );
};

export default MenuItem;

import { observer } from "mobx-react-lite";

import jsonStore from "stores/jsonStore";

import { Typography, Box } from "@mui/material";
import CustomTooltip from "components/Tooltip";
import TooltipIcon from "commonComponents/TooltipIcon";

const Title = ({ classes, active, layoutTooltip }) => {
  const { tooltipData, isLoadingTooltipData } = jsonStore;

  return (
    <Box sx={classes.headerTitle}>
      <Typography>{active?.layoutTitle}</Typography>
      {!isLoadingTooltipData && layoutTooltip && (
        <CustomTooltip
          placement="bottom"
          title={tooltipData?.pageTooltip}
          arrow
          className="tooltipIcon"
        >
          <TooltipIcon />
        </CustomTooltip>
      )}
    </Box>
  );
};

export default observer(Title);

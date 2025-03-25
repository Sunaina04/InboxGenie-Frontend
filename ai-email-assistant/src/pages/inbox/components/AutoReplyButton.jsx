import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import aiResponseStore from "../../../stores/aiResponseStore";

const AutoReplyButton = ({ isEnabled }) => {
  const [loading, setLoading] = useState(false);

  const handleAutoReply = async () => {
    if (isEnabled) {
      setLoading(true);
      try {
        await aiResponseStore.triggerAutoReply(); // Trigger the auto-reply
      } catch (error) {
        console.error("Error triggering auto-reply:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        marginTop: "16px",
        borderRadius: "24px",
        fontWeight: 600,
        fontSize: "14px",
        width: "100%",
        backgroundColor: "#007aff",
        "&:hover": {
          backgroundColor: "#0062cc",
        },
      }}
      disabled={!isEnabled || loading}
      onClick={handleAutoReply}
    >
      {loading ? (
        <CircularProgress size={24} sx={{ color: "#fff" }} />
      ) : (
        "Auto Reply"
      )}
    </Button>
  );
};

export default AutoReplyButton;

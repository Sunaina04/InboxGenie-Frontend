import React from "react";
import { Box, Paper, Typography, Button, Chip } from "@mui/material";
import { ArrowForward, Reply, Forward } from "@mui/icons-material";

const EmailCard = ({ email, handleAIResponse, handleReply, handleForward }) => {
  const getUrgencyLevel = (emailBody) =>
    emailBody.includes("urgent") ? "High" : "Low";

  return (
    <Paper
      sx={{
        padding: 3,
        borderRadius: 2,
        backgroundColor: "#ffffff",
        boxShadow: 2,
        mb: 3,
        // width: "auto",
        // maxWidth: "auto",
        // minHeight: "600px",
        // height: "auto",
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      <Typography
        variant="h6"
        color="primary"
        fontWeight={600}
        sx={{ marginBottom: 1 }}
      >
        {email.subject || "No Subject"}
      </Typography>

      <Box display="flex" justifyContent="space-between" my={1}>
        <Typography variant="body2" color="textSecondary">
          <strong>From:</strong> {email.from}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {new Date(email.date).toLocaleString()}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" my={1}>
        <Chip
          label={getUrgencyLevel(email.body)}
          color={getUrgencyLevel(email.body) === "High" ? "error" : "primary"}
          size="small"
          sx={{
            fontWeight: 600,
            textTransform: "uppercase",
            height: 24,
          }}
        />
      </Box>

      <Typography
        variant="body2"
        color="textSecondary"
        sx={{
          whiteSpace: "pre-line",
          color: "#333",
          marginBottom: 3,
          lineHeight: 1.6,
        }}
      >
        {email.body.slice(0, 200) + (email.body.length > 200 ? "..." : "")}
      </Typography>

      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ marginTop: "20rem" }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAIResponse(email)}
          sx={{
            textTransform: "none",
            paddingX: 4,
            fontWeight: 600,
            borderRadius: 2,
            backgroundColor: "#1e88e5",
            "&:hover": {
              backgroundColor: "#1976d2",
            },
          }}
          endIcon={<ArrowForward />}
        >
          Generate Response
        </Button>

        <Box display="flex" alignItems="center">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleReply(email)}
            sx={{
              textTransform: "none",
              marginLeft: 1,
              fontWeight: 600,
              borderRadius: 2,
            }}
            startIcon={<Reply />}
          >
            Reply
          </Button>

          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleForward(email)}
            sx={{
              textTransform: "none",
              marginLeft: 1,
              fontWeight: 600,
              borderRadius: 2,
            }}
            startIcon={<Forward />}
          >
            Forward
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default EmailCard;

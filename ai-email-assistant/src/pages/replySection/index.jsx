import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  IconButton,
  TextareaAutosize,
} from "@mui/material";
import { Send, Close } from "@mui/icons-material";
import emailStore from "../../stores/emailStore";
import toast from "react-hot-toast";

const ReplySection = ({ email, handleSendReply, handleCancel, aiResponse }) => {
  const [replyText, setReplyText] = useState(aiResponse || "");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [toEmail, setToEmail] = useState(email.from);
  const [subject, setSubject] = useState(email.subject);

  useEffect(() => {
    setReplyText(aiResponse || "");
  }, [aiResponse]);

  const handleSendEmail = async () => {
    setLoading(true);

    if (!email) {
      toast.error("No email selected.");
      setLoading(false);
      return;
    }

    try {
      await emailStore.sendEmail({
        to: toEmail,
        from: email.to,
        subject: subject,
        body: replyText,
      });

      toast.success("Reply sent successfully!");
      setLoading(false);
      handleCancel();
    } catch (error) {
      toast.error("Failed to send the reply. Please try again.");
      console.error("Email sending error:", error);
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    handleSendReply(replyText);
  };

  return (
    <Paper
      sx={{
        padding: 3,
        borderRadius: 2,
        backgroundColor: "#f9f9f9",
        boxShadow: 4,
        mt: 3,
        border: "1px solid #ddd",
        position: "relative",
      }}
    >
      <IconButton
        onClick={handleCancel}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          color: "#999",
        }}
      >
        <Close />
      </IconButton>

      <Typography variant="body2" fontWeight={600} gutterBottom>
        Replying to {email.from}
      </Typography>

      {isEditing ? (
        <TextField
          label="To"
          fullWidth
          value={toEmail}
          onChange={(e) => setToEmail(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
      ) : (
        <Typography variant="body2" sx={{ marginBottom: 2 }}>
          To: {toEmail}
        </Typography>
      )}

      {isEditing ? (
        <TextField
          label="Subject"
          fullWidth
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
      ) : (
        <Typography variant="body2" sx={{ marginBottom: 2 }}>
          Subject: {subject}
        </Typography>
      )}

      {isEditing ? (
        <TextareaAutosize
          fullWidth
          minRows={6}
          maxRows={10}
          placeholder="Write your reply..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          sx={{
            backgroundColor: "#fff",
            borderRadius: 1,
            padding: "12px",
            fontSize: "14px",
            lineHeight: "1.5",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            minHeight: "150px",
            overflowY: "auto",
          }}
        />
      ) : (
        <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
          {replyText}
        </Typography>
      )}

      <Box display="flex" justifyContent="flex-end" mt={2}>
        {!isEditing ? (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCancel}
              sx={{ marginRight: 1 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEdit}
              disabled={loading}
            >
              Edit
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCancel}
              sx={{ marginRight: 1 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={loading}
            >
              Save
            </Button>
          </>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSendEmail}
          endIcon={<Send />}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </Button>
      </Box>
    </Paper>
  );
};

export default ReplySection;

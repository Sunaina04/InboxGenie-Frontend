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
  // States to manage the reply content
  const [replyText, setReplyText] = useState(aiResponse || "");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // New states for editing "to" and "subject"
  const [toEmail, setToEmail] = useState(email.from); // Default to "from" email
  const [subject, setSubject] = useState(email.subject); // Default to current email subject

  // Effect to initialize reply text based on AI response
  useEffect(() => {
    setReplyText(aiResponse || "");
  }, [aiResponse]);

  // Handle sending the email
  const handleSendEmail = async () => {
    setLoading(true);

    // Ensure an email is selected
    if (!email) {
      toast.error("No email selected.");
      setLoading(false);
      return;
    }

    // Send the email using emailStore
    try {
      await emailStore.sendEmail({
        to: toEmail,
        from: email.to, // Keep original "from" address
        subject: subject,
        body: replyText, // Send the modified replyText
      });

      toast.success("Reply sent successfully!");
      setLoading(false);
      handleCancel(); // Close the reply box after sending
    } catch (error) {
      toast.error("Failed to send the reply. Please try again.");
      console.error("Email sending error:", error);
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true); // Enable editing mode
  };

  const handleSave = () => {
    setIsEditing(false); // Save changes and exit editing mode
    handleSendReply(replyText); // Optionally pass replyText to parent
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
        position: "relative", // Position the close button
      }}
    >
      {/* Close button */}
      <IconButton
        onClick={handleCancel}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          color: "#999", // Light color for the close button
        }}
      >
        <Close />
      </IconButton>

      <Typography variant="body2" fontWeight={600} gutterBottom>
        Replying to {email.from}
      </Typography>

      {/* Editable "To" field */}
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

      {/* Editable "Subject" field */}
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

      {/* Conditionally render TextField based on editing state */}
      {isEditing ? (
        <TextareaAutosize
          fullWidth
          minRows={6} // Increase the minRows value for more height
          maxRows={10} // Optional, limit the number of rows
          placeholder="Write your reply..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)} // Handle text change
          sx={{
            backgroundColor: "#fff",
            borderRadius: 1,
            padding: "12px", // Add padding for better spacing
            fontSize: "14px", // Control font size for better readability
            lineHeight: "1.5", // Improve readability
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            minHeight: "150px", // Set a minimum height for the field
            overflowY: "auto", // Enable scroll if the content exceeds the max height
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
              color="secondary"
              onClick={handleCancel}
              sx={{ marginRight: 1 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEdit} // Enable edit mode
              disabled={loading} // Disable while sending
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
              onClick={handleSave} // Save changes
              disabled={loading} // Disable while sending
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
          disabled={loading} // Disable button while loading
        >
          {loading ? "Sending..." : "Send"}
        </Button>
      </Box>
    </Paper>
  );
};

export default ReplySection;

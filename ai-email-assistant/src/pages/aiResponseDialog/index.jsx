import React, { useState, useEffect } from "react";
import { Dialog } from "@mui/material";
import emailStore from "../../stores/emailStore";
import DialogHeader from "../../components/DialogHeader";
import DialogContentSection from "./components/DialogContentSection";
import ToastMessage from "../../components/ToastMessage";
import DialogActionsSection from "./components/DialogActionsSection";

const AIResponseDialog = ({
  open,
  email,
  handleClose,
  aiResponse,
  handleApprove,
  openInEditMode = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedResponse, setEditedResponse] = useState(aiResponse);
  const [editedSender, setEditedSender] = useState(email ? email.from : "");
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setEditedResponse(aiResponse);
    setEditedSender(email ? email.from : "");
    setLoading(false);
    setIsEditing(openInEditMode); 
  }, [aiResponse, open, email, openInEditMode]);

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    handleApprove(editedResponse, editedSender);
    setIsEditing(false);
    setToastMessage("Response saved successfully!");
    setIsSuccess(true);
  };

  const handleSendClick = () => {
    setLoading(true);

    if (!email) {
      setToastMessage("No email selected.");
      setIsSuccess(false);
      setLoading(false);
      return;
    }

    const responseToSend = isEditing ? editedResponse : aiResponse;

    emailStore
      .sendEmail({
        to: email.from,
        from: editedSender,
        subject: email.subject,
        body: responseToSend,
      })
      .then(() => {
        setToastMessage("Email sent successfully!");
        setIsSuccess(true);
        setLoading(false);
        handleClose();
      })
      .catch((error) => {
        setToastMessage("Failed to send email. Please try again.");
        setIsSuccess(false);
        setLoading(false);
      });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogHeader handleClose={handleClose} />
      <DialogContentSection
        isEditing={isEditing}
        editedSender={editedSender}
        editedResponse={editedResponse}
        aiResponse={aiResponse}
        setEditedSender={setEditedSender}
        setEditedResponse={setEditedResponse}
      />
      <DialogActionsSection
        isEditing={isEditing}
        handleEdit={handleEdit}
        handleSave={handleSave}
        handleSendClick={handleSendClick}
        loading={loading}
        handleApprove={handleApprove}
      />
      <ToastMessage message={toastMessage} success={isSuccess} />
    </Dialog>
  );
};

export default AIResponseDialog;

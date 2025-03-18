import React, { useState } from "react";
import EmailListItem from "../emailListItem";

const emails = [
  {
    id: 1,
    sender: "John Doe",
    subject: "Support Request - Issue with Order #123",
    bodySnippet: "I need help with my recent order.",
    date: "2025-03-18",
    isRead: false,
  },
  {
    id: 2,
    sender: "Jane Smith",
    subject: "Inquiry - Product Information",
    bodySnippet: "Could you provide more details on the product?",
    date: "2025-03-17",
    isRead: true,
  },
];

const EmailList = () => {
  const [emailList, setEmailList] = useState(emails);

  const handleAIResponseClick = (emailId) => {
    console.log("Generate AI response for email ID:", emailId);
  };

  return (
    <div>
      {emailList.map((email) => (
        <EmailListItem
          key={email.id}
          email={email}
          onAIResponseClick={handleAIResponseClick}
        />
      ))}
    </div>
  );
};

export default EmailList;

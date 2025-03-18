import React from "react";

const EmailListItem = ({ email, onAIResponseClick }) => {
  return (
    <div
      className={`bg-gray-50 p-4 mb-4 rounded-lg shadow-md border ${
        email.isRead ? "" : "font-bold"
      }`}
    >
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-semibold text-blue-500">
            {email.sender}
          </h2>
          <p className="text-gray-700">{email.subject}</p>
          <p className="text-gray-500">{email.bodySnippet}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">{email.date}</p>
          <p className="text-sm">{email.isRead ? "Read" : "Unread"}</p>
        </div>
      </div>
      <button
        onClick={() => onAIResponseClick(email.id)}
        className="mt-2 bg-blue-500 text-white p-2 rounded-lg"
      >
        Generate AI Response
      </button>
    </div>
  );
};

export default EmailListItem;

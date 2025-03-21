import React from "react";
import { toast } from "react-hot-toast";

const ToastMessage = ({ message, success }) => {
  React.useEffect(() => {
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  }, [message, success]);

  return null;
};

export default ToastMessage;

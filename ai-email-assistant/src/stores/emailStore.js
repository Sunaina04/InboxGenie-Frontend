import { makeObservable, observable, action, runInAction } from "mobx";
import axios from "../config/axios";
import toast from "react-hot-toast";

class EmailStore {
  isSending = false;
  sendError = null;

  constructor() {
    makeObservable(this, {
      isSending: observable,
      sendError: observable,
      sendEmail: action,
    });
  }

  sendEmail = async ({ from, to, subject, body }) => {
    runInAction(() => {
      this.isSending = true;
      this.sendError = null;
    });

    try {
      const response = await axios.post("/send-email/", {
        from,
        to,
        subject,
        body,
      });

      if (response.status === 200) {
        toast.success("Email sent successfully!");
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      runInAction(() => {
        this.sendError = error.message;
      });
      toast.error("Error sending email");
    } finally {
      runInAction(() => {
        this.isSending = false;
      });
    }
  };
}

const emailStore = new EmailStore();
export default emailStore;

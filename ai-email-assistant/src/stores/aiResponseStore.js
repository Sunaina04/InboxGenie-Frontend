import { makeObservable, observable, action, runInAction } from "mobx";
import axios from "../config/axios";
import toast from "react-hot-toast";

class AIResponseStore {
  aiResponse = "";
  isLoading = false;
  error = null;
  isAutoReplyLoading = false; // New state for tracking auto-reply status
  autoReplyStatus = ""; // New state for holding auto-reply result message

  constructor() {
    makeObservable(this, {
      aiResponse: observable,
      isLoading: observable,
      error: observable,
      isAutoReplyLoading: observable,
      autoReplyStatus: observable,
      fetchAIResponse: action,
      clearResponse: action,
      triggerAutoReply: action,
    });
  }

  fetchAIResponse = async (to, from, subject, emailBody) => {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo?.email) {
        throw new Error("User email not found in localStorage");
      }

      const response = await axios.post("/generate-reply/", {
        to: to,
        from: from,
        subject: subject,
        email_body: emailBody,
        user_email: userInfo.email,  
      });
      if (response.status === 200 && response.data.body) {
        runInAction(() => {
          this.aiResponse = response.data.body;
        });
      } else {
        throw new Error("Failed to generate AI response");
      }
    } catch (error) {
      runInAction(() => {
        this.error = error.message;
      });
      console.log("Error", error);
      toast.error("Error generating AI response");
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  triggerAutoReply = async (accessToken, emails) => {
    runInAction(() => {
      this.isAutoReplyLoading = true;
      this.autoReplyStatus = "";
    });

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo?.email) {
        throw new Error("User email not found in localStorage");
      }

      const response = await axios.post("/auto-reply-emails/", 
        { send_auto_reply: true,
          emails: emails,
          user_email: userInfo.email,
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );

      if (response.status === 200) {
        runInAction(() => {
          this.autoReplyStatus = response.data.message || "Auto-reply triggered successfully!";
        });
        toast.success("Auto-reply triggered successfully!");
      } else {
        throw new Error("Failed to trigger auto-reply");
      }
    } catch (error) {
      runInAction(() => {
        this.autoReplyStatus = "Error triggering auto-reply";
        this.error = error.message;
      });
      console.log("Error", error);
      toast.error("Error triggering auto-reply");
    } finally {
      runInAction(() => {
        this.isAutoReplyLoading = false;
      });
    }
  };

  clearResponse = () => {
    runInAction(() => {
      this.aiResponse = "";
      this.error = null;
      this.autoReplyStatus = "";
    });
  };
}

const aiResponseStore = new AIResponseStore();
export default aiResponseStore;

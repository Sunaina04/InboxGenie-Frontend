import { makeObservable, observable, action, runInAction } from "mobx";
import axios from "../config/axios";
import toast from "react-hot-toast";

class AIResponseStore {
  aiResponse = "";
  isLoading = false;
  error = null;

  constructor() {
    makeObservable(this, {
      aiResponse: observable,
      isLoading: observable,
      error: observable,
      fetchAIResponse: action,
      clearResponse: action,
    });
  }

  fetchAIResponse = async (emailBody) => {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });

    try {
      const response = await axios.post("/generate-reply/", {
        email_body: emailBody,
      });

      if (response.status === 200 && response.data.ai_response) {
        runInAction(() => {
          this.aiResponse = response.data.ai_response;
        });
      } else {
        throw new Error("Failed to generate AI response");
      }
    } catch (error) {
      runInAction(() => {
        this.error = error.message;
      });
      toast.error("Error generating AI response");
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  clearResponse = () => {
    runInAction(() => {
      this.aiResponse = "";
      this.error = null;
    });
  };
}

const aiResponseStore = new AIResponseStore();
export default aiResponseStore;

import { makeObservable, observable, action, runInAction } from "mobx";
import axios from "../config/axios";
import { privatePaths } from "../config/routes";
import toast from "react-hot-toast";
import { getValidToken } from "../utils/tokenUtils";
// import Cookies from 'js-cookie';

// const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;
// const { REACT_APP_GOOGLE_REDIRECT_URI } = process.env;

// const googleClientId = `${REACT_APP_GOOGLE_CLIENT_ID}`;
// const redirectUri = `${REACT_APP_GOOGLE_REDIRECT_URI}`;

class AuthStore {
  user = {};
  emails = [];
  isLoadingEmails = false;
  isLoadingUser = false;
  isLoadingLogin = false;
  manuals = [];
  isLoadingManuals = false;

  constructor() {
    makeObservable(this, {
      user: observable.ref,
      isLoadingUser: observable.ref,
      emails: observable.ref,
      isLoadingEmails: observable.ref,
      isLoadingLogin: observable.ref,

      login: action,
      logout: action,
      fetchEmails: action,
      handleGoogleToken: action,
      fetchSentEmails: action,
      deleteEmail: action,
    });
  }

  login = ({ payload, navigate, resetForm }) => {
    runInAction(() => {
      this.isLoadingLogin = true;
    });
    axios
      .post("/auth/login", payload, { withCredentials: true })
      .then((res) => {
        if (res.status === 400) {
          resetForm();
          toast.error("Wrong Username or Password");
        } else if (res.status === 200) {
          const data = res.data;
          if (data.success) {
            localStorage.setItem("role", "admin");
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate && navigate(privatePaths.inbox);
            window.location.reload();
          }
        }

        runInAction(() => {
          this.isLoadingLogin = false;
          this.getUser();
        });
      })
      .catch((error) => {
        toast.error("Wrong Username or Password");
        runInAction(() => {
          this.isLoadingLogin = false;
        });
      });
  };

  fetchEmails = async ({
    inquiry = false,
    support = false,
    grievance = false,
  }) => {
    runInAction(() => {
      this.isLoadingEmails = true;
    });
    try {
      const accessToken = await getValidToken();
      console.log("access token", accessToken);
      if (!accessToken) {
        throw new Error("No valid access token found");
      }

      const response = await axios.get("/emails/", {
        params: {
          inquiry,
          support,
          grievance,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        const { emails, user_info } = response.data;
        runInAction(() => {
          this.emails = JSON.stringify(emails);
          this.userInfo = JSON.stringify(user_info);
          localStorage.setItem("email", JSON.stringify(emails));
          localStorage.setItem("userInfo", JSON.stringify(user_info));
        });
      } else {
        toast.error("Failed to fetch emails");
      }
    } catch (error) {
      console.error("Error fetching emails:", error);
      toast.error("Error fetching emails");
    } finally {
      runInAction(() => {
        this.isLoadingEmails = false;
      });
    }
  };

  fetchSentEmails = async () => {
    runInAction(() => {
      this.isLoadingEmails = true;
    });
    try {
      const accessToken = await getValidToken();
      if (!accessToken) {
        throw new Error("No valid access token found");
      }

      const response = await axios.get("/sent-mails/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        const { sent_emails } = response.data;
        runInAction(() => {
          this.emails = JSON.stringify(sent_emails);
          localStorage.setItem("sentEmails", JSON.stringify(sent_emails));
        });
        toast.success("Sent emails fetched successfully!");
      } else {
        toast.error("Failed to fetch sent emails");
      }
    } catch (error) {
      console.error("Error fetching sent emails:", error);
      toast.error("Error fetching sent emails");
    } finally {
      runInAction(() => {
        this.isLoadingEmails = false;
      });
    }
  };

  deleteEmail = async (messageId) => {
    try {
      const accessToken = await getValidToken();
      if (!accessToken) {
        throw new Error("No valid access token found");
      }

      const response = await axios.delete(`/delete-email/${messageId}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        const currentEmails = localStorage.getItem("email") || "[]";
        const emailsArray = JSON.parse(currentEmails);
        const updatedEmails = emailsArray.filter(
          (email) => email.id !== messageId
        );

        runInAction(() => {
          this.emails = JSON.stringify(updatedEmails);
          localStorage.setItem("email", JSON.stringify(updatedEmails));
        });

        toast.success("Email deleted successfully!");

        await this.fetchEmails({ inquire: false });
      } else {
        throw new Error("Failed to delete email");
      }
    } catch (error) {
      console.error("Error deleting email:", error);
      toast.error("Failed to delete email");
    }
  };

  handleGoogleToken = async (idToken, accessToken, navigate) => {
    try {
      const response = await axios.post("/auth/google-login/", {
        id_token: idToken,
        access_token: accessToken,
      });
      if (response.status === 200) {
        const { user } = response.data;
        console.log("user", user);
        runInAction(() => {
          this.userInfo = {
            email: user.email,
            name: user.name,
            isNew: user.is_new,
          };
          localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
        });
        toast.success("Successfully logged in with Google");

        // Fetch emails after successful login
        await this.fetchEmails({ inquiry: false });

        if (navigate) {
          navigate("/inbox", { replace: true });
        }
      } else {
        toast.error("Failed to log in with Google");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      toast.error("Error during Google login");
    }
  };

  logout = ({ callback }) => {
    runInAction(() => {
      // Clear all local storage items
      localStorage.removeItem("email");
      localStorage.removeItem("sentEmails");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("role");
      localStorage.removeItem("gmail_access_token");
      localStorage.removeItem("google_refresh_token");
      localStorage.removeItem("token_timestamp");

      // Clear store state
      this.user = {};
      this.emails = [];
      this.isLoadingEmails = false;
      this.isLoadingUser = false;
      this.isLoadingLogin = false;

      // Clear axios default headers
      delete axios.defaults.headers.common["Authorization"];

      // Execute callback if provided
      callback && callback();
    });
  };
}

const authStore = new AuthStore();
export default authStore;

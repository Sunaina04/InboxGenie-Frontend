import { makeObservable, observable, action, runInAction } from "mobx";
import axios from "../config/axios";
import { privatePaths } from "../config/routes";
import toast, { Toaster } from "react-hot-toast";

const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;
const { REACT_APP_GOOGLE_REDIRECT_URI } = process.env;

const googleClientId = `${REACT_APP_GOOGLE_CLIENT_ID}`;
const redirectUri = `${REACT_APP_GOOGLE_REDIRECT_URI}`;

class AuthStore {
  user = {};
  emails = [];
  isLoadingEmails = false;
  isLoadingUser = false;
  isLoadingLogin = false;

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
      googleLogin: action, // New action to handle Google login
      handleGoogleCallback: action, // To handle Google callback
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

  fetchEmails = async (inquire = false) => {
    runInAction(() => {
      this.isLoadingEmails = true;
    });
    try {
      const params = inquire ? { inquire: true } : {};
      const response = await axios.get("/emails/", { params: { inbox: true } });
      runInAction(() => {
        if (response.status === 200) {
          this.emails = JSON.stringify(response.data.emails);
          localStorage.setItem("email", JSON.stringify(response.data.emails));
        } else {
          toast.error("Failed to fetch emails.");
        }
      });
    } catch (error) {
      toast.error("Failed to fetch emails.");
      console.error("Error fetching emails:", error);
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
      const response = await axios.get("/sent-mails/");
      runInAction(() => {
        if (response.status === 200) {
          this.emails = response.data.sent_emails;
          localStorage.setItem(
            "sentEmails",
            JSON.stringify(response.data.sent_emails)
          );
          toast.success("Sent emails fetched successfully!");
        } else {
          toast.error("Failed to fetch sent emails.");
        }
      });
    } catch (error) {
      toast.error("Failed to fetch sent emails.");
      console.error("Error fetching sent emails:", error);
    } finally {
      runInAction(() => {
        this.isLoadingEmails = false;
      });
    }
  };

  deleteEmail = async (messageId) => {
    try {
      const response = await axios.delete(`/delete-email/${messageId}/`);
      if (response.status === 200) {
        // Update the emails list by removing the deleted email
        const updatedEmails = this.emails.filter(email => email.id !== messageId);
        runInAction(() => {
          this.emails = updatedEmails;
          localStorage.setItem("email", JSON.stringify(updatedEmails));
        });
        toast.success("Email deleted successfully!");
      } else {
        throw new Error("Failed to delete email");
      }
    } catch (error) {
      console.error("Error deleting email:", error);
      toast.error("Failed to delete email");
    }
  };

  googleLogin = () => {
    console.log(googleClientId);
    console.log(redirectUri);
    if (!googleClientId || !redirectUri) {
      console.error("Google Client ID or Redirect URI is not defined.");
      return;
    }
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?response_type=code&client_id=${googleClientId}&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.readonly&state=yOjMAmenqR18QMnnKV6hiSqt1NrNvZ&access_type=offline&service=lso&o2v=1&ddm=1&flowName=GeneralOAuthFlow`;    window.location.href = googleAuthUrl;
  };
  handleGoogleCallback = async (code) => {
    try {
      const response = await axios.post("/auth/google-login", { code });
      if (response.status === 200) {
        const { emails, user } = response.data;
        this.user = user;
        this.emails = emails;
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Successfully logged in with Google");
      } else {
        toast.error("Failed to log in with Google");
      }
    } catch (error) {
      console.error("Error during Google login callback:", error);
      toast.error("Error during Google login");
    }
  };

  logout = ({ callback }) => {
    runInAction(() => {
      localStorage.clear();
      this.user = {};
      const csrfToken = document.cookie.match(/csrftoken=([^;]+)/)?.[1];
      axios.defaults.headers.common["X-CSRFToken"] = csrfToken;
      // axios.get("/auth/logout", { withCredentials: true });
      callback && callback();
    });
  };
}

const authStore = new AuthStore();
export default authStore;

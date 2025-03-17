import { makeObservable, observable, action, runInAction } from "mobx";
import axios from "../config/axios";
import { privatePaths } from "../config/routes";
import toast from "react-hot-toast";

class AuthStore {
  user = {};
  emails = [];
  isLoadingEmails = false;
  isLoadingUser = false;

  constructor() {
    makeObservable(this, {
      user: observable.ref,
      isLoadingUser: observable.ref,
      emails: observable.ref,
      isLoadingEmails: observable.ref,

      login: action,
      logout: action,
      fetchEmails: action,
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
            navigate &&
              navigate(
                privatePaths["admin"][Object.keys(privatePaths["admin"])[0]],
                {
                  replace: true,
                }
              );
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

  fetchEmails = async () => {
    runInAction(() => {
      this.isLoadingEmails = true;
    });
    try {
      const response = await axios.get("/emails/");
      runInAction(() => {
        if (response.status === 200) {
          this.emails = response.data.emails;
        } else {
          toast.error("Failed to fetch emails.");
        }
      });
    } catch (error) {
      runInAction(() => {
        toast.error("Error fetching emails.");
      });
      console.error("Error fetching emails:", error);
    } finally {
      runInAction(() => {
        this.isLoadingEmails = false;
      });
    }
  };

  logout = ({ callback }) => {
    runInAction(() => {
      localStorage.clear();
      this.user = {};
      const csrfToken = document.cookie.match(/csrftoken=([^;]+)/)?.[1];
      axios.defaults.headers.common["X-CSRFToken"] = csrfToken;
      axios.get("/auth/logout", { withCredentials: true });
      callback && callback();
    });
  };
}

const authStore = new AuthStore();
export default authStore;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import "./login.css";
import authStore from "../../stores/authStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emails, setEmails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStore.emails.length > 0) {
      setEmails(authStore.emails);
    }
  }, [authStore.emails]);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/inbox");
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(async () => {
        try {
          await authStore.fetchEmails();
          setEmails(authStore.emails);
          navigate("/inbox");
        } catch (error) {
          console.error("Error during fetching emails:", error);
        }
      })
      .catch((error) => {
        console.error("Google sign-in error:", error);
      });
  };

  const signInWithGoogle = () => {
    return new Promise((resolve, reject) => {
      const isSignedIn = true;
      if (isSignedIn) {
        resolve();
      } else {
        reject("Google sign-in failed");
      }
    });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-heading">Welcome Back to InboxGenie!</h2>
        <p className="login-subheading">Please log in to continue</p>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email Address"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>
        <div className="divider">
          <hr className="divider-line" />
          <span className="divider-text">OR</span>
          <hr className="divider-line" />
        </div>
        <button className="google-btn" onClick={handleGoogleLogin}>
          <FcGoogle size={24} /> Sign in with Google
        </button>
        <p className="forgot-password">
          <a href="/forgot-password">Forgot your password?</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

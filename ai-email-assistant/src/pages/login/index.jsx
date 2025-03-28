//
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import "./login.css";
import authStore from "../../stores/authStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState("");
  const [password, setPassword] = useState("");
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
      <div className="left-section">
        <img
          src="/assets/images/illustration.png"
          alt="Illustration"
          className="illustration"
        />
      </div>
      <div className="right-section">
        <h2 className="login-heading">Sign in</h2>
        <p className="welcome-text">
          Welcome to <span className="highlight">InboxGenie</span>
        </p>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Enter your password"
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
          <span>OR</span>
        </div>
        <div className="social-login">
          <button className="google-btn" onClick={handleGoogleLogin}>
            <FcGoogle size={20} /> Sign in with Google
          </button>
          <button className="facebook-btn">
            <FaFacebook size={20} />
          </button>
        </div>
        <p className="signup-text">
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

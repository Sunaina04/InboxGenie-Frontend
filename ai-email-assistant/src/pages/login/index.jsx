//
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useGoogleLogin } from '@react-oauth/google';
import "./login.css";
import authStore from "../../stores/authStore";
import { toast } from "react-toastify";
import axios from "axios";
// import genbootLogo from "../../assets/images/Logo-slim.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      try {
        console.log("Code response:", codeResponse);
        const response = await axios.post(
          "https://oauth2.googleapis.com/token",
          {
            code: codeResponse.code,
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            client_secret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
            redirect_uri: window.location.origin,
            grant_type: "authorization_code",
          }
        );

        const { id_token, access_token, refresh_token, expires_in } = response.data;
        console.log("ID Token:", id_token);
        console.log("Access Token:", access_token);

        // Store tokens and timestamp
        localStorage.setItem("gmail_access_token", access_token);
        localStorage.setItem("google_refresh_token", refresh_token);
        localStorage.setItem("token_timestamp", Date.now().toString());

        await authStore.handleGoogleToken(id_token, access_token, navigate);
      } catch (error) {
        console.error("Google login error:", error);
        toast.error("Google login failed");
      }
    },
    onError: (errorResponse) => {
      console.error("Google login failed:", errorResponse);
      toast.error("Google login failed");
    },
    scope: "https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send openid email profile",
    redirect_uri: window.location.origin
  });


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
    googleLogin();
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <div className="logo-container">
          <img
            src="/assets/images/Logo-slim.png"
            alt="GENBOOT"
            className="logo"
          />
        </div>
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
            <FcGoogle size={30} /> Sign in with Google
          </button>
          <button className="facebook-btn">
            <FaFacebook size={20} />
          </button>
        </div>
        <p className="signup-text">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

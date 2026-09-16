import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import mainImage from "../assets/main.jpg";
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submit = async (event) => {
    event.preventDefault();
    try {
      await login({ email, password });
    } 
    catch(error) {
        console.error(error);
    }
    navigate("/");
  };
  return (
    <div className="auth-page">
      <div className="auth-art">
        <span className="eyebrow">Fresh from the farm</span>
        <h1>
          Good food
          <br />
          <em>starts here.</em>
        </h1>
        <img src={mainImage} alt="Fresh produce" />
      </div>
      <form className="auth-card" onSubmit={submit}>
        <span className="eyebrow">Welcome back</span>
        <h1>Log in to FreshCart</h1>
        <p>Pick up where you left off.</p>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Your password"
            required
          />
        </label>
        <Link className="forgot" to="/reset-password">
          Forgot password?
        </Link>
        <button className="button button-primary wide">
          Log in <span>→</span>
        </button>
        <div className="auth-switch">
          Don't have an account? <Link to="/register">Sign up</Link>
        </div>
      </form>
    </div>
  );
}

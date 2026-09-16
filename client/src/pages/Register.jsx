import { Link } from "react-router-dom";
export default function Register() {
  return (
    <div className="auth-page single-auth">
      <form className="auth-card">
        <span className="eyebrow">Join the table</span>
        <h1>Create your account</h1>
        <p>Fresh choices are a few clicks away.</p>
        <label>
          Full name
          <input placeholder="Your name" />
        </label>
        <label>
          Email
          <input type="email" placeholder="you@example.com" />
        </label>
        <label>
          Password
          <input type="password" placeholder="Create a password" />
        </label>
        <button className="button button-primary wide">
          Create account <span>→</span>
        </button>
        <div className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </form>
    </div>
  );
}

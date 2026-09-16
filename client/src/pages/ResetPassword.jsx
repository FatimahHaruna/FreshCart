import { Link } from "react-router-dom";
export default function ResetPassword() {
  return (
    <div className="auth-page single-auth">
      <form className="auth-card">
        <span className="eyebrow">Account help</span>
        <h1>Reset your password</h1>
        <p>We will send a fresh link to your inbox.</p>
        <label>
          Email
          <input type="email" placeholder="you@example.com" />
        </label>
        <button className="button button-primary wide">
          Send reset link <span>→</span>
        </button>
        <div className="auth-switch">
          <Link to="/login">Back to login</Link>
        </div>
      </form>
    </div>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ userName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setError("");
  };

  const validatePassword = (password) => {
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(password)) return "Password must include an uppercase letter.";
    if (!/[0-9]/.test(password)) return "Password must include a number.";
    if (!/[^A-Za-z0-9]/.test(password)) return "Password must include a special character.";
    return "";
  };

  const submit = async (event) => {
    event.preventDefault();
    const passwordError = validatePassword(form.password);

    if (passwordError) {
      setError(passwordError);
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await register(form);
      navigate("/login", { replace: true, state: { registered: true } });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to create your account.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page single-auth">
      <form className="auth-card" onSubmit={submit}>
        <span className="eyebrow">Join the table</span>
        <h1>Create your account</h1>
        <p>Fresh choices are a few clicks away.</p>
        <label>
          Full name
          <input name="userName" value={form.userName} onChange={updateField} placeholder="Your name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={updateField} placeholder="you@example.com" required />
        </label>
        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={updateField} placeholder="Create a password" required />
        </label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button button-primary wide" type="submit" disabled={submitting}>
          {submitting ? "Creating account..." : "Create account"} <span>→</span>
        </button>
        <div className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </form>
    </div>
  );
}

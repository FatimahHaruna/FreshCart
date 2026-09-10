import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    newPassword: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      const data = await resetPassword(form);
      setMessage(data.message || "Password reset successfully.");
      setForm({ email: "", newPassword: "" });
      setTimeout(() => navigate("/login"), 1200);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message || "Password reset failed"
      );
    }
  };

  return (
    <section className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Reset Password</h1>
        <p>Enter your account email and choose a new password.</p>

        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="newPassword">New Password</label>
        <input
          id="newPassword"
          type="password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          minLength="8"
          required
        />

        <button type="submit" className="primary-btn">
          Reset Password
        </button>

        <p>
          Remembered your password? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
};

export default ResetPassword;

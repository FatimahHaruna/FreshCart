import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const Login = () => {

  const { login } = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await login(form);

      navigate("/");

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Login failed"
      );

    }

  };

  return (
    <section className="auth-page">

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <h1>Welcome Back</h1>

        <p>Login to continue shopping.</p>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        <label>Email</label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="primary-btn"
        >
          Login
        </button>

        <p>
          Don't have an account?{" "}
          <Link to="/register">
            Sign up
          </Link>
        </p>

      </form>

    </section>
  );
};

export default Login;
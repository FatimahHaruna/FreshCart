import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const Register = () => {

  const { register } = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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

      await register(form);

      navigate("/");

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Registration failed"
      );

    }

  };

  return (
    <section className="auth-page">

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <h1>Create Account</h1>

        <p>Join FreshCart today.</p>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        <label>Name</label>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

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
          Create Account
        </button>

        <p>
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </form>

    </section>
  );
};

export default Register;
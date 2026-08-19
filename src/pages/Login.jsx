import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/Button.jsx";
import { loginUser } from "../services/api.js";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      // This is a frontend prototype. Real authentication is not implemented.
      await loginUser({ email: form.email, password: form.password });
      navigate("/dashboard");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page login-page">
      <div className="login-page__blob" />
      <div className="container login-page__container">
        <motion.div
          className="card login-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">Welcome back</span>
          <h1 className="login-card__title">Log in to Cadence</h1>
          <p className="login-card__subtitle">
            This is a frontend prototype — no real authentication is connected yet.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="login-card__row">
              <label className="login-card__remember">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                />
                Remember me
              </label>
              <Link to="/login" className="login-card__link">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" variant="primary" fullWidth disabled={submitting}>
              {submitting ? "Logging in…" : "Log in"}
            </Button>
          </form>

          <p className="login-card__register">
            Don&apos;t have an account? <Link to="/login">Register</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

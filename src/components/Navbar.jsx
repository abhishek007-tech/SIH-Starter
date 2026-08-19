import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Navbar.css";

const links = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/analysis", label: "Assign" },
  { to: "/history", label: "History" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" onClick={() => setOpen(false)}>
          <span className="navbar__mark">V</span>
          <span>Cadence</span>
        </Link>

        <nav className={`navbar__links ${open ? "navbar__links--open" : ""}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `navbar__link ${isActive ? "navbar__link--active" : ""}`
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/login" className="navbar__cta" onClick={() => setOpen(false)}>
            Log in
          </Link>
        </nav>

        <motion.button
          className="navbar__toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          whileTap={{ scale: 0.9 }}
        >
          <span />
          <span />
          <span />
        </motion.button>
      </div>
    </header>
  );
}

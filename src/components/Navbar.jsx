import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";


const links = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/analysis", label: "Analysis" },
  { to: "/history", label: "History" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" onClick={() => setOpen(false)}>
          <span className="navbar__mark">YP</span>
          <span>Your Project</span>
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

        <button
          className="navbar__toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

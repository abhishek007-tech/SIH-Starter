import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "./Logo.jsx";
import "./Navbar.css";

const links = [
  { to: "/", label: "Home" },
  { to: "/solutions", label: "Solution" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" onClick={() => setOpen(false)}>
          <Logo size={34} />
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
          <div className="navbar__actions">
            <Link to="/login" className="navbar__login" onClick={() => setOpen(false)}>
              Log in
            </Link>
            <Link to="/login" className="navbar__cta" onClick={() => setOpen(false)}>
              Get Started →
            </Link>
          </div>
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

import Logo from "./Logo.jsx";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__brand">
          <Logo size={24} />
        </span>
        <span className="footer__muted">
          © {new Date().getFullYear()} Veyora · Smart team workload management for modern teams
        </span>
      </div>
    </footer>
  );
}

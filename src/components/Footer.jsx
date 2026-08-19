import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__brand">
          <span className="footer__mark">V</span> Cadence
        </span>
        <span className="footer__muted">
          © {new Date().getFullYear()} Cadence · Built for Smart India Hackathon, PS2 — Smart Team Workload Management
        </span>
      </div>
    </footer>
  );
}

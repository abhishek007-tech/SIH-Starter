import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>© {new Date().getFullYear()} Your Project Name</span>
        <span className="footer__muted">
          Built for Smart India Hackathon · Replace this line with your team credit
        </span>
      </div>
    </footer>
  );
}

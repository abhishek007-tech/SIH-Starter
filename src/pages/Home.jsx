import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import { featureCards, dashboardStats } from "../data/demoData.js";
import "./Home.css";

export default function Home() {
  return (
    <div>
      <section className="hero">
        <div className="container hero__inner">
          <span className="eyebrow">Smart India Hackathon</span>
          <h1 className="hero__title">
            Your Project Name
          </h1>
          <p className="hero__subtitle">
            Smart solutions for real-world problems. Replace this section with
            a short description of what your project actually does.
          </p>
          <div className="hero__actions">
            <Link to="/dashboard">
              <Button variant="primary">Get Started</Button>
            </Link>
            <Link to="/analysis">
              <Button variant="secondary">Try Analysis</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="page">
        <div className="container">
          <span className="eyebrow">What it does</span>
          <h2>Built around one clear workflow</h2>
          <div className="feature-grid">
            {featureCards.map((feature) => (
              <div key={feature.id} className="card feature-card">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <span className="eyebrow">At a glance</span>
          <h2>Sample numbers from the dashboard</h2>
          <div className="stats-grid">
            {dashboardStats.map((stat) => (
              <div key={stat.id} className="card stats-section__item">
                <span className="stats-section__value">{stat.value}</span>
                <span className="stats-section__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

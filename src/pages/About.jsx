import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/Button.jsx";
import PageHero from "../components/PageHero.jsx";
import { aboutStats, workflowSteps } from "../data/demoData.js";
import "./About.css";

export default function About() {
  return (
    <div>
      <PageHero
        eyebrow="About Veyora"
        title="Workload clarity, built for teams that ship"
        subtitle="Veyora exists to answer one question every manager asks and few can answer fast: who has room for this, right now?"
      />

      <section className="page">
        <div className="container about-grid">
          <motion.div
            className="about-story"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <h2>The problem we kept seeing</h2>
            <p>
              Workload lives in someone's head, in scattered chat threads, in a
              spreadsheet nobody updates. By the time overload or a missed deadline
              is obvious, it's already a fire to put out.
            </p>
            <p>
              <strong>Veyora</strong> turns team skills, current workload,
              availability and deadlines into a single live picture a manager can act
              on in seconds — assign by fit, not by memory; catch overload before it
              becomes a resignation; reassign in one click when plans change.
            </p>
            <p>
              Every interaction — overload alerts, skill-matched suggestions, live
              reassignment — updates the board the moment it happens, so what you see
              is always what's actually true right now.
            </p>
          </motion.div>

          <div className="about-stats">
            {aboutStats.map((s, i) => (
              <motion.div
                className="about-stats__item"
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <span className="about-stats__value">{s.value}</span>
                <span className="about-stats__label">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="page about-principles">
        <div className="container">
          <span className="eyebrow">What we believe</span>
          <h2>Principles behind the product</h2>
          <div className="principles-grid">
            {[
              { t: "Show, don't ask", d: "A manager shouldn't have to interrupt three people to learn who's free. The board already knows." },
              { t: "Catch it early", d: "Overload is cheap to fix at 85% and expensive at 120%. We surface it the moment it crosses the line." },
              { t: "One source of truth", d: "No parallel spreadsheet. The board is the record, and it's always current." },
            ].map((p, i) => (
              <motion.div
                key={p.t}
                className="card principle-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <span className="principle-card__num">0{i + 1}</span>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-card"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <h2>See the solution in action</h2>
            <p>Walk through exactly what Veyora does for your team.</p>
            <Link to="/solutions">
              <Button variant="primary">Explore the solution →</Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

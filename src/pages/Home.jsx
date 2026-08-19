import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/Button.jsx";
import { featureCards, workflowSteps, teamMembers } from "../data/demoData.js";
import "./Home.css";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Home() {
  return (
    <div>
      <section className="hero">
        <div className="hero__blob hero__blob--a" />
        <div className="hero__blob hero__blob--b" />
        <div className="hero__blob hero__blob--c" />

        <div className="container hero__inner">
          <motion.div
            className="hero__copy"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.span className="eyebrow" variants={fadeUp} custom={0}>
              ● Smart India Hackathon · Problem Statement 2
            </motion.span>
            <motion.h1 className="hero__title" variants={fadeUp} custom={1}>
              Know who's <span className="hero__title-accent">overloaded</span>
              <br />before it costs you a deadline.
            </motion.h1>
            <motion.p className="hero__subtitle" variants={fadeUp} custom={2}>
              Cadence gives managers one live board of team skills, workload
              and deadlines — with smart suggestions for who should pick up
              the next task, and one-click reassignment when plans change.
            </motion.p>
            <motion.div className="hero__actions" variants={fadeUp} custom={3}>
              <Link to="/dashboard">
                <Button variant="primary">Open the dashboard</Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary">Log in</Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero__panel"
            initial={{ opacity: 0, y: 30, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero__panel-card">
              <div className="hero__panel-head">
                <span className="hero__panel-title">Team load — live</span>
                <span className="hero__panel-pill">2 at risk</span>
              </div>
              {teamMembers.slice(0, 4).map((m, i) => (
                <motion.div
                  className="hero__panel-row"
                  key={m.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                >
                  <span className={`hero__dot hero__dot--${m.status}`} />
                  <span className="hero__panel-name">{m.name}</span>
                  <div className="hero__panel-bar">
                    <motion.div
                      className="hero__panel-bar-fill"
                      style={{
                        background:
                          m.workload > 85
                            ? "var(--status-red)"
                            : m.workload > 60
                            ? "var(--status-blue)"
                            : "var(--status-green)",
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${m.workload}%` }}
                      transition={{ delay: 0.8 + i * 0.1, duration: 0.7, ease: "easeOut" }}
                    />
                  </div>
                  <span className="hero__panel-pct">{m.workload}%</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="page marquee-section">
        <div className="marquee">
          <div className="marquee__track">
            {[...Array(2)].map((_, dup) => (
              <div className="marquee__group" key={dup}>
                {["Skill-matched suggestions", "Overload alerts", "Deadline risk radar", "One-click reassignment", "Live workload board", "Availability tracking"].map(
                  (t) => (
                    <span className="marquee__item" key={t}>
                      {t}
                    </span>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page">
        <div className="container">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            What it does
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            Everything a manager needs to balance a team
          </motion.h2>
          <div className="feature-grid">
            {featureCards.map((feature, i) => (
              <motion.div
                key={feature.id}
                className="card feature-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <span className={`feature-card__index feature-card__index--${i % 4}`}>
                  0{i + 1}
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="page workflow-section">
        <div className="container">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            How it works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            From chaos to a balanced board in four steps
          </motion.h2>
          <div className="workflow-grid">
            {workflowSteps.map((step, i) => (
              <motion.div
                key={step.id}
                className="workflow-step"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className="workflow-step__num">{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
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
            <h2>Stop guessing who's free. Start balancing.</h2>
            <p>Jump into the live dashboard — it's already loaded with a sample team.</p>
            <Link to="/dashboard">
              <Button variant="primary">Open the dashboard →</Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

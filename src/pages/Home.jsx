import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import Button from "../components/Button.jsx";
import BoardHero from "../components/BoardHero.jsx";
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

const CHIPS = ["Engineering", "Design", "Marketing", "Operations", "QA", "Data"];

export default function Home() {
  const [activeChip, setActiveChip] = useState(0);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const id = setInterval(() => setActiveChip((c) => (c + 1) % CHIPS.length), 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
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
              ● Smart team workload management
            </motion.span>
            <motion.h1 className="hero__title" variants={fadeUp} custom={1}>
              Know who's <span className="hero__title-accent">overloaded</span>
              <br />before it costs you a deadline.
            </motion.h1>
            <motion.p className="hero__subtitle" variants={fadeUp} custom={2}>
              Veyora gives managers one live board of team skills, workload
              and deadlines — with smart suggestions for who should pick up
              the next task, and one-click reassignment when plans change.
            </motion.p>
            <motion.div className="hero__chips" variants={fadeUp} custom={3}>
              {CHIPS.map((c, i) => (
                <motion.span
                  key={c}
                  className={`hero__chip ${i === activeChip ? "hero__chip--active" : ""}`}
                  onMouseEnter={() => setActiveChip(i)}
                  animate={{ scale: i === activeChip ? 1.05 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {i === activeChip && <span className="hero__chip-check">✓</span>}
                  {c}
                </motion.span>
              ))}
            </motion.div>
            <motion.div className="hero__actions" variants={fadeUp} custom={4}>
              <Link to="/solutions">
                <Button variant="primary">Get Started →</Button>
              </Link>
            </motion.div>
            <motion.p className="hero__microcopy" variants={fadeUp} custom={5}>
              No credit card needed <span>✦</span> Free for small teams
            </motion.p>
          </motion.div>

          <motion.div
            className="hero__panel"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <BoardHero />
          </motion.div>
        </div>
      </section>

      <section className="trusted">
        <div className="container">
          <p className="trusted__label">Trusted by teams shipping at</p>
          <div className="trusted__logos">
            {["Northwind", "Acme Corp", "Vertex", "Lumina", "Quanta", "Fjord"].map((name) => (
              <span key={name} className="trusted__logo">{name}</span>
            ))}
          </div>
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
          <span className="eyebrow">What it does</span>
          <h2>Everything a manager needs to balance a team</h2>
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
          <span className="eyebrow">How it works</span>
          <h2>From chaos to a balanced board in four steps</h2>
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
            <p>See the full picture of your team's workload in one live board.</p>
            <Link to="/solutions">
              <Button variant="primary">Explore the solution →</Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

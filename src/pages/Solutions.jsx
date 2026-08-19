import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/Button.jsx";
import PageHero from "../components/PageHero.jsx";
import HeroDemo from "../components/HeroDemo.jsx";
import { solutions, teamMembers } from "../data/demoData.js";
import "./Solutions.css";

const ACCENTS = ["accent", "coral", "teal"];

function SolutionVisual({ index }) {
  if (index === 0) {
    return (
      <div className="sol-visual sol-visual--board">
        {teamMembers.slice(0, 3).map((m, i) => (
          <motion.div
            className="sol-visual__row"
            key={m.id}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
          >
            <span className={`hero__dot hero__dot--${m.status}`} />
            <span className="sol-visual__name">{m.name.split(" ")[0]}</span>
            <div className="sol-visual__skills">
              {m.skills.map((s) => (
                <span key={s} className="member-card__skill">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    );
  }
  if (index === 1) {
    return (
      <motion.div
        className="sol-visual sol-visual--alert"
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <span className="sol-visual__alert-icon">⚠</span>
        <div>
          <strong>Ananya Rao is at 92% capacity</strong>
          <p>Flagged automatically — 2 active tasks, one due in 2 days.</p>
        </div>
        <motion.div
          className="sol-visual__pulse"
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    );
  }
  return (
    <motion.div
      className="sol-visual sol-visual--swap"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="sol-visual__swap-card sol-visual__swap-card--out">
        <span className="hero__dot hero__dot--red" /> Rohan Das
      </div>
      <span className="sol-visual__swap-arrow">→</span>
      <div className="sol-visual__swap-card sol-visual__swap-card--in">
        <span className="hero__dot hero__dot--green" /> Vivaan Mehta
      </div>
    </motion.div>
  );
}

export default function Solutions() {
  return (
    <div>
      <PageHero
        eyebrow="The solution"
        title="What Veyora actually gives your team"
        subtitle="Three shifts that turn workload from a guessing game into something you can see, act on, and trust."
      >
        <div className="page-hero__demo">
          <HeroDemo />
        </div>
      </PageHero>

      <section className="page">
        <div className="container">
          <div className="solutions-list">
            {solutions.map((s, i) => (
              <motion.div
                className={`solution-row ${i % 2 === 1 ? "solution-row--reverse" : ""}`}
                key={s.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="solution-row__copy">
                  <span className={`solution-row__tag solution-row__tag--${ACCENTS[i]}`}>
                    {s.tag}
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                  <ul className="solution-row__points">
                    {s.points.map((p) => (
                      <li key={p}>
                        <span className="solution-row__check">✓</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="solution-row__visual">
                  <SolutionVisual index={i} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="page sol-compare">
        <div className="container">
          <span className="eyebrow">The difference</span>
          <h2>Before Veyora vs. after</h2>
          <div className="compare-grid">
            <motion.div
              className="compare-col compare-col--before"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <span className="compare-col__tag">Without Veyora</span>
              <ul>
                {[
                  "Workload lives in someone's head",
                  "Overload noticed only after burnout",
                  "Assignments based on gut feeling",
                  "Reassigning means a group-chat scramble",
                  "Deadlines slip without warning",
                ].map((t) => (
                  <li key={t}><span className="compare-x">✕</span> {t}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              className="compare-col compare-col--after"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="compare-col__tag">With Veyora</span>
              <ul>
                {[
                  "One live board everyone can see",
                  "Overload flagged automatically at 85%",
                  "Assignments ranked by skill + capacity",
                  "Reassign in one click, board updates live",
                  "Deadline risk surfaced days ahead",
                ].map((t) => (
                  <li key={t}><span className="compare-check">✓</span> {t}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="page sol-caps">
        <div className="container">
          <span className="eyebrow">Capabilities</span>
          <h2>One platform, everything a manager touches</h2>
          <div className="sol-caps__grid">
            {[
              { icon: "📊", t: "Live workload board", d: "Every member's real-time load, skills and availability in one glance." },
              { icon: "🚨", t: "Overload alerts", d: "Automatic red flags the moment anyone crosses 85% capacity." },
              { icon: "⏰", t: "Deadline risk radar", d: "See what's about to slip before it becomes a fire to fight." },
              { icon: "🎯", t: "Skill-matched routing", d: "New task in? Get a ranked list of the best-fit, least-loaded teammates." },
              { icon: "🔄", t: "One-click reassignment", d: "Move work off an overloaded plate and watch the board rebalance live." },
              { icon: "📅", t: "Availability tracking", d: "Know who's on leave or busy before you ever assign, not after." },
            ].map((c, i) => (
              <motion.div
                key={c.t}
                className="card sol-cap"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <span className="sol-cap__icon">{c.icon}</span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="page sol-outcomes">
        <div className="container">
          <div className="sol-outcomes__grid">
            {[
              { v: "85%", l: "Overload caught before deadlines slip" },
              { v: "1-click", l: "Reassignment when priorities shift" },
              { v: "0", l: "Spreadsheets to keep in sync" },
              { v: "Live", l: "Workload updates, always current" },
            ].map((o, i) => (
              <motion.div
                key={o.l}
                className="sol-outcome"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <span className="sol-outcome__value">{o.v}</span>
                <span className="sol-outcome__label">{o.l}</span>
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
            <h2>Ready to see your team clearly?</h2>
            <p>Learn what drives Veyora and the questions teams ask most.</p>
            <div className="cta-card__actions">
              <Link to="/about">
                <Button variant="primary">About Veyora →</Button>
              </Link>
              <Link to="/faq">
                <Button variant="secondary">Read the FAQ</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

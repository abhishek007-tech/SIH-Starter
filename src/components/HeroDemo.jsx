import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./HeroDemo.css";

/**
 * Auto-playing, looping product demo for the hero.
 * Plays a short "a task comes in → gets assigned to the least-loaded, skill-matched
 * teammate → their workload bar fills" sequence on repeat, like a demo video.
 */

const ROSTER = [
  { id: "a", name: "Ananya", initials: "AR", base: 92, status: "red" },
  { id: "k", name: "Kabir", initials: "KS", base: 68, status: "blue" },
  { id: "m", name: "Meera", initials: "MI", base: 41, status: "green" },
  { id: "v", name: "Vivaan", initials: "VM", base: 33, status: "green" },
];

// Which member each incoming task gets routed to (lowest load / best fit)
const SEQUENCE = [
  { task: "New: Design review", to: "v", skill: "UI/UX" },
  { task: "New: API endpoint", to: "m", skill: "Backend" },
  { task: "New: Bug triage", to: "v", skill: "QA" },
];

function loadColor(v) {
  return v > 85 ? "var(--status-red)" : v > 60 ? "var(--status-blue)" : "var(--status-green)";
}

export default function HeroDemo() {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState("incoming"); // incoming -> assigning -> settled
  const [loads, setLoads] = useState(() => Object.fromEntries(ROSTER.map((r) => [r.id, r.base])));

  useEffect(() => {
    const current = SEQUENCE[step % SEQUENCE.length];
    let t2, t3;
    // phase timeline
    setPhase("incoming");
    const t1 = setTimeout(() => setPhase("assigning"), 1100);
    t2 = setTimeout(() => {
      setPhase("settled");
      setLoads((prev) => ({
        ...prev,
        [current.to]: Math.min(100, prev[current.to] + 10),
      }));
    }, 2000);
    t3 = setTimeout(() => {
      // reset loads gradually and advance
      setLoads(Object.fromEntries(ROSTER.map((r) => [r.id, r.base])));
      setStep((s) => s + 1);
    }, 3400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [step]);

  const current = SEQUENCE[step % SEQUENCE.length];

  return (
    <div className="hero-demo">
      <div className="hero-demo__bar">
        <span className="hero-demo__dot" />
        <span className="hero-demo__dot" />
        <span className="hero-demo__dot" />
        <span className="hero-demo__live">
          <span className="hero-demo__live-pulse" /> Live demo
        </span>
      </div>

      <div className="hero-demo__body">
        <div className="hero-demo__head">
          <span className="hero-demo__title">Team workload</span>
          <span className="hero-demo__pill">Auto-balancing</span>
        </div>

        {/* incoming task chip */}
        <div className="hero-demo__incoming">
          <AnimatePresence mode="wait">
            {phase !== "settled" && (
              <motion.div
                key={current.task}
                className="hero-demo__task"
                initial={{ opacity: 0, y: -14, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  x: phase === "assigning" ? 40 : 0,
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="hero-demo__task-skill">{current.skill}</span>
                {current.task}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="hero-demo__rows">
          {ROSTER.map((r) => {
            const isTarget = current.to === r.id;
            const highlight = phase !== "incoming" && isTarget;
            return (
              <motion.div
                className={`hero-demo__row ${highlight ? "hero-demo__row--target" : ""}`}
                key={r.id}
                animate={{ scale: phase === "settled" && isTarget ? 1.03 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="hero-demo__avatar">{r.initials}</span>
                <span className="hero-demo__name">{r.name}</span>
                <div className="hero-demo__track">
                  <motion.div
                    className="hero-demo__fill"
                    animate={{ width: `${loads[r.id]}%`, background: loadColor(loads[r.id]) }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                </div>
                <span className="hero-demo__pct">{loads[r.id]}%</span>
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence>
          {phase === "settled" && (
            <motion.div
              className="hero-demo__toast"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              ✓ Routed to {ROSTER.find((r) => r.id === current.to).name} — lowest load
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

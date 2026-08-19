import { motion } from "framer-motion";
import "./BoardHero.css";

/**
 * Monday.com-style animated project board for the hero.
 * A real workload board with colored status/owner pills, a floating confetti
 * callout, an animated cursor, and an avatar — all looping subtly.
 */

const ROWS = [
  { task: "Rebuild onboarding flow", owner: "Ananya", ownerColor: "purple", status: "Overloaded", statusColor: "red", load: "92%" },
  { task: "Payments migration", owner: "Kabir", ownerColor: "blue", status: "Working", statusColor: "blue", load: "68%" },
  { task: "Design system audit", owner: "Meera", ownerColor: "teal", status: "On track", statusColor: "green", load: "41%" },
  { task: "Regression tests", owner: "Rohan", ownerColor: "grey", status: "Blocked", statusColor: "black", load: "—" },
  { task: "CI hardening", owner: "Vivaan", ownerColor: "green", status: "On track", statusColor: "green", load: "33%" },
];

const CONFETTI = [
  { x: -110, y: -30, c: "#ffab2e", d: 0 },
  { x: -70, y: 20, c: "#e2445c", d: 0.1 },
  { x: 120, y: -20, c: "#00c875", d: 0.2 },
  { x: 80, y: 30, c: "#579bfc", d: 0.15 },
  { x: -130, y: 25, c: "#6c5ce7", d: 0.25 },
  { x: 130, y: 20, c: "#ff6b6b", d: 0.05 },
];

export default function BoardHero() {
  return (
    <div className="board-hero">
      <div className="board-hero__bar">
        <span className="board-hero__dot" />
        <span className="board-hero__dot" />
        <span className="board-hero__dot" />
        <span className="board-hero__tab">Team board</span>
        <span className="board-hero__tab board-hero__tab--muted">Timeline</span>
        <span className="board-hero__live">
          <span className="board-hero__live-pulse" /> Live
        </span>
      </div>

      <div className="board-hero__body">
        <div className="board-hero__group">Active sprint</div>

        <div className="board-hero__head">
          <span>Task</span>
          <span>Owner</span>
          <span>Status</span>
          <span>Load</span>
        </div>

        {ROWS.map((r, i) => (
          <motion.div
            className="board-hero__row"
            key={r.task}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="board-hero__task">{r.task}</span>
            <span className={`board-hero__pill board-hero__pill--owner-${r.ownerColor}`}>
              {r.owner}
            </span>
            <span className={`board-hero__pill board-hero__pill--status-${r.statusColor}`}>
              {r.status}
            </span>
            <span className="board-hero__load">{r.load}</span>
          </motion.div>
        ))}
      </div>

      {/* Floating confetti callout, looping like Monday.com */}
      <motion.div
        className="board-hero__callout"
        initial={{ opacity: 0, y: 16, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {CONFETTI.map((p, i) => (
          <motion.span
            className="board-hero__confetti"
            key={i}
            style={{ background: p.c, left: "50%", top: "50%" }}
            animate={{ x: [0, p.x], y: [0, p.y], opacity: [0, 1, 0], scale: [0, 1, 0.4] }}
            transition={{ duration: 1.6, delay: 1.3 + p.d, repeat: Infinity, repeatDelay: 2.2 }}
          />
        ))}
        <div className="board-hero__callout-avatar">SM</div>
        <span className="board-hero__callout-text">Rebalanced 3 tasks</span>
        <motion.span
          className="board-hero__callout-badge"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          Done
        </motion.span>
      </motion.div>

      {/* Animated cursor */}
      <motion.svg
        className="board-hero__cursor"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        animate={{ x: [10, -60, 10], y: [30, -10, 30] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M4 2l6 16 2.5-6.5L19 9 4 2z" fill="#579bfc" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
      </motion.svg>

      {/* Avatar bubble */}
      <motion.div
        className="board-hero__person"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
      >
        MI
      </motion.div>
    </div>
  );
}

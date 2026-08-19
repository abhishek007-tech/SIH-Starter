import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "./TeamMemberCard.css";

const STATUS_LABEL = {
  green: "On track",
  blue: "Busy",
  red: "Overloaded",
  black: "Unavailable",
};

/**
 * <TeamMemberCard member={...} tasks={[...]} onReassign={(memberId) => void} />
 */
export default function TeamMemberCard({ member, tasks = [], onReassign }) {
  // pointer-following 3D tilt (spring-smoothed so it feels physical)
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), { stiffness: 180, damping: 14 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), { stiffness: 180, damping: 14 });

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      className="card member-card"
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
    >
      <div className="member-card__head">
        <div className="member-card__avatar-wrap">
          <span className="member-card__avatar">{member.initials}</span>
          <span
            className={`member-card__status-dot member-card__status-dot--${member.status}`}
            title={STATUS_LABEL[member.status]}
          />
        </div>
        <div className="member-card__id">
          <span className="member-card__name">{member.name}</span>
          <span className="member-card__role">{member.role}</span>
        </div>
        <span className={`member-card__avail member-card__avail--${member.availability.toLowerCase()}`}>
          {member.availability}
        </span>
      </div>

      <div className="member-card__skills">
        {member.skills.map((s) => (
          <span key={s} className="member-card__skill">
            {s}
          </span>
        ))}
      </div>

      <div className="member-card__workload">
        <div className="member-card__workload-head">
          <span>Workload</span>
          <span className={member.workload > 85 ? "member-card__workload-pct--danger" : ""}>
            {member.workload}%
          </span>
        </div>
        <div className="member-card__bar">
          <motion.div
            className={`member-card__bar-fill member-card__bar-fill--${member.status}`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(member.workload, 100)}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="member-card__tasks">
        <span className="member-card__tasks-label">
          {tasks.length} active task{tasks.length === 1 ? "" : "s"}
        </span>
        {tasks.slice(0, 2).map((t) => (
          <span key={t.id} className="member-card__task-chip">
            {t.title}
          </span>
        ))}
        {tasks.length > 2 && (
          <span className="member-card__task-chip member-card__task-chip--more">
            +{tasks.length - 2} more
          </span>
        )}
      </div>

      <button
        type="button"
        className="member-card__reassign"
        onClick={() => onReassign?.(member.id)}
        disabled={tasks.length === 0}
      >
        Reassign a task →
      </button>
    </motion.div>
  );
}

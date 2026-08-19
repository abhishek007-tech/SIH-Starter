import { motion } from "framer-motion";
import "./StatCard.css";

/**
 * <StatCard label="Total Reports" value="128" trend="+12% this week" tone="accent|coral|teal|amber|red" />
 */
export default function StatCard({ label, value, trend, tone = "accent" }) {
  return (
    <motion.div
      className={`card stat-card stat-card--${tone}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <span className="stat-card__label">{label}</span>
      <span className="stat-card__value">{value}</span>
      {trend && <span className="stat-card__trend">{trend}</span>}
    </motion.div>
  );
}

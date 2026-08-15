import "./StatCard.css";

/**
 * <StatCard label="Total Reports" value="128" trend="+12% this week" />
 */
export default function StatCard({ label, value, trend }) {
  return (
    <div className="card stat-card">
      <span className="stat-card__label">{label}</span>
      <span className="stat-card__value">{value}</span>
      {trend && <span className="stat-card__trend">{trend}</span>}
    </div>
  );
}

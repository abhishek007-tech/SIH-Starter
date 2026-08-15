import "./StatusBadge.css";

const STATUS_MAP = {
  Completed: "success",
  Success: "success",
  Pending: "amber",
  Processing: "amber",
  Failed: "danger",
  Error: "danger",
};

/**
 * <StatusBadge status="Completed" />
 * Falls back to a neutral style for statuses not in STATUS_MAP.
 */
export default function StatusBadge({ status }) {
  const tone = STATUS_MAP[status] || "neutral";
  return <span className={`status-badge status-badge--${tone}`}>{status}</span>;
}

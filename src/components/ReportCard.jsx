import StatusBadge from "./StatusBadge.jsx";
import "./ReportCard.css";

/**
 * <ReportCard title="Report #104" date="12 Aug 2026" status="Completed" summary="..." onView={fn} />
 */
export default function ReportCard({ title, date, status, summary, onView }) {
  return (
    <div className="card report-card">
      <div className="report-card__top">
        <div>
          <h3 className="report-card__title">{title}</h3>
          <span className="report-card__date">{date}</span>
        </div>
        <StatusBadge status={status} />
      </div>
      {summary && <p className="report-card__summary">{summary}</p>}
      {onView && (
        <button className="report-card__view" onClick={onView}>
          View details →
        </button>
      )}
    </div>
  );
}

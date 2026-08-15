import { useMemo, useState } from "react";
import StatusBadge from "../components/StatusBadge.jsx";
import { historyItems } from "../data/demoData.js";
import "./History.css";

const STATUS_FILTERS = ["All", "Completed", "Pending", "Failed"];

export default function History() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");

  const filtered = useMemo(() => {
    return historyItems.filter((item) => {
      const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "All" || item.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  return (
    <div className="page">
      <div className="container">
        <span className="eyebrow">History</span>
        <h1>Previous Reports</h1>
        <p>Browse, search, and filter past analyses.</p>

        <div className="history__controls">
          <input
            type="text"
            className="history__search"
            placeholder="Search by report title…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search reports"
          />
          <div className="history__filters">
            {STATUS_FILTERS.map((option) => (
              <button
                key={option}
                className={`history__filter ${status === option ? "history__filter--active" : ""}`}
                onClick={() => setStatus(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="card history__table-card">
          <table className="history__table">
            <thead>
              <tr>
                <th>Report</th>
                <th>Date</th>
                <th>Status</th>
                <th>Result</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.date}</td>
                  <td>
                    <StatusBadge status={item.status} />
                  </td>
                  <td>{item.result}</td>
                  <td>
                    <button className="history__view">View</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="history__empty">
                    No reports match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

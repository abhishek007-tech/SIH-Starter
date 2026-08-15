import { Link } from "react-router-dom";
import StatCard from "../components/StatCard.jsx";
import ReportCard from "../components/ReportCard.jsx";
import Button from "../components/Button.jsx";
import { dashboardStats, recentReports } from "../data/demoData.js";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="page">
      <div className="container">
        <div className="dashboard__header">
          <div>
            <span className="eyebrow">Overview</span>
            <h1>Welcome back</h1>
            <p>Here&apos;s a summary of your project&apos;s activity.</p>
          </div>
          <div className="dashboard__actions">
            <Link to="/analysis">
              <Button variant="primary">New Analysis</Button>
            </Link>
            <Link to="/history">
              <Button variant="secondary">View History</Button>
            </Link>
          </div>
        </div>

        <div className="dashboard__stats">
          {dashboardStats.map((stat) => (
            <StatCard key={stat.id} label={stat.label} value={stat.value} trend={stat.trend} />
          ))}
        </div>

        <div className="dashboard__section-head">
          <h2>Recent Activity</h2>
          <Link to="/history" className="dashboard__link">
            See all →
          </Link>
        </div>
        <div className="dashboard__reports">
          {recentReports.map((report) => (
            <ReportCard
              key={report.id}
              title={report.title}
              date={report.date}
              status={report.status}
              summary={report.summary}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

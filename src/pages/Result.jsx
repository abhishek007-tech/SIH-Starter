import { Link, useLocation } from "react-router-dom";
import Button from "../components/Button.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { exampleResult, analysisTypes } from "../data/demoData.js";
import "./Result.css";

export default function Result() {
  const location = useLocation();
  const { previewUrl, selectedType, fileName } = location.state || {};

  const typeLabel =
    analysisTypes.find((t) => t.id === selectedType)?.label || exampleResult.category;

  return (
    <div className="page">
      <div className="container result">
        <span className="eyebrow">Result</span>
        <h1>Analysis Result</h1>

        <div className="result__grid">
          <div className="card result__preview-card">
            {previewUrl ? (
              <img src={previewUrl} alt={fileName || "Uploaded file"} />
            ) : (
              <div className="result__preview-placeholder">No file preview available</div>
            )}
          </div>

          <div className="card result__details-card">
            <div className="result__row">
              <span className="result__row-label">Category</span>
              <span>{typeLabel}</span>
            </div>
            <div className="result__row">
              <span className="result__row-label">Status</span>
              <StatusBadge status={exampleResult.status} />
            </div>
            <div className="result__row">
              <span className="result__row-label">Result</span>
              <span className="result__value">{exampleResult.result}</span>
            </div>
            <div className="result__row">
              <span className="result__row-label">Confidence</span>
              <span>{exampleResult.confidence}%</span>
            </div>
            <div className="result__confidence-bar">
              <div
                className="result__confidence-fill"
                style={{ width: `${exampleResult.confidence}%` }}
              />
            </div>

            <h3 className="result__section-title">Details</h3>
            <p>{exampleResult.details}</p>

            <h3 className="result__section-title">Recommendations</h3>
            <ul className="result__recommendations">
              {exampleResult.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>

            <div className="result__actions">
              <Link to="/analysis">
                <Button variant="primary">New Analysis</Button>
              </Link>
              <Link to="/history">
                <Button variant="secondary">View History</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

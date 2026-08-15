import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import { analyzeFile } from "../services/api.js";
import { analysisTypes } from "../data/demoData.js";
import "./Detection.css";

const MAX_SIZE_MB = 10;
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];

export default function Detection() {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedType, setSelectedType] = useState(analysisTypes[0].id);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validateFile(candidate) {
    if (!ACCEPTED_TYPES.includes(candidate.type)) {
      return "Unsupported file type. Please upload a PNG, JPG, or WEBP file.";
    }
    if (candidate.size > MAX_SIZE_MB * 1024 * 1024) {
      return `File is too large. Maximum size is ${MAX_SIZE_MB}MB.`;
    }
    return "";
  }

  function handleFileChange(e) {
    const candidate = e.target.files?.[0];
    if (!candidate) return;

    const validationError = validateFile(candidate);
    if (validationError) {
      setError(validationError);
      setFile(null);
      setPreviewUrl(null);
      return;
    }

    setError("");
    setFile(candidate);
    setPreviewUrl(URL.createObjectURL(candidate));
  }

  function handleRemoveFile() {
    setFile(null);
    setPreviewUrl(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleAnalyze() {
    if (!file) {
      setError("Please upload a file before analyzing.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await analyzeFile(file, { type: selectedType });
      navigate("/result", {
        state: { previewUrl, selectedType, fileName: file.name },
      });
    } catch {
      setError("Something went wrong while analyzing. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="container detection">
        <span className="eyebrow">Analysis</span>
        <h1>Analyze File</h1>
        <p>Upload a file and select a type to run an analysis.</p>

        <div className="card detection__panel">
          {!previewUrl ? (
            <label className="detection__dropzone" htmlFor="file-upload">
              <span className="detection__dropzone-title">Upload File</span>
              <span className="detection__dropzone-hint">
                PNG, JPG, or WEBP · up to {MAX_SIZE_MB}MB
              </span>
              <input
                id="file-upload"
                ref={inputRef}
                type="file"
                accept={ACCEPTED_TYPES.join(",")}
                onChange={handleFileChange}
                hidden
              />
            </label>
          ) : (
            <div className="detection__preview">
              <img src={previewUrl} alt="Selected file preview" />
              <div className="detection__preview-meta">
                <span>{file?.name}</span>
                <button className="detection__remove" onClick={handleRemoveFile}>
                  Remove
                </button>
              </div>
            </div>
          )}

          {error && <p className="detection__error">{error}</p>}

          <div className="form-field detection__type">
            <label htmlFor="analysis-type">Select Type</label>
            <select
              id="analysis-type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {analysisTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <Button
            variant="primary"
            fullWidth
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? "Analyzing…" : "Analyze File"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Generic demo data. Replace with real API responses once the backend is ready.
// Keep the shape of each export the same so pages don't need to change.

export const dashboardStats = [
  { id: "stat-1", label: "Total Reports", value: "128", trend: "+12% this week" },
  { id: "stat-2", label: "Completed", value: "104", trend: "+8% this week" },
  { id: "stat-3", label: "Pending", value: "18" },
  { id: "stat-4", label: "Active Users", value: "36", trend: "+3 today" },
];

export const recentReports = [
  {
    id: "rep-1",
    title: "Report #104",
    date: "12 Aug 2026",
    status: "Completed",
    summary: "Analysis finished with no issues flagged.",
  },
  {
    id: "rep-2",
    title: "Report #103",
    date: "11 Aug 2026",
    status: "Pending",
    summary: "Waiting on additional input data.",
  },
  {
    id: "rep-3",
    title: "Report #102",
    date: "10 Aug 2026",
    status: "Failed",
    summary: "Upload could not be processed. Retry needed.",
  },
  {
    id: "rep-4",
    title: "Report #101",
    date: "09 Aug 2026",
    status: "Completed",
    summary: "Analysis finished, recommendations attached.",
  },
];

export const historyItems = [
  { id: "his-1", title: "Report #104", date: "12 Aug 2026", status: "Completed", result: "Positive" },
  { id: "his-2", title: "Report #103", date: "11 Aug 2026", status: "Pending", result: "—" },
  { id: "his-3", title: "Report #102", date: "10 Aug 2026", status: "Failed", result: "—" },
  { id: "his-4", title: "Report #101", date: "09 Aug 2026", status: "Completed", result: "Negative" },
  { id: "his-5", title: "Report #100", date: "08 Aug 2026", status: "Completed", result: "Positive" },
];

export const analysisTypes = [
  { id: "type-a", label: "Type A" },
  { id: "type-b", label: "Type B" },
  { id: "type-c", label: "Type C" },
];

export const exampleResult = {
  id: "demo-result",
  category: "Type A",
  status: "Completed",
  result: "Positive",
  confidence: 87,
  details:
    "The uploaded file was processed successfully and matched the expected pattern for the selected category.",
  recommendations: [
    "Review the flagged section in detail.",
    "Cross-check with the previous report before taking action.",
    "Share this result with your team for confirmation.",
  ],
};

export const featureCards = [
  {
    id: "feat-1",
    title: "Upload & Analyze",
    description: "Submit a file and run it through your analysis pipeline in a few clicks.",
  },
  {
    id: "feat-2",
    title: "Track Reports",
    description: "Every analysis is saved to your history so you can revisit it anytime.",
  },
  {
    id: "feat-3",
    title: "Clear Results",
    description: "Get a straightforward result with confidence and recommended next steps.",
  },
];

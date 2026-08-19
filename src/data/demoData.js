// Demo data for Cadence — Smart Team Workload Management (SIH · PS2).
// Replace with real API responses once the backend is live; keep shapes the same.

export const skillsList = [
  "Frontend",
  "Backend",
  "UI/UX",
  "DevOps",
  "QA",
  "ML",
  "Copywriting",
  "Data",
];

// status: "green" = available/on-track, "blue" = actively working (healthy load),
// "red" = overloaded, "black" = unavailable / on leave
export const teamMembers = [
  {
    id: "m1",
    name: "Ananya Rao",
    initials: "AR",
    role: "Frontend Lead",
    skills: ["Frontend", "UI/UX"],
    availability: "Available",
    workload: 92,
    status: "red",
    email: "ananya@cadence.dev",
  },
  {
    id: "m2",
    name: "Kabir Singh",
    initials: "KS",
    role: "Backend Engineer",
    skills: ["Backend", "DevOps"],
    availability: "Available",
    workload: 68,
    status: "blue",
    email: "kabir@cadence.dev",
  },
  {
    id: "m3",
    name: "Meera Iyer",
    initials: "MI",
    role: "Product Designer",
    skills: ["UI/UX", "Copywriting"],
    availability: "Available",
    workload: 41,
    status: "green",
    email: "meera@cadence.dev",
  },
  {
    id: "m4",
    name: "Rohan Das",
    initials: "RD",
    role: "QA Engineer",
    skills: ["QA", "Frontend"],
    availability: "Unavailable",
    workload: 55,
    status: "black",
    email: "rohan@cadence.dev",
  },
  {
    id: "m5",
    name: "Sana Sheikh",
    initials: "SS",
    role: "ML Engineer",
    skills: ["ML", "Data"],
    availability: "Available",
    workload: 88,
    status: "red",
    email: "sana@cadence.dev",
  },
  {
    id: "m6",
    name: "Vivaan Mehta",
    initials: "VM",
    role: "DevOps Engineer",
    skills: ["DevOps", "Backend"],
    availability: "Available",
    workload: 33,
    status: "green",
    email: "vivaan@cadence.dev",
  },
];

export const tasks = [
  {
    id: "t1",
    title: "Rebuild onboarding flow",
    assignee: "m1",
    priority: "High",
    deadline: "2026-08-21",
    status: "At Risk",
    skill: "Frontend",
  },
  {
    id: "t2",
    title: "Payments service migration",
    assignee: "m2",
    priority: "High",
    deadline: "2026-08-25",
    status: "On Track",
    skill: "Backend",
  },
  {
    id: "t3",
    title: "Design system audit",
    assignee: "m3",
    priority: "Medium",
    deadline: "2026-08-29",
    status: "On Track",
    skill: "UI/UX",
  },
  {
    id: "t4",
    title: "Regression test suite",
    assignee: "m4",
    priority: "Medium",
    deadline: "2026-08-23",
    status: "At Risk",
    skill: "QA",
  },
  {
    id: "t5",
    title: "Churn prediction model v2",
    assignee: "m5",
    priority: "High",
    deadline: "2026-08-20",
    status: "Overdue",
    skill: "ML",
  },
  {
    id: "t6",
    title: "CI pipeline hardening",
    assignee: "m6",
    priority: "Low",
    deadline: "2026-09-02",
    status: "On Track",
    skill: "DevOps",
  },
  {
    id: "t7",
    title: "Landing page motion pass",
    assignee: "m1",
    priority: "Medium",
    deadline: "2026-08-22",
    status: "At Risk",
    skill: "Frontend",
  },
  {
    id: "t8",
    title: "Fraud detection alerts",
    assignee: "m5",
    priority: "High",
    deadline: "2026-08-24",
    status: "On Track",
    skill: "ML",
  },
];

export const analysisTypes = [
  { id: "type-frontend", label: "Frontend" },
  { id: "type-backend", label: "Backend" },
  { id: "type-design", label: "UI/UX" },
];

export const historyItems = [
  { id: "his-1", title: "Rebuild onboarding flow", date: "12 Aug 2026", status: "Completed", result: "Ananya Rao" },
  { id: "his-2", title: "Payments service migration", date: "11 Aug 2026", status: "Pending", result: "Kabir Singh" },
  { id: "his-3", title: "Regression test suite", date: "10 Aug 2026", status: "Failed", result: "Rohan Das" },
  { id: "his-4", title: "Design system audit", date: "09 Aug 2026", status: "Completed", result: "Meera Iyer" },
  { id: "his-5", title: "CI pipeline hardening", date: "08 Aug 2026", status: "Completed", result: "Vivaan Mehta" },
];

export const exampleResult = {
  id: "demo-result",
  category: "Frontend",
  status: "Completed",
  result: "Assigned to Ananya Rao",
  confidence: 87,
  details:
    "This task was matched against current team skills and workload, and assigned to the best-fit teammate.",
  recommendations: [
    "Check back on the dashboard to see live workload after this assignment.",
    "Reassign anytime if priorities shift.",
    "Set a reminder before the deadline to review progress.",
  ],
};

export const dashboardStats = [
  { id: "stat-1", label: "Total Reports", value: "128", trend: "+12% this week" },
  { id: "stat-2", label: "Completed", value: "104", trend: "+8% this week" },
  { id: "stat-3", label: "Pending", value: "18" },
  { id: "stat-4", label: "Active Users", value: "36", trend: "+3 today" },
];

export const featureCards = [
  {
    id: "feat-1",
    title: "See workload at a glance",
    description:
      "Every member's current load, skills and availability in one live board — no more guessing who's free.",
  },
  {
    id: "feat-2",
    title: "Catch overload before it hurts",
    description:
      "Automatic alerts flag overloaded members and at-risk deadlines the moment they cross the line.",
  },
  {
    id: "feat-3",
    title: "Assign to the right person",
    description:
      "When a task lands, Cadence ranks the best-fit teammate by skill match and free capacity.",
  },
  {
    id: "feat-4",
    title: "Reassign in one click",
    description:
      "Someone goes on leave or a priority shifts — move their tasks to the right teammate instantly.",
  },
];

export const workflowSteps = [
  {
    id: "step-1",
    title: "Add your team",
    description: "Bring in members with their role, skills and availability.",
  },
  {
    id: "step-2",
    title: "Drop in tasks & deadlines",
    description: "Cadence maps every task to workload and due dates automatically.",
  },
  {
    id: "step-3",
    title: "Get live risk alerts",
    description: "Overloaded people and at-risk deadlines surface before they become fires.",
  },
  {
    id: "step-4",
    title: "Rebalance instantly",
    description: "Accept a smart suggestion or manually reassign — the board updates live.",
  },
];

// Demo data for Veyora — Smart Team Workload Management.
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
    email: "ananya@veyora.dev",
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
    email: "kabir@veyora.dev",
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
    email: "meera@veyora.dev",
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
    email: "rohan@veyora.dev",
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
    email: "sana@veyora.dev",
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
    email: "vivaan@veyora.dev",
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
      "When a task lands, Veyora ranks the best-fit teammate by skill match and free capacity.",
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
    description: "Veyora maps every task to workload and due dates automatically.",
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

export const solutions = [
  {
    id: "sol-1",
    tag: "For managers",
    title: "Stop making assignment decisions blind",
    description:
      "Most managers assign work from memory — who seems free, who did the last one. Veyora replaces the guesswork with real numbers: current load, matching skills, and open deadlines, all in one glance.",
    points: ["Live workload %, not stale spreadsheets", "Skill tags so the right person gets the right task", "Availability status before you ever ask"],
  },
  {
    id: "sol-2",
    tag: "For the whole team",
    title: "Nobody quietly burns out",
    description:
      "Overload creeps in one 'just one more task' at a time. Veyora flags anyone crossing 85% capacity the moment it happens — so it gets caught in a stand-up, not in a resignation.",
    points: ["Automatic red-flag alerts on overload", "Deadline-risk radar for what's about to slip", "One click to move work off an overloaded plate"],
  },
  {
    id: "sol-3",
    tag: "For the project",
    title: "Deadlines stop depending on luck",
    description:
      "When priorities shift or someone goes on leave, reassignment used to mean a scramble in the group chat. Veyora ranks the best-fit replacement instantly, by skill and by who actually has room.",
    points: ["Ranked suggestions, not a guessing game", "Reassign in one click, workload updates live", "A single source of truth for the whole team"],
  },
];

export const aboutStats = [
  { id: "a1", value: "85%", label: "Overload caught before deadlines slip" },
  { id: "a2", value: "1-click", label: "Reassignment when plans change" },
  { id: "a3", value: "Live", label: "Workload updates in real time" },
  { id: "a4", value: "0", label: "Spreadsheets to keep in sync" },
];

export const faqs = [
  {
    id: "faq-1",
    q: "What problem does Veyora actually solve?",
    a: "Managers often can't see, at a glance, who on their team is overloaded, who's free, and whose skills fit an incoming task. Veyora turns that into one live board — workload, skills, availability and deadlines together — so assignment decisions take seconds instead of guesswork.",
  },
  {
    id: "faq-2",
    q: "How does the 'suggest suitable member' logic work?",
    a: "When you pick a required skill for a new task, Veyora filters to available members who have that skill, then ranks them by current workload — lowest first. The top match is starred so you can assign in one click.",
  },
  {
    id: "faq-3",
    q: "What happens when I reassign a task?",
    a: "Picking a new owner for a task instantly recalculates both members' workload bars and status colors — the old owner's load drops, the new owner's rises — so the board always reflects reality, not the last time someone updated a spreadsheet.",
  },
  {
    id: "faq-4",
    q: "How does Veyora decide someone is 'overloaded'?",
    a: "Every task carries an effort weight that adds to a member's workload percentage. Once someone crosses 85% they're flagged red and surfaced in the alerts band — early enough to rebalance before a deadline is actually at risk.",
  },
  {
    id: "faq-5",
    q: "What do the colored dots mean?",
    a: "Green means on track, blue means busy but healthy, red means overloaded (above 85% capacity), and black/grey means unavailable — on leave or offline. The same colors are used on workload bars and status pills throughout the app.",
  },
  {
    id: "faq-6",
    q: "Can I filter the team by skill?",
    a: "Yes — the dashboard has skill filter chips plus a live search, so you can instantly narrow to, say, every available Frontend engineer under 60% load when a new task comes in.",
  },
  {
    id: "faq-7",
    q: "Does it work on mobile?",
    a: "The whole experience is responsive — the board, cards and panels reflow into a single column on tablet and mobile, so a manager can rebalance work from their phone.",
  },
  {
    id: "faq-8",
    q: "How fast can my team start using it?",
    a: "There's nothing to configure to explore it — the app ships with a realistic sample team so you can see alerts, suggestions and live reassignment working the moment you open the dashboard.",
  },
];

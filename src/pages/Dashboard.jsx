import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StatCard from "../components/StatCard.jsx";
import TeamMemberCard from "../components/TeamMemberCard.jsx";
import Button from "../components/Button.jsx";
import {
  teamMembers as initialMembers,
  tasks as initialTasks,
  skillsList,
} from "../data/demoData.js";
import "./Dashboard.css";

const TASK_LOAD = 12; // % workload one task represents, for the reassignment simulation
const PRIO_W = { High: 1.35, Medium: 1, Low: 0.75 }; // deadline-pressure weight per priority (from PulseBoard)
const TODAY = "2026-08-19";

function statusFor(member, workload) {
  if (member.availability === "Unavailable") return "black";
  if (workload > 85) return "red";
  if (workload > 55) return "blue";
  return "green";
}

function daysUntil(dateStr) {
  const diff = new Date(dateStr) - new Date(TODAY);
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

/* ---- Team Health Index: a single 0–100 read on how the team is doing ---- */
function computeHealth(members, tasks) {
  const overloaded = members.filter((m) => m.workload > 85).length;
  const overdue = tasks.filter((t) => t.status === "Overdue" || daysUntil(t.deadline) < 0).length;
  const avg = members.reduce((s, m) => s + m.workload, 0) / (members.length || 1);
  let h = 100 - overloaded * 12 - overdue * 10 - Math.max(0, avg - 70) * 0.9;
  return Math.max(0, Math.min(100, Math.round(h)));
}

function healthTone(h) {
  return h > 70 ? "#12B76A" : h > 45 ? "#F79009" : "#F04438";
}

/* Radial gauge — SVG ring, r=42 → circumference ≈ 264 */
function TeamHealthGauge({ health, overloaded, overdue, unassignedNote, onBalance, canBalance }) {
  const col = healthTone(health);
  const label = health > 70 ? "Healthy" : health > 45 ? "Under strain" : "Critical";
  return (
    <div className="card insight-card health-card" style={{ "--health-col": col }}>
      <div className="health-card__ring">
        <svg viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="50" cy="50" r="42" fill="none" stroke="var(--border, #E4E7EC)" strokeWidth="9" />
          <circle
            cx="50" cy="50" r="42" fill="none" stroke={col} strokeWidth="9" strokeLinecap="round"
            strokeDasharray={`${(health / 100) * 264} 264`}
            style={{ transition: "stroke-dasharray .8s cubic-bezier(.22,1,.36,1)" }}
          />
        </svg>
        <div className="health-card__ring-center">
          <span className="health-card__num" style={{ color: col }}>{health}</span>
          <span className="health-card__den">/ 100</span>
        </div>
      </div>
      <div className="health-card__body">
        <span className="eyebrow">Team Health Index</span>
        <h3 className="health-card__label" style={{ color: col }}>{label}</h3>
        <p className="health-card__note">
          {overloaded ? `${overloaded} overloaded · ` : ""}
          {overdue ? `${overdue} overdue · ` : ""}
          {unassignedNote || "workload balanced"}
        </p>
        {canBalance && (
          <button className="health-card__balance" onClick={onBalance}>
            ⚡ Fix it — Auto-Balance
          </button>
        )}
      </div>
    </div>
  );
}

/* 7-day capacity heat: weighted, non-done task pressure due each day */
function CapacityHeat({ tasks }) {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(TODAY);
    day.setDate(day.getDate() + i);
    const key = day.toISOString().slice(0, 10);
    const load = tasks
      .filter((t) => t.status !== "Done" && t.deadline === key)
      .reduce((s, t) => s + (PRIO_W[t.priority] || 1), 0);
    days.push({
      day,
      load,
      dow: day.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
      isToday: i === 0,
    });
  }
  const max = Math.max(1, ...days.map((d) => d.load));
  return (
    <div className="card insight-card heat-card">
      <div className="heat-card__head">
        <span className="eyebrow">Capacity heat · next 7 days</span>
        <span className="heat-card__legend">
          <i className="heat-dot heat-dot--low" /> light
          <i className="heat-dot heat-dot--mid" /> busy
          <i className="heat-dot heat-dot--high" /> heavy
        </span>
      </div>
      <div className="heat-card__cols">
        {days.map((d, i) => {
          const k = d.load / max;
          const tone = k > 0.66 ? "high" : k > 0.33 ? "mid" : d.load ? "low" : "empty";
          return (
            <div
              key={i}
              className={`heat-col heat-col--${tone}${d.isToday ? " heat-col--today" : ""}`}
              title={`${d.load.toFixed(1)} weighted load due ${d.day.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
            >
              <span className="heat-col__bar" style={{ height: `${Math.max(6, k * 100)}%` }} />
              <span className="heat-col__val">{d.load ? d.load.toFixed(0) : "·"}</span>
              <span className="heat-col__dow">{d.dow}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [members, setMembers] = useState(initialMembers);
  const [tasks, setTasks] = useState(initialTasks);
  const [skillFilter, setSkillFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("workload"); // workload | name | availability
  const [reassignFor, setReassignFor] = useState(null); // member id
  const [newTaskSkill, setNewTaskSkill] = useState(skillsList[0]);
  const [toast, setToast] = useState(null);

  const tasksByMember = useMemo(() => {
    const map = {};
    tasks.forEach((t) => {
      map[t.assignee] = map[t.assignee] || [];
      map[t.assignee].push(t);
    });
    return map;
  }, [tasks]);

  const overloaded = members.filter((m) => m.workload > 85);
  const atRiskTasks = tasks.filter(
    (t) => t.status !== "Overdue" && daysUntil(t.deadline) <= 3 && daysUntil(t.deadline) >= 0
  );
  const overdueTasks = tasks.filter((t) => t.status === "Overdue" || daysUntil(t.deadline) < 0);
  const avgWorkload = Math.round(members.reduce((s, m) => s + m.workload, 0) / members.length);

  const AVAIL_ORDER = { Available: 0, Unavailable: 1 };
  const filteredMembers = members
    .filter((m) => {
      const matchesSkill = skillFilter === "All" || m.skills.includes(skillFilter);
      const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.role.toLowerCase().includes(search.toLowerCase());
      return matchesSkill && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "availability")
        return (AVAIL_ORDER[a.availability] - AVAIL_ORDER[b.availability]) || b.workload - a.workload;
      return b.workload - a.workload; // workload: most loaded first
    });

  const suggestions = useMemo(() => {
    return members
      .filter((m) => m.availability === "Available" && m.skills.includes(newTaskSkill))
      .sort((a, b) => a.workload - b.workload)
      .slice(0, 3);
  }, [members, newTaskSkill]);

  function showToast(text) {
    setToast(text);
    setTimeout(() => setToast(null), 2600);
  }

  function reassignTask(taskId, toMemberId) {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    const fromId = task.assignee;

    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: "On Track" } : t)));
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === fromId) {
          const workload = Math.max(0, m.workload - TASK_LOAD);
          return { ...m, workload, status: statusFor(m, workload) };
        }
        if (m.id === toMemberId) {
          const workload = Math.min(100, m.workload + TASK_LOAD);
          return { ...m, workload, status: statusFor(m, workload) };
        }
        return m;
      })
    );
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, assignee: toMemberId } : t)));
    const toMember = members.find((m) => m.id === toMemberId);
    showToast(`"${task.title}" moved to ${toMember?.name}.`);
    setReassignFor(null);
  }

  function assignSuggestion(memberId) {
    const newTask = {
      id: `t${Date.now()}`,
      title: `New ${newTaskSkill} task`,
      assignee: memberId,
      priority: "Medium",
      deadline: "2026-08-30",
      status: "On Track",
      skill: newTaskSkill,
    };
    setTasks((prev) => [...prev, newTask]);
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id !== memberId) return m;
        const workload = Math.min(100, m.workload + TASK_LOAD);
        return { ...m, workload, status: statusFor(m, workload) };
      })
    );
    const member = members.find((m) => m.id === memberId);
    showToast(`New task assigned to ${member?.name}.`);
  }

  const health = computeHealth(members, tasks);
  const unassignedCount = tasks.filter((t) => !t.assignee && t.status !== "Done").length;
  const unassignedNote = unassignedCount ? `${unassignedCount} unassigned` : "";

  // Auto-Balance: move one task off each overloaded member to the least-loaded available teammate.
  function autoBalance() {
    let nextMembers = members.map((m) => ({ ...m }));
    let nextTasks = tasks.map((t) => ({ ...t }));
    let moves = 0;

    nextMembers
      .filter((m) => m.workload > 85)
      .forEach((over) => {
        const movable = nextTasks.find((t) => t.assignee === over.id && t.status !== "Done");
        if (!movable) return;
        const target = nextMembers
          .filter((m) => m.id !== over.id && m.availability === "Available" && m.workload < 70)
          .sort((a, b) => a.workload - b.workload)[0];
        if (!target) return;

        movable.assignee = target.id;
        const o = nextMembers.find((m) => m.id === over.id);
        const t = nextMembers.find((m) => m.id === target.id);
        o.workload = Math.max(0, o.workload - TASK_LOAD);
        o.status = statusFor(o, o.workload);
        t.workload = Math.min(100, t.workload + TASK_LOAD);
        t.status = statusFor(t, t.workload);
        moves += 1;
      });

    if (moves === 0) {
      showToast("Team is already balanced — no moves needed.");
      return;
    }
    setMembers(nextMembers);
    setTasks(nextTasks);
    showToast(`Auto-balanced ${moves} task${moves > 1 ? "s" : ""} across the team.`);
  }

  const reassignMember = members.find((m) => m.id === reassignFor);
  const reassignTasks = reassignFor ? tasksByMember[reassignFor] || [] : [];

  return (
    <div className="page">
      <div className="container">
        <div className="dashboard__header">
          <div>
            <span className="eyebrow">Workload overview</span>
            <h1>Good to see you, Manager</h1>
            <p>Here&apos;s how your team is doing right now.</p>
          </div>
          <a className="dashboard__member-link" href="/dashboard.html">
            Open member workspace →
          </a>
        </div>

        <div className="dashboard__stats">
          <StatCard label="Team members" value={members.length} tone="accent" />
          <StatCard
            label="Overloaded"
            value={overloaded.length}
            trend={overloaded.length ? overloaded.map((m) => m.name.split(" ")[0]).join(", ") : "All balanced"}
            tone="red"
          />
          <StatCard
            label="Deadlines this week"
            value={atRiskTasks.length + overdueTasks.length}
            trend={overdueTasks.length ? `${overdueTasks.length} overdue` : "On schedule"}
            tone="amber"
          />
          <StatCard label="Avg. workload" value={`${avgWorkload}%`} tone="teal" />
        </div>

        <div className="dashboard__insights">
          <TeamHealthGauge
            health={health}
            overloaded={overloaded.length}
            overdue={overdueTasks.length}
            unassignedNote={unassignedNote}
            onBalance={autoBalance}
            canBalance={health < 75}
          />
          <CapacityHeat tasks={tasks} />
        </div>

        <AnimatePresence>
          {(overloaded.length > 0 || overdueTasks.length > 0) && (
            <motion.div
              className="alert-banner"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <span className="alert-banner__icon">⚠</span>
              <div>
                <strong>Attention needed:</strong>{" "}
                {overloaded.length > 0 && (
                  <span>
                    {overloaded.map((m) => m.name).join(", ")} {overloaded.length === 1 ? "is" : "are"} over 85% capacity.{" "}
                  </span>
                )}
                {overdueTasks.length > 0 && (
                  <span>
                    {overdueTasks.length} task{overdueTasks.length > 1 ? "s are" : " is"} overdue.
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="dashboard__layout">
          <div className="dashboard__main">
            <div className="dashboard__board-head">
              <h2 className="dashboard__board-title">
                Team board <span>{filteredMembers.length} of {members.length}</span>
              </h2>
              <label className="dashboard__sort">
                Sort by
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="workload">Workload (high → low)</option>
                  <option value="name">Name (A → Z)</option>
                  <option value="availability">Availability</option>
                </select>
              </label>
            </div>

            <div className="dashboard__toolbar">
              <input
                type="text"
                className="dashboard__search"
                placeholder="Search team members…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="dashboard__filters">
                <button
                  className={`filter-chip ${skillFilter === "All" ? "filter-chip--active" : ""}`}
                  onClick={() => setSkillFilter("All")}
                >
                  All skills
                </button>
                {skillsList.map((s) => (
                  <button
                    key={s}
                    className={`filter-chip ${skillFilter === s ? "filter-chip--active" : ""}`}
                    onClick={() => setSkillFilter(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="dashboard__legend">
              <span><span className="legend-dot legend-dot--green" /> On track</span>
              <span><span className="legend-dot legend-dot--blue" /> Busy</span>
              <span><span className="legend-dot legend-dot--red" /> Overloaded</span>
              <span><span className="legend-dot legend-dot--black" /> Unavailable</span>
            </div>

            <motion.div className="dashboard__members" layout>
              <AnimatePresence>
                {filteredMembers.map((m) => (
                  <TeamMemberCard
                    key={m.id}
                    member={m}
                    tasks={tasksByMember[m.id] || []}
                    onReassign={setReassignFor}
                  />
                ))}
              </AnimatePresence>
              {filteredMembers.length === 0 && (
                <p className="dashboard__empty">No team members match this filter.</p>
              )}
            </motion.div>
          </div>

          <aside className="dashboard__aside">
            <div className="card assign-panel">
              <h3>Assign a new task</h3>
              <p className="assign-panel__hint">
                Pick a required skill — Veyora ranks the best-fit, least-loaded teammate.
              </p>
              <div className="form-field">
                <label htmlFor="skill">Required skill</label>
                <select id="skill" value={newTaskSkill} onChange={(e) => setNewTaskSkill(e.target.value)}>
                  {skillsList.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="assign-panel__suggestions">
                {suggestions.length === 0 && (
                  <p className="assign-panel__empty">No available member has this skill right now.</p>
                )}
                {suggestions.map((m, i) => (
                  <div key={m.id} className="suggestion-row">
                    <span className={`suggestion-row__rank ${i === 0 ? "suggestion-row__rank--best" : ""}`}>
                      {i === 0 ? "★" : i + 1}
                    </span>
                    <span className={`member-card__status-dot member-card__status-dot--${m.status}`} style={{ position: "static" }} />
                    <div className="suggestion-row__id">
                      <span className="suggestion-row__name">{m.name}</span>
                      <span className="suggestion-row__load">{m.workload}% loaded</span>
                    </div>
                    <Button variant="secondary" onClick={() => assignSuggestion(m.id)}>
                      Assign
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="card deadline-panel">
              <h3>Upcoming deadlines</h3>
              {tasks
                .slice()
                .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
                .slice(0, 5)
                .map((t) => {
                  const owner = members.find((m) => m.id === t.assignee);
                  const d = daysUntil(t.deadline);
                  return (
                    <div key={t.id} className="deadline-row">
                      <div className="deadline-row__id">
                        <span className="deadline-row__title">{t.title}</span>
                        <span className="deadline-row__owner">{owner?.name}</span>
                      </div>
                      <span
                        className={`deadline-row__pill ${
                          d < 0 ? "deadline-row__pill--overdue" : d <= 3 ? "deadline-row__pill--soon" : ""
                        }`}
                      >
                        {d < 0 ? "Overdue" : d === 0 ? "Today" : `${d}d`}
                      </span>
                    </div>
                  );
                })}
            </div>
          </aside>
        </div>
      </div>

      <AnimatePresence>
        {reassignFor && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setReassignFor(null)}
          >
            <motion.div
              className="card modal"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Reassign a task from {reassignMember?.name}</h3>
              <p className="assign-panel__hint">Choose one of their current tasks and a new owner.</p>
              {reassignTasks.map((t) => {
                const candidates = members
                  .filter((m) => m.id !== reassignFor && m.availability === "Available")
                  .sort((a, b) => a.workload - b.workload);
                return (
                  <div key={t.id} className="modal__task">
                    <div className="modal__task-head">
                      <span>{t.title}</span>
                      <span className="modal__task-skill">{t.skill}</span>
                    </div>
                    <div className="modal__candidates">
                      {candidates.slice(0, 4).map((c) => (
                        <button
                          key={c.id}
                          className="modal__candidate"
                          onClick={() => reassignTask(t.id, c.id)}
                        >
                          {c.name.split(" ")[0]} · {c.workload}%
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
              <Button variant="ghost" onClick={() => setReassignFor(null)}>
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

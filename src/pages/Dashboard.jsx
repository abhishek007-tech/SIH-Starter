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

function statusFor(member, workload) {
  if (member.availability === "Unavailable") return "black";
  if (workload > 85) return "red";
  if (workload > 55) return "blue";
  return "green";
}

function daysUntil(dateStr) {
  const diff = new Date(dateStr) - new Date("2026-08-19");
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

export default function Dashboard() {
  const [members, setMembers] = useState(initialMembers);
  const [tasks, setTasks] = useState(initialTasks);
  const [skillFilter, setSkillFilter] = useState("All");
  const [search, setSearch] = useState("");
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

  const filteredMembers = members.filter((m) => {
    const matchesSkill = skillFilter === "All" || m.skills.includes(skillFilter);
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase());
    return matchesSkill && matchesSearch;
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
                Pick a required skill — Cadence ranks the best-fit, least-loaded teammate.
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

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ============================================================
   CONFIG
   ============================================================ */

const THEMES = [
  { key: "white", label: "White", swatch: "#F7F9FC" },
  { key: "dark", label: "Dark", swatch: "#111827" },
  { key: "forest", label: "Forest", swatch: "#15803D" },
  { key: "twilight", label: "Twilight", swatch: "#F97316" },
];

const ROLES = {
  manager: {
    label: "Manager",
    title: "Manager sign in",
    desc: "Assign tasks, rebalance workload and resolve overload alerts.",
    idLabel: "Manager ID or email",
    idPlaceholder: "e.g. abhishek@team.dev",
    showTeamCode: true,
    submitLabel: "Enter Dashboard",
    note: "Manager access: view and edit team tasks, workload and deadlines.",
  },
  member: {
    label: "Team Member",
    title: "Team member sign in",
    desc: "See your tasks, workload and upcoming deadlines.",
    idLabel: "Employee ID or email",
    idPlaceholder: "e.g. priya@team.dev",
    showTeamCode: false,
    submitLabel: "View My Workload",
    note: "Team member access: view your own profile, tasks and workload.",
  },
};

const STATS = [
  { value: 12, label: "Members" },
  { value: 28, label: "Active Tasks" },
  { value: 3, label: "Overloaded" },
  { value: 98, suffix: "%", label: "Deadlines Met" },
];

const SLIDES = [
  { id: "workload", title: "Know exactly who's overloaded", desc: "See team workload, availability and deadlines in one intelligent workspace." },
  { id: "balance", title: "Balance workload intelligently", desc: "Identify overloaded team members before deadlines become a problem." },
  { id: "match", title: "Match skills with tasks", desc: "Find the most suitable team member based on skills, availability and current workload." },
  { id: "deadline", title: "Never miss a deadline", desc: "Track upcoming deadlines and identify risks before they become blockers." },
  { id: "health", title: "One score for team health", desc: "A single Team Health Index turns workload, risk and capacity into one number you can act on." },
];

const AUTO_ADVANCE_MS = 1300;

/* ============================================================
   SMALL HOOKS
   ============================================================ */

function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function useCountUp(target, duration = 1100) {
  const [value, setValue] = useState(0);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (reducedMotion) {
      setValue(target);
      return undefined;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, reducedMotion]);
  return value;
}

/* ============================================================
   MINI VISUALS — one per slide
   ============================================================ */

function VisualWorkload() {
  const rows = [
    { name: "Priya", pct: 90, tone: "danger" },
    { name: "Abhi", pct: 72, tone: "warning" },
    { name: "Rahul", pct: 45, tone: "info" },
    { name: "Aman", pct: 30, tone: "success" },
  ];
  return (
    <div className="wos-vis">
      {rows.map((r, i) => (
        <div className="wos-vis-row" key={r.name} style={{ animationDelay: `${i * 0.1}s` }}>
          <div className="wos-avatar">{r.name[0]}</div>
          <div className="wos-vis-row-main">
            <div className="wos-vis-row-top">
              <span>{r.name}</span>
              <span className="wos-vis-pct">{r.pct}%</span>
            </div>
            <div className="wos-vis-track">
              <div className={`wos-vis-fill wos-tone-${r.tone}`} style={{ "--w": `${r.pct}%`, animationDelay: `${i * 0.1 + 0.15}s` }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function VisualBalance() {
  const rows = [
    { name: "Priya", pct: 90, tone: "danger", flag: true },
    { name: "Abhi", pct: 72, tone: "warning", flag: false },
    { name: "Rahul", pct: 45, tone: "info", flag: false },
  ];
  return (
    <div className="wos-vis">
      <div className="wos-vis-pill">
        <span className="wos-vis-dot wos-tone-danger" /> 3 members overloaded
      </div>
      {rows.map((r, i) => (
        <div className="wos-vis-row" key={r.name} style={{ animationDelay: `${i * 0.1}s` }}>
          <div className="wos-vis-row-main">
            <div className="wos-vis-row-top">
              <span>{r.name}</span>
              {r.flag && <span className="wos-vis-warn">⚠</span>}
            </div>
            <div className="wos-vis-track">
              <div className={`wos-vis-fill wos-tone-${r.tone}`} style={{ "--w": `${r.pct}%`, animationDelay: `${i * 0.1 + 0.15}s` }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function VisualMatch() {
  return (
    <div className="wos-vis wos-vis-match">
      <div className="wos-task-card">
        <span className="wos-task-label">Task</span>
        Build Authentication UI
      </div>
      <div className="wos-links">
        <span className="wos-link-line" style={{ animationDelay: "0s" }} />
        <span className="wos-link-line" style={{ animationDelay: ".3s" }} />
      </div>
      <div className="wos-match-chips">
        <div className="wos-chip" style={{ animationDelay: ".1s" }}>
          <div className="wos-avatar sm">P</div>
          <div>
            <div className="wos-chip-name">Priya · 30%</div>
            <div className="wos-chip-tag">Best match</div>
          </div>
        </div>
        <div className="wos-chip" style={{ animationDelay: ".22s" }}>
          <div className="wos-avatar sm">R</div>
          <div>
            <div className="wos-chip-name">Rahul · 45%</div>
            <div className="wos-chip-tag muted">Available</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualDeadline() {
  const items = [
    { task: "API integration", date: "Tomorrow", status: "At risk", tone: "warning" },
    { task: "Dashboard UI", date: "In 3 days", status: "On track", tone: "success" },
    { task: "QA pass", date: "Today", status: "Overloaded", tone: "danger" },
  ];
  return (
    <div className="wos-vis">
      {items.map((it, i) => (
        <div className="wos-deadline-card" key={it.task} style={{ animationDelay: `${i * 0.1}s` }}>
          <div>
            <div className="wos-deadline-task">{it.task}</div>
            <div className="wos-deadline-date">{it.date}</div>
          </div>
          <span className={`wos-badge wos-tone-${it.tone}`}>{it.status}</span>
        </div>
      ))}
    </div>
  );
}

function VisualHealth() {
  const health = 78;
  const dash = (health / 100) * 264;
  const stats = [
    { label: "Balanced", value: "4", tone: "success" },
    { label: "At capacity", value: "1", tone: "warning" },
    { label: "Overloaded", value: "1", tone: "danger" },
  ];
  return (
    <div className="wos-vis wos-vis-health">
      <div className="wos-health-ring">
        <svg viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="50" cy="50" r="42" fill="none" stroke="var(--bg-tertiary)" strokeWidth="9" />
          <circle
            cx="50" cy="50" r="42" fill="none" stroke="var(--success)" strokeWidth="9" strokeLinecap="round"
            strokeDasharray={`${dash} 264`} style={{ animation: "wos-ring-in 1s cubic-bezier(.22,1,.36,1) both" }}
          />
        </svg>
        <div className="wos-health-center">
          <b>{health}</b>
          <span>/ 100</span>
        </div>
      </div>
      <div className="wos-health-stats">
        {stats.map((s, i) => (
          <div className="wos-health-stat" key={s.label} style={{ animationDelay: `${i * 0.1 + 0.2}s` }}>
            <span className={`wos-vis-dot wos-tone-${s.tone}`} />
            <b>{s.value}</b>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const VISUALS = { workload: VisualWorkload, balance: VisualBalance, match: VisualMatch, deadline: VisualDeadline, health: VisualHealth };

/* ============================================================
   HERO CAROUSEL — single active slide only, so overlap is
   structurally impossible (no stacked absolute slides).
   ============================================================ */

function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const len = SLIDES.length;

  useEffect(() => {
    if (paused || reducedMotion) return undefined;
    startRef.current = performance.now();
    const tick = (now) => {
      const elapsed = now - startRef.current;
      const p = Math.min(1, elapsed / AUTO_ADVANCE_MS);
      setProgress(p);
      if (p >= 1) {
        setIndex((prev) => (prev + 1) % len);
        startRef.current = now;
        setProgress(0);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, index, reducedMotion]);

  const goTo = (i) => {
    setIndex((i + len) % len);
    setProgress(0);
    startRef.current = performance.now();
  };

  const slide = SLIDES[index];
  const Visual = VISUALS[slide.id];

  return (
    <div
      className="wos-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="wos-progress-row" role="tablist" aria-label="Slides">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to slide ${i + 1}: ${s.title}`}
            className="wos-progress-seg"
            onClick={() => goTo(i)}
          >
            <span
              className="wos-progress-fill"
              style={{ width: i < index ? "100%" : i === index ? `${progress * 100}%` : "0%" }}
            />
          </button>
        ))}
      </div>

      <div className="wos-stage">
        <button type="button" className="wos-nav-btn wos-nav-prev" aria-label="Previous slide" onClick={() => goTo(index - 1)}>
          ‹
        </button>

        {/* keying on slide.id forces a clean remount + entrance animation,
            and guarantees only ONE slide ever exists in the DOM */}
        <div className="wos-slide" key={slide.id}>
          <span className="wos-eyebrow">PS2 · Smart Team Workload Management</span>
          <h1 className="wos-headline">{slide.title}</h1>
          <p className="wos-sub">{slide.desc}</p>
          <Visual />
        </div>

        <button type="button" className="wos-nav-btn wos-nav-next" aria-label="Next slide" onClick={() => goTo(index + 1)}>
          ›
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   LIVE PULSE — signature ambient element for the brand mark
   ============================================================ */

function LivePulse() {
  return (
    <svg className="wos-wave" viewBox="0 0 260 40" preserveAspectRatio="none" aria-hidden="true">
      <polyline
        className="wos-wave-line"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="0,20 20,20 28,6 36,34 44,12 52,28 60,20 90,20 98,8 106,32 114,18 122,22 130,20 260,20"
      />
    </svg>
  );
}

/* ============================================================
   STAT ITEM (count-up on mount)
   ============================================================ */

function StatItem({ value, suffix = "", label, delay = 0 }) {
  const display = useCountUp(value);
  return (
    <div className="wos-stat" style={{ animationDelay: `${delay}s` }}>
      <b>
        {display}
        {suffix}
      </b>
      <span>{label}</span>
    </div>
  );
}

/* ============================================================
   THEME PICKER
   ============================================================ */

function ThemePicker({ theme, onChange }) {
  return (
    <div className="wos-theme-picker" role="group" aria-label="Choose theme">
      {THEMES.map((t) => (
        <button
          key={t.key}
          type="button"
          className={`wos-theme-swatch${theme === t.key ? " active" : ""}`}
          style={{ background: t.swatch }}
          title={t.label}
          aria-label={t.label}
          aria-pressed={theme === t.key}
          onClick={() => onChange(t.key)}
        />
      ))}
    </div>
  );
}

/* ============================================================
   MAIN LOGIN PAGE
   ============================================================ */

export default function Login() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("white");
  const [role, setRole] = useState("manager");
  const [form, setForm] = useState({
    id: "",
    teamCode: "PS2 · Core Build Team",
    password: "",
    remember: true,
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const [loadStep, setLoadStep] = useState(0);

  const LOAD_STEPS = [
    "Verifying your access…",
    "Preparing your workspace…",
    "Loading team capacity model…",
    "Syncing task board…",
    "Ready — taking you in",
  ];

  const cardRef = useRef(null);
  const bgRef = useRef(null);
  const active = ROLES[role];

  const handleChange = (field) => (e) => {
    const value = field === "remember" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleTilt = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  };

  const resetTilt = () => {
    const card = cardRef.current;
    if (card) card.style.transform = "rotateY(0deg) rotateX(0deg)";
  };

  const handleHeroParallax = (e) => {
    const el = bgRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--px", `${x * 26}px`);
    el.style.setProperty("--py", `${y * 26}px`);
  };

  const resetHeroParallax = () => {
    const el = bgRef.current;
    if (el) {
      el.style.setProperty("--px", "0px");
      el.style.setProperty("--py", "0px");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === "submitting" || status === "success") return;
    setStatus("submitting");
    // demo-only auth: no backend for this hackathon prototype.
    // Show an animated ~3.5s loading bar with stepped status before entering.
    setTimeout(() => {
      setStatus("success");
      setLoadStep(0);
      // advance the status text across the bar's fill
      [700, 1400, 2100, 2800].forEach((ms, i) => {
        setTimeout(() => setLoadStep(i + 1), ms);
      });
      setTimeout(() => {
        const name = form.id.split("@")[0] || active.label;
        if (role === "manager") {
          // Manager → React manager dashboard (team workload, reassign, etc.)
          navigate("/dashboard", { state: { name, role } });
        } else {
          // Team member → standalone Loadwise member workspace (served from /public)
          window.location.href = "/dashboard.html";
        }
      }, 3500);
    }, 400);
  };

  return (
    <div className="wos-login-page" data-theme={theme}>
      <style>{CSS}</style>

      <div className="wos-login-wrap">
        <div className="wos-hero" onMouseMove={handleHeroParallax} onMouseLeave={resetHeroParallax}>
          <div className="wos-bg-field" ref={bgRef} aria-hidden="true">
            <div className="wos-orb wos-orb-a" />
            <div className="wos-orb wos-orb-b" />
            <div className="wos-speed-lines" />
          </div>

          <div className="wos-hero-inner">
            <div className="wos-brand-row">
              <div className="wos-brand">
                <span className="wos-brand-dot" />
                Veyora
              </div>
              <span className="wos-live-badge">
                <span className="wos-live-dot" />
                Live
              </span>
            </div>

            <LivePulse />

            <HeroCarousel />

            <div className="wos-hero-stats">
              {STATS.map((s, i) => (
                <StatItem key={s.label} value={s.value} suffix={s.suffix} label={s.label} delay={i * 0.08} />
              ))}
            </div>
          </div>
        </div>

        <div className="wos-auth">
          <ThemePicker theme={theme} onChange={setTheme} />

          <div className="wos-card" ref={cardRef} onMouseMove={handleTilt} onMouseLeave={resetTilt}>
            <div className="wos-card-brand">
              <span className="wos-brand-dot" /> Veyora
              <span className="wos-card-subtitle">Smart Team Workload Management</span>
            </div>

            <div className="wos-role-toggle" role="tablist" aria-label="Sign in as">
              <button
                type="button"
                role="tab"
                aria-selected={role === "manager"}
                className={role === "manager" ? "active" : ""}
                onClick={() => setRole("manager")}
              >
                Manager
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={role === "member"}
                className={role === "member" ? "active" : ""}
                onClick={() => setRole("member")}
              >
                Team Member
              </button>
            </div>

            {status !== "success" ? (
              <form onSubmit={handleSubmit}>
                <h1>{active.title}</h1>
                <p className="wos-desc">{active.desc}</p>

                <div className="wos-field">
                  <label htmlFor="loginId">{active.idLabel}</label>
                  <input
                    id="loginId"
                    type="text"
                    placeholder={active.idPlaceholder}
                    value={form.id}
                    onChange={handleChange("id")}
                    required
                  />
                </div>

                {active.showTeamCode && (
                  <div className="wos-field">
                    <label htmlFor="teamCode">Workspace / team code</label>
                    <select id="teamCode" value={form.teamCode} onChange={handleChange("teamCode")}>
                      <option>PS2 · Core Build Team</option>
                      <option>PS2 · Design Pod</option>
                      <option>PS2 · QA Squad</option>
                    </select>
                  </div>
                )}

                <div className="wos-field">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange("password")}
                    required
                  />
                </div>

                <div className="wos-field-row">
                  <label>
                    <input type="checkbox" checked={form.remember} onChange={handleChange("remember")} />
                    Stay signed in
                  </label>
                  <a href="#forgot" onClick={(e) => e.preventDefault()}>
                    Forgot password?
                  </a>
                </div>

                <button className="wos-btn" type="submit" disabled={status === "submitting"}>
                  {status === "submitting" ? "Signing in…" : active.submitLabel}
                </button>

                <div className="wos-access-note">{active.note}</div>
              </form>
            ) : (
              <div className="wos-success-state">
                <div className="wos-load-spin" aria-hidden="true">
                  <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="var(--bg-tertiary)" strokeWidth="7" />
                    <circle
                      className="wos-load-spin-arc"
                      cx="50" cy="50" r="42" fill="none" stroke="var(--accent)" strokeWidth="7"
                      strokeLinecap="round" strokeDasharray="70 210"
                    />
                  </svg>
                  <span className="wos-load-spin-core">{active.label[0]}</span>
                </div>
                <h2>Welcome, {form.id.split("@")[0] || active.label}</h2>
                <p>Signing you in as {active.label}</p>
                <div className="wos-loadbar" role="progressbar" aria-label="Loading workspace">
                  <span className="wos-loadbar-fill" />
                </div>
                <div className="wos-load-step" key={loadStep}>{LOAD_STEPS[loadStep]}</div>
              </div>
            )}

            <div className="wos-divider">demo · no backend</div>
            <p className="wos-foot-link">
              Not on the team?{" "}
              <a href="#contact" onClick={(e) => e.preventDefault()}>
                Ask your manager for access
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   STYLES — injected via <style> so the whole page is one file.
   Every selector is prefixed with "wos-" (and the root itself
   is .wos-login-page) so nothing here can collide with class
   names used on your other five pages.
   ============================================================ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Sora:wght@600;700;800&display=swap');

.wos-login-page {
  --font-ui: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-display: 'Sora', 'Inter', sans-serif;
  position: fixed; inset: 0; z-index: 100;
  font-family: var(--font-ui);
  background: var(--bg-primary);
  color: var(--text-primary);
  overflow-y: auto;
  transition: background .4s ease, color .4s ease;
  animation: wos-page-in .55s cubic-bezier(.22,1,.36,1) both;
}
@keyframes wos-page-in { from { opacity: 0; } to { opacity: 1; } }

/* staged entrance: hero slides from the left, auth panel from the right, card pops last */
.wos-hero-inner { animation: wos-fade-left .7s cubic-bezier(.22,1,.36,1) both; }
.wos-auth { animation: wos-fade-right .7s .08s cubic-bezier(.22,1,.36,1) both; }
.wos-card { animation: wos-card-in .6s .18s cubic-bezier(.22,1,.36,1) both; }
@keyframes wos-fade-left { from { opacity: 0; transform: translateX(-26px); } to { opacity: 1; transform: none; } }
@keyframes wos-fade-right { from { opacity: 0; transform: translateX(26px); } to { opacity: 1; transform: none; } }
@keyframes wos-card-in { from { opacity: 0; transform: translateY(22px) scale(.96); } to { opacity: 1; transform: none; } }

.wos-login-page[data-theme="white"] {
  --bg-primary:#F7F9FC; --bg-secondary:#FFFFFF; --bg-tertiary:#EEF2F7;
  --surface:#FFFFFF; --surface-hover:#F1F5F9;
  --text-primary:#172033; --text-secondary:#64748B; --text-muted:#94A3B8;
  --border:#E2E8F0;
  --accent:#4F46E5; --accent-hover:#4338CA; --accent-soft:#EEF2FF;
  --success:#16A34A; --success-soft:#DCFCE7;
  --warning:#D97706; --warning-soft:#FEF3C7;
  --danger:#DC2626; --danger-soft:#FEE2E2;
  --info:#0284C7; --info-soft:#E0F2FE;
  --glow-a: 79,70,229; --glow-b: 2,132,199;
}
.wos-login-page[data-theme="twilight"] {
  --bg-primary:#1C1013; --bg-secondary:#26151A; --bg-tertiary:#301A1E;
  --surface:#281620; --surface-hover:#371E24;
  --text-primary:#FBEADE; --text-secondary:#E1AE93; --text-muted:#A5776A;
  --border:#492A2E;
  --accent:#F97316; --accent-hover:#FB8B3C; --accent-soft:#3E1F14;
  --success:#F5B301; --success-soft:#3A2A0E;
  --warning:#FB923C; --warning-soft:#3A2210;
  --danger:#EF4444; --danger-soft:#3A1616;
  --info:#FACC15; --info-soft:#3A2F0C;
  --glow-a: 249,115,22; --glow-b: 234,88,12;
}
.wos-login-page[data-theme="dark"] {
  --bg-primary:#090E1A; --bg-secondary:#111827; --bg-tertiary:#172033;
  --surface:#111827; --surface-hover:#1E293B;
  --text-primary:#F8FAFC; --text-secondary:#CBD5E1; --text-muted:#64748B;
  --border:#263449;
  --accent:#818CF8; --accent-hover:#A5B4FC; --accent-soft:#1E1B4B;
  --success:#22C55E; --success-soft:#052E16;
  --warning:#F59E0B; --warning-soft:#451A03;
  --danger:#F87171; --danger-soft:#450A0A;
  --info:#38BDF8; --info-soft:#082F49;
  --glow-a: 129,140,248; --glow-b: 56,189,248;
}
.wos-login-page[data-theme="forest"] {
  --bg-primary:#F3F8F4; --bg-secondary:#FFFFFF; --bg-tertiary:#E5F0E7;
  --surface:#FFFFFF; --surface-hover:#EDF6EF;
  --text-primary:#17251B; --text-secondary:#53665A; --text-muted:#829287;
  --border:#D5E3D8;
  --accent:#15803D; --accent-hover:#166534; --accent-soft:#DCFCE7;
  --success:#16A34A; --success-soft:#DCFCE7;
  --warning:#D97706; --warning-soft:#FEF3C7;
  --danger:#DC2626; --danger-soft:#FEE2E2;
  --info:#0284C7; --info-soft:#E0F2FE;
  --glow-a: 21,128,61; --glow-b: 2,132,199;
}

.wos-login-page * { box-sizing: border-box; }

.wos-login-wrap { position: relative; z-index: 1; display: flex; min-height: 100vh; width: 100%; }

/* ---------------- HERO ---------------- */

.wos-hero { position: relative; flex: 1.4; display: flex; flex-direction: column; justify-content: center; gap: 30px; padding: 48px 56px; min-width: 0; overflow: hidden; }

.wos-bg-field { position: absolute; inset: -60px; z-index: 0; overflow: hidden; pointer-events: none; transform: translate(var(--px, 0px), var(--py, 0px)); transition: transform .35s ease-out; }
.wos-orb { position: absolute; border-radius: 50%; filter: blur(90px); opacity: .32; }
.wos-orb-a { width: 520px; height: 520px; top: -80px; left: -60px; background: radial-gradient(circle, rgba(var(--glow-a), .6), transparent 70%); animation: wos-drift-a 16s ease-in-out infinite; }
.wos-orb-b { width: 600px; height: 600px; bottom: -140px; right: -100px; background: radial-gradient(circle, rgba(var(--glow-b), .55), transparent 70%); animation: wos-drift-b 19s ease-in-out infinite; }
.wos-speed-lines { position: absolute; inset: 0; opacity: .5; background-image: repeating-linear-gradient(115deg, rgba(var(--glow-a), 0.05) 0px, rgba(var(--glow-a), 0.05) 1px, transparent 1px, transparent 64px); }

@keyframes wos-drift-a { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(30px, 20px); } }
@keyframes wos-drift-b { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-26px, -18px); } }

.wos-hero-inner { position: relative; z-index: 1; display: flex; flex: 1; flex-direction: column; justify-content: space-between; gap: 26px; width: 100%; max-width: 680px; }

.wos-brand-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.wos-brand { display: flex; align-items: center; gap: 10px; font-family: var(--font-display); font-weight: 700; font-size: 18px; }
.wos-brand-dot { width: 10px; height: 10px; border-radius: 3px; background: var(--accent); box-shadow: 0 0 16px rgba(var(--glow-a), .8); transform: rotate(45deg); flex-shrink: 0; }

.wos-live-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 11.5px; font-weight: 700; letter-spacing: .04em; color: var(--success); background: var(--success-soft); border: 1px solid var(--border); padding: 5px 11px; border-radius: 999px; }
.wos-live-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--success); animation: wos-pulse-dot 1.6s ease-in-out infinite; }
@keyframes wos-pulse-dot { 0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(34,197,94,.5); } 50% { opacity: .6; box-shadow: 0 0 0 5px rgba(34,197,94,0); } }

.wos-wave { width: 100%; max-width: 260px; height: 30px; opacity: .85; }
.wos-wave-line { stroke: var(--accent); stroke-dasharray: 420; stroke-dashoffset: 420; animation: wos-draw 3s ease-in-out infinite; }
@keyframes wos-draw { 0% { stroke-dashoffset: 420; opacity: .2; } 50% { stroke-dashoffset: 0; opacity: 1; } 100% { stroke-dashoffset: -420; opacity: .2; } }

.wos-hero-stats { display: flex; gap: 32px; flex-wrap: wrap; }
.wos-stat { display: flex; flex-direction: column; gap: 2px; animation: wos-rise .6s ease both; }
.wos-stat b { font-family: var(--font-display); font-size: 20px; font-variant-numeric: tabular-nums; }
.wos-stat span { font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: .08em; }

/* ---------------- CAROUSEL ---------------- */

.wos-carousel { display: flex; flex-direction: column; gap: 16px; }

.wos-progress-row { display: flex; gap: 6px; }
.wos-progress-seg { position: relative; flex: 1; height: 4px; border-radius: 999px; background: var(--border); border: none; padding: 0; cursor: pointer; overflow: hidden; }
.wos-progress-fill { position: absolute; inset: 0; width: 0; background: var(--accent); border-radius: 999px; transition: width .1s linear; }

.wos-stage { position: relative; min-height: 360px; display: flex; align-items: flex-start; }

.wos-nav-btn { position: absolute; top: 50%; transform: translateY(-50%); z-index: 2; width: 34px; height: 34px; border-radius: 50%; border: 1px solid var(--border); background: var(--surface); color: var(--text-secondary); font-size: 18px; line-height: 1; cursor: pointer; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity .2s ease, background .2s ease, color .2s ease, transform .2s ease; box-shadow: 0 8px 20px rgba(15,23,42,.12); }
.wos-carousel:hover .wos-nav-btn { opacity: 1; }
.wos-nav-btn:hover { background: var(--accent); color: #fff; }
.wos-nav-prev { left: -14px; }
.wos-nav-next { right: -14px; }

.wos-slide { width: 100%; display: flex; flex-direction: column; align-items: flex-start; gap: 14px; animation: wos-slide-in .35s cubic-bezier(.22,1,.36,1) both; }
@keyframes wos-slide-in { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

.wos-eyebrow { font-size: 12px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--accent); background: var(--accent-soft); border: 1px solid var(--border); padding: 6px 12px; border-radius: 999px; }
.wos-headline { font-family: var(--font-display); font-weight: 800; font-size: 34px; line-height: 1.15; letter-spacing: -.01em; max-width: 480px; }
.wos-sub { font-size: 14.5px; color: var(--text-secondary); line-height: 1.6; max-width: 460px; }

/* ---------------- VISUAL CARDS ---------------- */

.wos-vis { margin-top: 4px; display: flex; flex-direction: column; gap: 10px; width: 100%; max-width: 420px; }
.wos-vis-row { display: flex; align-items: center; gap: 12px; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 10px 14px; box-shadow: 0 10px 26px rgba(15,23,42,.08); animation: wos-rise .5s ease both, wos-float 5s ease-in-out infinite; }
.wos-avatar { width: 32px; height: 32px; border-radius: 10px; background: var(--accent-soft); color: var(--accent); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; flex-shrink: 0; }
.wos-avatar.sm { width: 26px; height: 26px; font-size: 11px; border-radius: 8px; }
.wos-vis-row-main { flex: 1; min-width: 0; }
.wos-vis-row-top { display: flex; justify-content: space-between; font-size: 12.5px; font-weight: 600; margin-bottom: 6px; }
.wos-vis-pct { color: var(--text-secondary); font-weight: 600; }
.wos-vis-track { height: 6px; border-radius: 4px; background: var(--bg-tertiary); overflow: hidden; }
.wos-vis-fill { height: 100%; border-radius: 4px; width: var(--w, 0%); transform-origin: left; transform: scaleX(0); animation: wos-fillbar .7s cubic-bezier(.22,1,.36,1) forwards; }
.wos-tone-success { background: var(--success); }
.wos-tone-warning { background: var(--warning); }
.wos-tone-danger { background: var(--danger); }
.wos-tone-info { background: var(--info); }

.wos-vis-pill { align-self: flex-start; display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600; color: var(--text-secondary); background: var(--danger-soft); border: 1px solid var(--border); border-radius: 999px; padding: 6px 12px; animation: wos-rise .5s ease both; }
.wos-vis-dot { width: 7px; height: 7px; border-radius: 50%; }
.wos-vis-warn { color: var(--warning); font-size: 12px; }

.wos-vis-match { align-items: center; }
.wos-task-card { align-self: stretch; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 14px; font-size: 13.5px; font-weight: 600; box-shadow: 0 10px 26px rgba(15,23,42,.08); animation: wos-rise .5s ease both; }
.wos-task-label { display: block; font-size: 10.5px; text-transform: uppercase; letter-spacing: .08em; color: var(--text-muted); font-weight: 700; margin-bottom: 4px; }
.wos-links { display: flex; justify-content: center; gap: 40px; width: 100%; padding: 4px 0; }
.wos-link-line { width: 1.5px; height: 20px; background: var(--accent); opacity: .25; animation: wos-pulse-line 1.6s ease-in-out infinite; }
@keyframes wos-pulse-line { 0%, 100% { opacity: .2; } 50% { opacity: .9; } }
.wos-match-chips { display: flex; gap: 12px; width: 100%; }
.wos-chip { flex: 1; display: flex; align-items: center; gap: 10px; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 10px; box-shadow: 0 10px 26px rgba(15,23,42,.08); animation: wos-rise .5s ease both; }
.wos-chip-name { font-size: 12.5px; font-weight: 600; }
.wos-chip-tag { font-size: 10.5px; color: var(--success); font-weight: 600; }
.wos-chip-tag.muted { color: var(--text-muted); }

.wos-deadline-card { display: flex; align-items: center; justify-content: space-between; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 12px 14px; box-shadow: 0 10px 26px rgba(15,23,42,.08); animation: wos-rise .5s ease both; }
.wos-deadline-task { font-size: 13px; font-weight: 600; }
.wos-deadline-date { font-size: 11.5px; color: var(--text-muted); margin-top: 2px; }
.wos-badge { font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px; }
.wos-badge.wos-tone-success { background: var(--success-soft); color: var(--success); }
.wos-badge.wos-tone-warning { background: var(--warning-soft); color: var(--warning); }
.wos-badge.wos-tone-danger { background: var(--danger-soft); color: var(--danger); }

.wos-vis-health { flex-direction: row; align-items: center; gap: 22px; max-width: 420px; }
.wos-health-ring { position: relative; width: 118px; height: 118px; flex: 0 0 118px; }
.wos-health-ring svg { width: 100%; height: 100%; }
.wos-health-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.wos-health-center b { font-family: var(--font-display); font-size: 30px; color: var(--success); line-height: 1; }
.wos-health-center span { font-size: 9px; color: var(--text-muted); letter-spacing: .06em; margin-top: 2px; }
.wos-health-stats { display: flex; flex-direction: column; gap: 10px; }
.wos-health-stat { display: flex; align-items: center; gap: 9px; font-size: 13px; color: var(--text-secondary); background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 8px 14px; box-shadow: 0 10px 26px rgba(15,23,42,.08); animation: wos-rise .5s ease both; }
.wos-health-stat b { font-family: var(--font-display); font-size: 15px; color: var(--text-primary); min-width: 14px; }
@keyframes wos-ring-in { from { stroke-dasharray: 0 264; } }

@keyframes wos-rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes wos-fillbar { to { transform: scaleX(1); } }
@keyframes wos-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }

/* ---------------- AUTH / CARD (unchanged visuals, scoped names) ---------------- */

.wos-auth { width: 460px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; position: relative; padding: 32px; }

.wos-theme-picker { position: absolute; top: 32px; right: 32px; display: flex; gap: 6px; background: var(--surface); border: 1px solid var(--border); padding: 5px; border-radius: 999px; box-shadow: 0 8px 24px rgba(15,23,42,.08); z-index: 2; }
.wos-theme-swatch { width: 20px; height: 20px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; padding: 0; }
.wos-theme-swatch.active { border-color: var(--text-primary); }

.wos-card { width: 100%; max-width: 380px; background: var(--surface); border: 1px solid var(--border); border-radius: 22px; padding: 30px 30px 26px; box-shadow: 0 24px 70px rgba(15,23,42,.18); backdrop-filter: blur(14px); transform-style: preserve-3d; transition: transform .12s ease, box-shadow .3s ease, background .4s ease, border-color .4s ease; }

.wos-card-brand { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; font-family: var(--font-display); font-weight: 700; font-size: 16px; margin-bottom: 4px; }
.wos-card-subtitle { width: 100%; font-family: var(--font-ui); font-weight: 500; font-size: 12.5px; color: var(--text-secondary); }

.wos-role-toggle { display: flex; background: var(--bg-tertiary); border: 1px solid var(--border); border-radius: 14px; padding: 4px; gap: 4px; margin: 20px 0 22px; }
.wos-role-toggle button { flex: 1; border: none; background: transparent; padding: 10px 8px; border-radius: 10px; font-family: var(--font-ui); font-weight: 600; font-size: 13px; color: var(--text-secondary); cursor: pointer; transition: all .2s ease; }
.wos-role-toggle button.active { background: var(--surface); color: var(--accent); box-shadow: 0 6px 16px rgba(15,23,42,.1); }

.wos-card h1 { font-family: var(--font-display); font-size: 21px; font-weight: 700; margin-bottom: 6px; }
.wos-card .wos-desc { font-size: 13.5px; color: var(--text-secondary); margin-bottom: 22px; line-height: 1.5; }

.wos-field { margin-bottom: 15px; }
.wos-field label { display: block; font-size: 12px; font-weight: 600; color: var(--text-secondary); margin-bottom: 6px; }
.wos-field input, .wos-field select { width: 100%; padding: 11px 13px; border-radius: 11px; border: 1px solid var(--border); background: var(--bg-secondary); color: var(--text-primary); font-family: var(--font-ui); font-size: 14px; outline: none; transition: border-color .15s ease, box-shadow .15s ease; }
.wos-field input:focus, .wos-field select:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }

.wos-field-row { display: flex; align-items: center; justify-content: space-between; margin: 2px 0 20px; font-size: 12.5px; }
.wos-field-row label { display: flex; align-items: center; gap: 6px; color: var(--text-secondary); cursor: pointer; }
.wos-field-row a { color: var(--accent); text-decoration: none; font-weight: 600; }

.wos-btn { width: 100%; padding: 12px; border: none; border-radius: 12px; font-family: var(--font-ui); font-weight: 600; font-size: 14.5px; cursor: pointer; background: var(--accent); color: #fff; transition: transform .15s ease, background .15s ease, box-shadow .15s ease; box-shadow: 0 10px 24px rgba(var(--glow-a), .35); }
.wos-btn:hover:not(:disabled) { background: var(--accent-hover); transform: translateY(-2px); }
.wos-btn:disabled { opacity: .75; cursor: default; }

.wos-access-note { margin-top: 14px; background: var(--accent-soft); border: 1px solid var(--border); border-radius: 11px; padding: 10px 12px; font-size: 12px; color: var(--text-secondary); line-height: 1.5; }

.wos-divider { display: flex; align-items: center; gap: 10px; margin: 20px 0 14px; color: var(--text-muted); font-size: 11.5px; }
.wos-divider::before, .wos-divider::after { content: ''; flex: 1; height: 1px; background: var(--border); }

.wos-foot-link { text-align: center; font-size: 13px; color: var(--text-secondary); }
.wos-foot-link a { color: var(--accent); font-weight: 600; text-decoration: none; }

.wos-success-state { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 10px; padding: 22px 0 14px; animation: wos-pop .4s ease; }
@keyframes wos-pop { 0% { transform: scale(.94); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }

.wos-load-spin { position: relative; width: 66px; height: 66px; margin-bottom: 4px; }
.wos-load-spin svg { width: 100%; height: 100%; transform-origin: center; }
.wos-load-spin-arc { transform-origin: center; animation: wos-spin 1s linear infinite; }
@keyframes wos-spin { to { transform: rotate(360deg); } }
.wos-load-spin-core { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-weight: 800; font-size: 24px; color: var(--accent); }

.wos-success-state h2 { font-family: var(--font-display); font-size: 18px; }
.wos-success-state p { font-size: 13px; color: var(--text-secondary); }

.wos-loadbar { width: 100%; height: 7px; margin-top: 14px; border-radius: 999px; background: var(--bg-tertiary); overflow: hidden; }
.wos-loadbar-fill { display: block; height: 100%; width: 0; border-radius: 999px; background: linear-gradient(90deg, var(--accent), var(--accent-hover)); box-shadow: 0 0 12px rgba(var(--glow-a), .5); animation: wos-loadbar-grow 3.5s cubic-bezier(.5,.05,.2,1) forwards; }
@keyframes wos-loadbar-grow {
  0% { width: 4%; }
  25% { width: 42%; }
  55% { width: 68%; }
  80% { width: 88%; }
  100% { width: 100%; }
}
.wos-load-step { margin-top: 10px; font-size: 12.5px; color: var(--text-muted); font-weight: 600; letter-spacing: .01em; min-height: 16px; animation: wos-rise .4s ease; }

/* ---------------- RESPONSIVE ---------------- */

@media (max-width: 1080px) { .wos-hero { padding: 40px; } .wos-auth { width: 420px; } }
@media (max-width: 900px) {
  .wos-login-wrap { flex-direction: column-reverse; }
  .wos-hero { padding: 32px 28px 48px; }
  .wos-auth { width: 100%; padding: 28px; }
  .wos-theme-picker { position: static; margin-bottom: 16px; align-self: flex-end; }
  .wos-stage { min-height: 320px; }
}
@media (max-width: 480px) {
  .wos-headline { font-size: 26px; }
  .wos-card { padding: 24px 20px; }
  .wos-hero-stats { gap: 20px; }
  .wos-nav-btn { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .wos-login-page *, .wos-login-page *::before, .wos-login-page *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;

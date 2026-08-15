# SIH Starter

A reusable **React + Vite** frontend starter for Smart India Hackathon (and similar
time-boxed hackathons). It is deliberately generic — no domain-specific naming,
copy, or logic — so a team can clone it on day one and rebrand it around whatever
problem statement they draw.

It ships with a landing page, login screen, dashboard, a generic
upload-and-analyze flow, a result screen, and a history screen, all wired
together with React Router and a placeholder API layer.

## 1. Install dependencies

```bash
npm install
```

## 2. Run the project

```bash
npm run dev
```

This starts Vite's dev server (defaults to `http://localhost:5173`) with hot reload.

Other scripts:

```bash
npm run build      # production build into dist/
npm run preview    # preview the production build locally
```

## 3. Project structure

```text
sih-starter/
├── public/
│   └── images/            # static assets (logo, icons, illustrations)
│
├── src/
│   ├── components/        # small, reusable, prop-driven UI pieces
│   ├── pages/              # one file per route
│   ├── services/
│   │   └── api.js          # placeholder functions for the real backend
│   ├── data/
│   │   └── demoData.js     # generic demo data used until the API is live
│   ├── App.jsx              # routes + the one shared Navbar/Footer
│   ├── main.jsx              # React + Router entry point
│   └── index.css              # design tokens (colors, type, spacing) + base styles
│
├── package.json
├── vite.config.js
└── README.md
```

**Routes:** `/`, `/login`, `/dashboard`, `/analysis`, `/result`, `/history`.

The `Navbar` and `Footer` are rendered once in `App.jsx`. Don't import them
inside individual pages — that would create duplicates.

## 4. How to add a new page

1. Create `src/pages/YourPage.jsx` and `src/pages/YourPage.css`.
2. Import the page in `src/App.jsx` and add a `<Route path="/your-path" element={<YourPage />} />`.
3. If it belongs in the main nav, add it to the `links` array in `src/components/Navbar.jsx`.

Keep page components focused on layout and state; pull repeated UI into
`src/components/`.

## 5. How to add a new component

1. Create `src/components/YourComponent.jsx` and a matching `.css` file.
2. Accept content through **props**, not hardcoded text, so the component can
   be reused across pages. For example:

   ```jsx
   <StatCard label="Total Reports" value="128" />
   ```

3. Import the component wherever it's needed. If several pages render a list
   of the same component, use `.map()` instead of copy-pasting JSX.

## 6. How to connect a real API

All network calls are isolated in `src/services/api.js`. Each function is a
placeholder today — for example:

```js
export async function analyzeFile(file, data = {}) {
  // Placeholder for future backend API.
}
```

To connect a real backend:

1. Keep the function name and signature the same.
2. Replace the body with a real `fetch()` (or `axios`) call.
3. Read the base URL from an environment variable, e.g. `VITE_API_BASE_URL` in
   a `.env` file, so it's easy to switch between local and deployed backends.

Because pages only ever import from `services/api.js`, this is the **only**
file that needs to change when the backend becomes available.

## 7. How to replace demo data

`src/data/demoData.js` exports plain arrays/objects (`dashboardStats`,
`recentReports`, `historyItems`, `exampleResult`, etc.) that pages currently
import directly. Once an API endpoint is ready:

1. Call the matching function in `services/api.js` from the page (e.g. inside
   a `useEffect`).
2. Store the response in state and render that instead of the imported demo
   data.
3. You can delete the corresponding export from `demoData.js` once nothing
   references it.

## 8. Rebranding for your problem statement

- Update the project name and logo mark in `src/components/Navbar.jsx`.
- Update the hero headline/subtitle in `src/pages/Home.jsx`.
- Update `<title>` and the meta description in `index.html`.
- Adjust the color tokens at the top of `src/index.css` (`--color-accent`,
  etc.) if you want a different accent color.
- Rename "Analysis" to whatever fits your problem statement (e.g. "Detection",
  "Prediction", "Matching") in the Navbar, page headings, and route labels —
  the underlying route path `/analysis` can stay the same or be renamed too.

## 9. Working as a team / Git branches

The folder structure is split so multiple people can work without stepping on
each other:

- **Developer 1** → `src/pages/`
- **Developer 2** → `src/components/`
- **Developer 3** → `src/services/`
- **Developer 4** → `src/data/`

Suggested workflow:

1. Branch off `main` per feature or page: `git checkout -b feature/dashboard-page`.
2. Commit small, focused changes.
3. Open a PR (or merge locally if time is tight) back into `main`.
4. Pull `main` before starting new work to avoid conflicts, especially in
   `App.jsx` and `demoData.js`, which multiple people may touch.

During a short hackathon, agree as a team on who "owns" `App.jsx` and
`demoData.js` for merges, since those are the two files most likely to be
edited by more than one person.

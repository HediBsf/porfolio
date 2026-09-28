# Mohamed Hedi Boussoffara — Portfolio

A personal portfolio built with **React**, **Vite**, **React Three Fiber**, and **Tailwind CSS v4**. The hero is a live 3D scene: an animated neural network (nodes, edges, and traveling signal pulses) that assembles on load, responds to the cursor, and reacts to scroll.

**Live demo:** add your GitHub Pages URL here once deployed, e.g. `https://hedibsf.github.io/portfolio/`

## Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + Vite |
| 3D | Three.js via `@react-three/fiber` |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`, no config file needed) |
| Motion | Framer Motion (scroll reveals, hero entrance) |
| Deploy | GitHub Actions → GitHub Pages |

## Project structure

```
src/
├── main.jsx                       # React entry point
├── App.jsx                        # page composition
├── index.css                      # design tokens (@theme) + component classes
├── data/
│   └── content.js                 # all CV content — edit this to update text
└── components/
    ├── Navbar.jsx
    ├── Reveal.jsx                 # scroll-triggered fade/lift wrapper
    ├── TiltCard.jsx                # pointer-driven 3D tilt card
    ├── Footer.jsx
    ├── canvas/
    │   ├── SceneCanvas.jsx        # fixed background <Canvas>, WebGL/reduced-motion guards
    │   └── NeuralNetwork.jsx      # the 3D scene: nodes, edges, signal pulses, dust
    └── sections/
        ├── Hero.jsx
        ├── Projects.jsx
        ├── Experience.jsx
        ├── Skills.jsx
        └── Contact.jsx
```

## Run locally

Requires [Node.js](https://nodejs.org) 18+.

```bash
npm install
npm run dev       # starts a dev server, prints the local URL
```

```bash
npm run build      # production build to dist/
npm run preview    # serve the production build locally
```

## Deploy to GitHub Pages

1. Push this repo to GitHub (see below).
2. **Important:** `vite.config.js` sets `base: '/portfolio/'`, matching a repo named `portfolio`. If your repo has a different name, change `base` to `/your-repo-name/` (or to `/` if you deploy to a `<username>.github.io` root repo).
3. In the repo, go to **Settings → Pages**, and under **Build and deployment** set **Source** to **GitHub Actions**. The included workflow at `.github/workflows/deploy.yml` installs dependencies, builds, and publishes automatically on every push to `main`.
4. Your site goes live at `https://<your-username>.github.io/<repo-name>/`.

## Push this project to GitHub

```bash
cd mhb-portfolio-react
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/HediBsf/portfolio.git
git push -u origin main
```

Then enable Pages as described above.

## Editing content

- **Text:** everything — name, projects, experience, skills, contact links — lives in `src/data/content.js`. Edit that file; the sections re-render automatically.
- **Colors and type:** design tokens live in the `@theme` block at the top of `src/index.css` (`--color-bg`, `--color-blue`, `--color-amber`, fonts, etc).
- **The 3D scene:** `src/components/canvas/NeuralNetwork.jsx` controls layer sizes, node/edge colors, pulse count and speed, and how the scene responds to scroll and pointer position.

## Accessibility notes

- Respects `prefers-reduced-motion`: the 3D scene freezes its animation and section reveals skip their transition.
- Falls back to no canvas at all if the browser has no WebGL support, rather than erroring.
- All interactive elements have visible focus states.

## License

MIT — see [LICENSE](LICENSE).

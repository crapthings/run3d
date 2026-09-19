# run3d

Create a 3D project in one command. The starter scene has a grid and a box ready to edit.

As models like GPT-6 Astra grow more capable at building 3D experiences, the distance from an idea to a working prototype keeps shrinking. I have new ideas every day, and I want to spend that energy creating. run3d brings my go-to tools for brainstorming and experimentation into one ready-to-use starter, so I can jump straight into building, testing ideas, and discovering what works.

## Usage

Requires Node.js `^20.19.0 || >=22.12.0` and pnpm.

```bash
npx @crapthings/run3d my-project
cd my-project
pnpm dev
```

Edit `src/Scene.jsx` to make it your own. To install dependencies later, add `--skip-install` to the first command.

## Included tools

### App foundation

- [React and React DOM](https://github.com/react/react) — build and render the app UI.
- [Vite](https://github.com/vitejs/vite) — runs the development server and builds the app.

### 3D scenes

- [Three.js](https://github.com/mrdoob/three.js) — renders 3D scenes.
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) — lets you build Three.js scenes with React.
- [Drei](https://github.com/pmndrs/drei) — provides ready-made 3D helpers and controls.
- [GSAP](https://github.com/greensock/GSAP) and [@gsap/react](https://github.com/greensock/react) — animate scene and UI properties with timelines and the `useGSAP` React hook.
- [Postprocessing](https://github.com/pmndrs/postprocessing) and [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing) — add visual effects with React components.
- [pmndrs/math](https://github.com/pmndrs/math) — provides math utilities for 3D work.
- [R3F-Perf](https://github.com/utsuboco/r3f-perf) — monitors rendering performance while developing.

### Worlds and movement

- [React Three Rapier](https://github.com/pmndrs/react-three-rapier) — adds physics and collisions.
- [Recast Navigation and @recast-navigation/three](https://github.com/isaac-mason/recast-navigation-js) — generate navmeshes and find paths in Three.js scenes.
- [Navcat](https://github.com/isaac-mason/navcat) — builds and queries navmeshes in pure JavaScript, with Three.js helpers.
- [FastNoiseLite](https://github.com/Auburn/FastNoiseLite) — generates procedural 2D and 3D noise.
- [Three Hex Tiling](https://github.com/Ameobea/three-hex-tiling) — reduces visible repetition in tiled textures.

### Data and state

- [Zustand](https://github.com/pmndrs/zustand) — manages React app state.
- [Koota](https://github.com/pmndrs/koota) — manages game state with entities and components.
- [D3](https://github.com/d3/d3) — provides data scales, layouts, and visualizations.
- [p5.js](https://github.com/processing/p5.js) — creates interactive graphics and creative coding sketches.

### Interface

- [React Router](https://github.com/remix-run/react-router) — connects URLs to pages and handles navigation.
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) — styles the app.
- [React Hotkeys Hook](https://github.com/JohannesKlauss/react-hotkeys-hook) — adds declarative keyboard shortcuts with a React hook.
- [Headless UI](https://github.com/tailwindlabs/headlessui) — provides accessible, unstyled React UI components.
- [Floating UI](https://github.com/floating-ui/floating-ui) — positions menus, tooltips, and popovers.

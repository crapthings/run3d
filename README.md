# run3d

Create a 3D project in one command. The starter scene has a grid and a box ready to edit.

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

- Vite — runs the development server and builds the app.
- React and React DOM — build and render the app UI.

### 3D scenes

- Three.js — renders 3D scenes.
- pmndrs/math — provides math utilities for 3D work.
- Postprocessing — applies visual effects to rendered scenes.
- React Three Fiber — lets you build Three.js scenes with React.
- Drei — provides ready-made 3D helpers and controls.
- GSAP — animates scene and UI properties with timelines.
- `@react-three/postprocessing` — uses postprocessing effects as React components.
- R3F-Perf — monitors rendering performance while developing.

### Worlds and movement

- FastNoiseLite — generates procedural 2D and 3D noise.
- Three Hex Tiling — reduces visible repetition in tiled textures.
- Recast Navigation — generates navmeshes and finds paths.
- `@recast-navigation/three` — connects Recast Navigation to Three.js scenes.
- Navcat — builds and queries navmeshes in pure JavaScript, with Three.js helpers.
- React Three Rapier — adds physics and collisions.

### Data and state

- D3 — provides data scales, layouts, and visualizations.
- Zustand — manages React app state.
- Koota — manages game state with entities and components.

### Interface

- React Router — connects URLs to pages and handles navigation.
- Tailwind CSS — styles the app.
- Floating UI — positions menus, tooltips, and popovers.

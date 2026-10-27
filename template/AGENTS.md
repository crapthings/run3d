# Rules

## Code Style

- Follow JavaScript Standard Style (standard.js) when writing `.js` and `.jsx` files.
- Explain each top-level declaration's purpose in a one-sentence comment; split it if one sentence cannot explain it clearly.
- Avoid overengineering: question whether each solution or abstraction is needed for current requirements before implementing it.
- Use Tailwind utilities in React `className` instead of writing styles in `.css` files.
- Use Zustand for shared state and actions; avoid prop drilling.
- Use react-i18next for UI translations; keep language resources in `src/locales` and initialize them in `src/i18n.js`.

## UI Design and Components

- Design self-explanatory interfaces: use clear labels and visual hierarchy instead of explanatory text; add help text only when necessary.
- For menus, dialogs, popovers, tabs, and form controls, consult [docs/headless-ui.md](docs/headless-ui.md) and its official Headless UI links before implementation.

## Commands

- Run `pnpm build/lint/test` only on explicit user request; never run `pnpm dev`.

## World Scale

- Use a consistent world scale of 1 unit = 1 meter for all scene geometry, object dimensions, and positions.

## Architectural Geometry

- Use geometric unions or equivalent cleanup at wall intersections and floor/ceiling junctions to remove overlapping coplanar and internal faces, producing a closed shell that avoids Z-fighting; merging meshes alone is insufficient.

## Scene Lighting

- Avoid ambient lighting by default. Only add ambient lighting (such as `AmbientLight` or `HemisphereLight`) when explicitly requested by the user.

## Texture Maps

- Reduce visible texture repetition with hex tiling: use `three-hex-tiling` for `MeshStandardMaterial` and `MeshPhysicalMaterial` with `WebGLRenderer`, and `tsl-hex-tiling` for TSL node materials with `WebGPURenderer` (including its WebGL 2 fallback).

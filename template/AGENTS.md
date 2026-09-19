# Rules

## Commands

- Only run `pnpm build`, `pnpm lint`, or `pnpm test` when explicitly requested by the user, and never run `pnpm dev`.

## Code Style

- Follow JavaScript Standard Style (standard.js) when writing `.js` and `.jsx` files.

## Scene Lighting

- Avoid ambient lighting by default. Only add ambient lighting (such as `AmbientLight` or `HemisphereLight`) when explicitly requested by the user.

## Texture Maps

- When using texture maps, process them with the installed `three-hex-tiling` package to reduce visible texture repetition instead of relying on basic repeating UV tiling alone.

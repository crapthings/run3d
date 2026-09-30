# Rules

## Commands

- Only run `pnpm build`, `pnpm lint`, or `pnpm test` when explicitly requested by the user, and never run `pnpm dev`.

## Code Style

- Follow JavaScript Standard Style (standard.js) when writing `.js` and `.jsx` files.
- Explain each top-level declaration's purpose in a one-sentence comment; split it if one sentence cannot explain it clearly.
- Avoid overengineering: question whether each solution or abstraction is needed for current requirements before implementing it.
- Write component styles inline with Tailwind utilities in `className`, using arbitrary values when needed; use CSS files only for global setup or styles Tailwind cannot express.

## Scene Lighting

- Avoid ambient lighting by default. Only add ambient lighting (such as `AmbientLight` or `HemisphereLight`) when explicitly requested by the user.

## Texture Maps

- When using texture maps, process them with the installed `three-hex-tiling` package to reduce visible texture repetition instead of relying on basic repeating UV tiling alone.

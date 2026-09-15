# run3d

A simple 3D sandbox so you don't have to set up the same project every time.
JavaScript, Vite, React Three Fiber, Drei, and Tailwind CSS — with a grid and a box to start with.

Also includes [pmndrs/math](https://github.com/pmndrs/math) (`math`), [React Three Rapier](https://github.com/pmndrs/react-three-rapier) (`@react-three/rapier`), and [Floating UI for React](https://floating-ui.com/docs/react) (`@floating-ui/react`).

React and React DOM are pinned to 19.2.8 to match React Three Fiber 9.7's supported range (`>=19 <19.3`). The template uses stable dependencies and a committed lockfile for reproducible installs.

## Usage

Requires Node.js `^20.19.0 || >=22.12.0` and pnpm. Generated projects pin pnpm 12.4.1.

```bash
npx @crapthings/run3d my-project
cd my-project
pnpm dev
```

Edit `src/Scene.jsx` and start building. Use `--skip-install` to skip dependency installation.

## Publishing

Log in once with `npm login`. From this repository, run:

```bash
pnpm release       # 0.1.1 → 0.1.2
pnpm release minor # 0.1.1 → 0.2.0
pnpm release major # 0.1.1 → 1.0.0
```

The command checks that the current branch includes the latest version on `origin`, checks npm login, runs lint, tests and a package dry run, bumps the version, commits **all current changes and unignored new files**, publishes to npm, then creates a version tag and pushes the commit and tag to the same branch on `origin`. Review `git status` first. npm may prompt for two-factor authentication.

If a release fails, follow the recovery commands printed by the script. If npm publishing succeeded but Git pushing failed, only retry the Git steps. Running `pnpm release` again starts a new version.

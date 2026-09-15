# run3d

Scaffold a minimal JavaScript 3D project. Start with a full-screen light canvas,
a Drei grid, and a box you can orbit around.

The template keeps its source files flat so you can choose your own project structure.

## Included

- Vite and React with JavaScript / JSX
- Three.js, React Three Fiber, and Drei
- Tailwind CSS with its Vite plugin and standard `@import "tailwindcss"` entry
- `@/` imports pointing to `src`, with editor support
- pnpm configuration and a dependency lockfile

## Requirements

- Node.js `^20.19.0 || >=22.12.0`
- pnpm available on your PATH; the generated project specifies `pnpm@11.20.0`

## Quick start

Once the package is available on npm:

```bash
npx run3d my-project
cd my-project
pnpm dev
```

The CLI creates the project and runs `pnpm install`. If pnpm is missing, it
leaves the files in place and prints the commands to run after installing pnpm.

To try the source checkout before an npm release, see [Development](#development).

### CLI options

```text
run3d <project-name> [--skip-install]

--skip-install  Create files without running pnpm install
-h, --help      Show help
-v, --version   Show the CLI version
```

The destination must be empty or not yet exist. Project names may contain
letters, numbers, dots, underscores, and hyphens, and must start with a letter
or number.

To install dependencies yourself:

```bash
npx run3d my-project --skip-install
cd my-project
pnpm install
pnpm dev
```

### Generated project

```text
my-project/
├── src/
│   ├── App.jsx
│   ├── Scene.jsx
│   ├── main.jsx
│   └── styles.css
├── .gitignore
├── .npmrc
├── index.html
├── jsconfig.json
├── package.json
├── pnpm-lock.yaml
└── vite.config.js
```

Edit `src/Scene.jsx` to change the box, grid, lights, and camera. OrbitControls
supports dragging to orbit and scrolling to zoom. The example does not need
remote textures or models.

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Build into `dist` |
| `pnpm preview` | Preview the production build locally |

## Imports

Use `@/` to import from `src`, with editor completion and navigation configured
through `jsconfig.json`:

```js
import { Scene } from '@/Scene'
```

`jsconfig.json` provides editor navigation; Vite resolves the same alias during
development and production builds. No TypeScript compiler is required.

## Development

```bash
git clone https://github.com/crapthings/run3d.git
cd run3d
pnpm install
pnpm lint
pnpm test
```

Create a project directly from the local CLI:

```bash
node bin/run3d.js my-game --skip-install
cd my-game
pnpm install
pnpm build
pnpm dev
```

Use a temporary directory or a disposable destination when testing the CLI.
Changes to `template/` affect newly generated projects, not existing projects.

To work on the template itself:

```bash
cd template
pnpm install
pnpm dev
```

StandardJS checks the CLI, tests, and template JS / JSX from the repository root.
Run `pnpm lint:fix` to apply automatic formatting fixes. Local dependencies and
build output are excluded from both Git and the published package.

## Release checks

```bash
pnpm lint
pnpm test
pnpm pack:check
npm pack
```

Test the resulting archive from a separate directory before publishing:

```bash
npx --package=/absolute/path/to/run3d-0.1.0.tgz run3d my-game
cd my-game
pnpm build
pnpm dev
```

## Contributing

Issues and pull requests are welcome. Keep the starter small, use JavaScript /
JSX, and run lint, tests, and a template build before submitting a change.

## License

[MIT](LICENSE) © crapthings

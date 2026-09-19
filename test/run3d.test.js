import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { mkdtemp, readFile, readdir, rm, stat } from 'node:fs/promises'
import { promisify } from 'node:util'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { tmpdir } from 'node:os'
import test from 'node:test'

const execute = promisify(execFile)
const rootDirectory = dirname(fileURLToPath(import.meta.url))
const cli = join(rootDirectory, '../bin/run3d.js')

test('creates the starter without installing dependencies', async () => {
  const temporaryDirectory = await mkdtemp(join(tmpdir(), 'run3d-'))

  try {
    await execute(process.execPath, [cli, 'my-game', '--skip-install'], { cwd: temporaryDirectory })

    const projectDirectory = join(temporaryDirectory, 'my-game')
    const packageJson = JSON.parse(await readFile(join(projectDirectory, 'package.json'), 'utf8'))

    assert.equal(packageJson.name, 'my-game')
    assert.equal(packageJson.packageManager, 'pnpm@12.4.1')
    assert.equal(packageJson.dependencies['@react-three/fiber'], '^9.7.0')
    assert.equal(packageJson.dependencies['@react-three/postprocessing'], '^3.1.1')
    assert.equal(packageJson.dependencies.postprocessing, '^6.39.5')
    assert.equal(packageJson.dependencies.navcat, '^0.4.1')
    assert.equal(packageJson.dependencies.gsap, '^3.15.0')
    assert.equal(packageJson.dependencies.react, '19.2.8')
    assert.equal(packageJson.dependencies['react-dom'], '19.2.8')
    assert.equal(packageJson.dependencies['react-hotkeys-hook'], '^5.3.3')
    assert.equal(packageJson.dependencies.three, '^0.186.0')
    assert.equal(packageJson.dependencies['three-hex-tiling'], '^0.1.5')
    assert.equal(packageJson.dependencies['@recast-navigation/three'], '^0.43.1')
    assert.equal(packageJson.dependencies['recast-navigation'], '^0.43.1')
    assert.equal(packageJson.dependencies.koota, '^0.6.6')
    assert.equal(packageJson.dependencies.zustand, '^5.0.15')
    assert.equal(packageJson.dependencies['react-router'], '^7.18.3')
    assert.equal(packageJson.scripts.build, 'vite build')
    assert.equal(packageJson.devDependencies.typescript, undefined)
    assert.equal(packageJson.devDependencies['@types/react'], undefined)
    assert.equal(packageJson.devDependencies['@types/react-dom'], undefined)
    assert.equal(packageJson.devDependencies['@types/three'], undefined)
    assert.equal(packageJson.devDependencies['@tailwindcss/vite'], '^4.3.3')
    assert.equal(packageJson.devDependencies['r3f-perf'], '^7.2.3')
    assert.equal(packageJson.devDependencies.tailwindcss, '^4.3.3')
    assert.equal((await stat(join(projectDirectory, '.gitignore'))).isFile(), true)
    assert.equal((await stat(join(projectDirectory, '.npmrc'))).isFile(), true)
    assert.equal((await stat(join(projectDirectory, 'src/App.jsx'))).isFile(), true)
    assert.equal((await stat(join(projectDirectory, 'src/Scene.jsx'))).isFile(), true)
    assert.match(await readFile(join(projectDirectory, 'src/main.jsx'), 'utf8'), /import 'three-hex-tiling'/)
    await assert.rejects(stat(join(projectDirectory, 'src/scene')), { code: 'ENOENT' })
    const generatedFiles = await readdir(join(projectDirectory, 'src'), { recursive: true })
    assert.equal(generatedFiles.some((file) => file.endsWith('.ts') || file.endsWith('.tsx')), false)
    await assert.rejects(stat(join(projectDirectory, 'node_modules')), { code: 'ENOENT' })
    await assert.rejects(stat(join(projectDirectory, 'dist')), { code: 'ENOENT' })
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true })
  }
})

test('does not overwrite a populated destination', async () => {
  const temporaryDirectory = await mkdtemp(join(tmpdir(), 'run3d-'))

  try {
    await execute(process.execPath, [cli, 'existing', '--skip-install'], { cwd: temporaryDirectory })
    await assert.rejects(
      execute(process.execPath, [cli, 'existing', '--skip-install'], { cwd: temporaryDirectory }),
      /not empty/
    )
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true })
  }
})

import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const cwd = fileURLToPath(new URL('..', import.meta.url))
const [bump = 'patch', ...extra] = process.argv.slice(2)
const run = (command, args, capture = false) => execFileSync(command, args, {
  cwd,
  stdio: capture ? ['ignore', 'pipe', 'inherit'] : 'inherit',
  encoding: 'utf8'
})?.trim()
let version
let committed = false
let published = false
let tagged = false
let branch

try {
  if (!['patch', 'minor', 'major'].includes(bump) || extra.length) {
    throw new Error('Usage: pnpm release [patch|minor|major]')
  }

  branch = run('git', ['symbolic-ref', '--short', 'HEAD'], true)
  run('git', ['remote', 'get-url', 'origin'], true)
  if (run('git', ['diff', '--name-only', '--diff-filter=U'], true)) {
    throw new Error('Resolve Git conflicts before releasing.')
  }
  run('git', ['fetch', 'origin', branch])
  run('git', ['merge-base', '--is-ancestor', 'FETCH_HEAD', 'HEAD'])
  run('npm', ['whoami'])
  run('pnpm', ['lint'])
  run('pnpm', ['test'])
  run('pnpm', ['pack:check'])

  run('npm', ['version', bump, '--no-git-tag-version'])
  version = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')).version
  if (run('git', ['tag', '--list', `v${version}`], true)) {
    throw new Error(`Tag v${version} already exists.`)
  }
  run('git', ['add', '--all'])
  run('git', ['commit', '-m', `Release v${version}`])
  committed = true
  run('npm', ['publish', '--access', 'public'])
  published = true
  run('git', ['tag', '-a', `v${version}`, '-m', `Release v${version}`])
  tagged = true
  run('git', ['push', '--atomic', 'origin', `HEAD:refs/heads/${branch}`, `refs/tags/v${version}`])
  console.log(`\nReleased v${version} to npm and pushed the commit and tag to origin.`)
} catch (error) {
  console.error(`\nRelease stopped: ${error.message}`)
  if (published) {
    console.error(`npm already has v${version}. Do not publish it again.`)
    if (!tagged) console.error(`Run: git tag -a v${version} -m "Release v${version}"`)
    console.error(`Retry Git push: git push --atomic origin HEAD:refs/heads/${branch} refs/tags/v${version}`)
  } else if (committed) {
    console.error(`v${version} is committed locally. Check npm view @crapthings/run3d@${version} version first: a network error can occur after npm accepts a publish.`)
    console.error('If the version is absent, retry: npm publish --access public')
    console.error(`Once published: git tag -a v${version} -m "Release v${version}"`)
    console.error(`Then: git push --atomic origin HEAD:refs/heads/${branch} refs/tags/v${version}`)
  } else if (version) {
    console.error(`package.json is now v${version}. Review the working tree before retrying.`)
  }
  process.exitCode = 1
}

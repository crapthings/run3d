import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { chmod, copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { promisify } from 'node:util'
import test from 'node:test'

const execute = promisify(execFile)

for (const failure of ['', 'pnpm test', 'npm publish', 'git push']) {
  test(`release workflow: ${failure || 'success'}`, async () => {
    const directory = await mkdtemp(join(tmpdir(), 'run3d-release-'))
    try {
      await mkdir(join(directory, 'scripts'))
      await mkdir(join(directory, 'commands'))
      await writeFile(join(directory, 'commands/package.json'), '{"type":"commonjs"}')
      await writeFile(join(directory, 'package.json'), JSON.stringify({ type: 'module', version: '0.1.1' }))
      await copyFile(new URL('../scripts/release.js', import.meta.url), join(directory, 'scripts/release.js'))
      const shim = `#!${process.execPath}
const fs = require('node:fs')
const path = require('node:path')
const command = path.basename(process.argv[1]) + ' ' + process.argv.slice(2).join(' ')
fs.appendFileSync('commands.log', command + '\\n')
if (process.env.FAILURE && command.startsWith(process.env.FAILURE)) process.exit(1)
if (command.startsWith('git symbolic-ref')) console.log('main')
if (command.startsWith('npm version')) {
  const pkg = JSON.parse(fs.readFileSync('package.json'))
  pkg.version = '0.1.2'
  fs.writeFileSync('package.json', JSON.stringify(pkg))
}
`
      for (const name of ['git', 'npm', 'pnpm']) {
        const file = join(directory, 'commands', name)
        await writeFile(file, shim)
        await chmod(file, 0o755)
      }
      let result
      try {
        result = await execute(process.execPath, ['scripts/release.js'], {
          cwd: directory,
          env: { ...process.env, PATH: `${join(directory, 'commands')}:${process.env.PATH}`, FAILURE: failure }
        })
        assert.equal(failure, '')
      } catch (error) {
        assert.ok(failure)
        assert.equal(error.code, 1)
        result = error
      }
      const log = await readFile(join(directory, 'commands.log'), 'utf8')
      if (failure === 'pnpm test') {
        assert.doesNotMatch(log, /npm version|git add|npm publish/)
      } else if (failure === 'npm publish') {
        assert.match(log, /git commit -m Release v0.1.2/)
        assert.doesNotMatch(log, /git tag -a|git push/)
        assert.match(result.stderr, /Check npm view/)
      } else {
        assert.ok(log.indexOf('git commit') < log.indexOf('npm publish'))
        assert.ok(log.indexOf('npm publish') < log.indexOf('git tag -a'))
        assert.match(log, /git push --atomic origin HEAD:refs\/heads\/main refs\/tags\/v0.1.2/)
        if (failure) assert.match(result.stderr, /Do not publish it again/)
      }
    } finally {
      await rm(directory, { recursive: true, force: true })
    }
  })
}

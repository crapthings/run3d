#!/usr/bin/env node

import { access, cp, mkdir, readFile, rename, readdir, writeFile } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'

const packageDirectory = dirname(fileURLToPath(import.meta.url))
const templateDirectory = resolve(packageDirectory, '../template')
const excludedTemplateEntries = new Set(['dist', 'node_modules'])
const packageJson = JSON.parse(
  await readFile(resolve(packageDirectory, '../package.json'), 'utf8')
)

function printUsage () {
  console.log(`\nUsage: npx ${packageJson.name} <project-name> [--skip-install]\n\nOptions:\n  --skip-install  Create files without running pnpm install\n  -h, --help      Show this help message\n  -v, --version   Show the CLI version\n`)
}

function fail (message) {
  console.error(`\nerror: ${message}\n`)
  process.exitCode = 1
}

function run (command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' })

    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) {
        resolve()
        return
      }
      reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`))
    })
  })
}

async function isEmptyDirectory (directory) {
  try {
    return (await readdir(directory)).length === 0
  } catch (error) {
    if (error && error.code === 'ENOENT') return true
    throw error
  }
}

async function exists (path) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

async function main () {
  const argumentsList = process.argv.slice(2)

  if (argumentsList.includes('-h') || argumentsList.includes('--help')) {
    printUsage()
    return
  }

  if (argumentsList.includes('-v') || argumentsList.includes('--version')) {
    console.log(packageJson.version)
    return
  }

  const skipInstall = argumentsList.includes('--skip-install')
  const positionalArguments = argumentsList.filter((argument) => !argument.startsWith('-'))

  if (positionalArguments.length !== 1) {
    fail('provide exactly one project name.')
    printUsage()
    return
  }

  const projectName = positionalArguments[0]
  if (!/^[a-z0-9][a-z0-9._-]*$/i.test(projectName)) {
    fail('project name may contain only letters, numbers, dots, underscores, and hyphens.')
    return
  }

  const targetDirectory = resolve(process.cwd(), projectName)
  if ((await exists(targetDirectory)) && !(await isEmptyDirectory(targetDirectory))) {
    fail(`target directory already exists and is not empty: ${targetDirectory}`)
    return
  }

  await mkdir(targetDirectory, { recursive: true })
  const templateEntries = (await readdir(templateDirectory)).filter(
    (entry) => !excludedTemplateEntries.has(entry)
  )
  await Promise.all(
    templateEntries.map((entry) =>
      cp(join(templateDirectory, entry), join(targetDirectory, entry), {
        recursive: true,
        force: false,
        errorOnExist: true
      })
    )
  )

  const renamedTemplateFiles = [
    ['gitignore', '.gitignore'],
    ['npmrc', '.npmrc']
  ]
  for (const [sourceName, targetName] of renamedTemplateFiles) {
    const source = join(targetDirectory, sourceName)
    if (await exists(source)) {
      await rename(source, join(targetDirectory, targetName))
    }
  }

  const generatedPackagePath = join(targetDirectory, 'package.json')
  const generatedPackage = JSON.parse(await readFile(generatedPackagePath, 'utf8'))
  generatedPackage.name = projectName.toLowerCase()
  await writeFile(generatedPackagePath, `${JSON.stringify(generatedPackage, null, 2)}\n`)

  console.log(`\nCreated ${projectName} in ${targetDirectory}.`)

  if (skipInstall) {
    console.log(`\nNext steps:\n  cd ${projectName}\n  pnpm install\n  pnpm dev\n`)
    return
  }

  try {
    await run('pnpm', ['install'], targetDirectory)
    console.log(`\nReady. Start the app with:\n  cd ${projectName}\n  pnpm dev\n`)
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      console.log(`\npnpm was not found. Install it, then run:\n  cd ${projectName}\n  pnpm install\n  pnpm dev\n`)
      return
    }

    fail(`dependencies could not be installed. The project was created; run pnpm install in it to retry.\n${error.message}`)
  }
}

main().catch((error) => fail(error.message))

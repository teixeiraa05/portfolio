import { spawn } from 'node:child_process'
import { statSync, watch } from 'node:fs'
import { fileURLToPath } from 'node:url'

const dataDirectory = new URL('../src/data/', import.meta.url)
const downloads = [
  new URL('../public/RodrigoTeixeira_CV.pdf', import.meta.url),
  new URL('../public/extended_RodrigoTeixeira_CV.pdf', import.meta.url),
]

export function watchCv() {
  let saveTimer
  let refreshing = false
  let pending = false

  function refresh() {
    if (refreshing || !pending) return

    pending = false
    refreshing = true
    const npm = process.env.npm_execpath
    const args = ['run', 'cv:refresh']
    const child = spawn(
      npm ? process.execPath : 'npm',
      npm ? [npm, ...args] : args,
      {
        stdio: 'inherit',
        shell: !npm && process.platform === 'win32',
        env: { ...process.env, NODE_ENV: 'production' },
      },
    )

    child.on('error', (error) => console.error(error.message))
    child.once('close', (code) => {
      refreshing = false
      if (code === 0) console.log('Both CV PDFs refreshed.')
      else console.error('CV refresh failed. Watching for the next save.')
      refresh()
    })
  }

  // Watch the directory so editors that replace the file on save are supported.
  const watcher = watch(dataDirectory, (_event, filename) => {
    if (filename && filename !== 'portfolio.ts') return

    clearTimeout(saveTimer)
    saveTimer = setTimeout(() => {
      pending = true
      refresh()
    }, 150)
  })

  console.log('Watching src/data/portfolio.ts for CV changes.')
  const dataModifiedAt = statSync(
    new URL('portfolio.ts', dataDirectory),
  ).mtimeMs
  pending = downloads.some(
    (pdf) =>
      (statSync(pdf, { throwIfNoEntry: false })?.mtimeMs ?? 0) < dataModifiedAt,
  )
  refresh()

  return () => {
    watcher.close()
    clearTimeout(saveTimer)
    pending = false
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) watchCv()

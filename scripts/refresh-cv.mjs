import { execFile } from 'node:child_process'
import { copyFile, mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { promisify } from 'node:util'
import { preview } from 'vite'

const run = promisify(execFile)
const downloads = {
  compact: 'RodrigoTeixeira_CV.pdf',
  extended: 'extended_RodrigoTeixeira_CV.pdf',
}

const output = await mkdtemp(join(tmpdir(), 'portfolio-cv-'))
try {
  const server = await preview({ preview: { host: '127.0.0.1', port: 0 } })
  try {
    const address = server.httpServer.address()
    for (const [variant, filename] of Object.entries(downloads)) {
      await run(
        process.env.CV_CHROME_PATH || 'google-chrome',
        [
          '--headless',
          '--no-pdf-header-footer',
          '--virtual-time-budget=3000',
          `--user-data-dir=${join(output, 'chrome')}`,
          `--print-to-pdf=${join(output, filename)}`,
          `http://127.0.0.1:${address.port}/cv/?print=${variant}`,
        ],
        { timeout: 30_000 },
      )
    }
    for (const filename of Object.values(downloads)) {
      for (const directory of ['public', 'dist']) {
        await copyFile(join(output, filename), join(directory, filename))
      }
    }
  } finally {
    await server.close()
  }
} finally {
  await rm(output, { recursive: true, force: true })
}

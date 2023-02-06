import { join } from 'path'
import * as fs from 'fs'
import fsPromises from 'fs/promises'

const homedir = require('os').homedir();
export async function mkdir(path: string): Promise<void> {
  const fullPath = join(homedir, path)
  if (!fs.existsSync(fullPath)) {
    await fsPromises.mkdir(fullPath, { recursive: true })
  }
}

export async function writeFile(path: string, content: string): Promise<void> {
  const fullPath = join(homedir, path)
  await fsPromises.writeFile(fullPath, content)
}

export async function readFile(path: string): Promise<string> {
  const fullPath = join(homedir, path)
  const buffer = await fsPromises.readFile(fullPath)
  return buffer.toString()
}

export async function rmFile(path: string): Promise<void> {
  const fullPath = join(homedir, path)
  await fsPromises.unlink(fullPath)
}

export const joinPath = join

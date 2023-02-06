import { join } from 'path'
import { cwd } from 'process'
import * as fs from 'fs'
import fsPromises from 'fs/promises'

export async function mkdir(path: string): Promise<void> {
  const fullPath = join(cwd(), path)
  if (!fs.existsSync(fullPath)) {
    await fsPromises.mkdir(fullPath, { recursive: true })
  }
}

export async function writeFile(path: string, content: string): Promise<void> {
  const fullPath = join(cwd(), path)
  await fsPromises.writeFile(fullPath, content)
}

export async function readFile(path: string): Promise<string> {
  const fullPath = join(cwd(), path)
  const buffer = await fsPromises.readFile(fullPath)
  return buffer.toString()
}

export async function rmFile(path: string): Promise<void> {
  const fullPath = join(cwd(), path)
  await fsPromises.unlink(fullPath)
}

export const joinPath = join

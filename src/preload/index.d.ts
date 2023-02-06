import { ElectronAPI } from '@electron-toolkit/preload'
import { ElectronAPI } from '@electron-toolkit/preload'
import type { APIType } from './index'

declare global {
  interface Window {
    electron: ElectronAPI
    api: APIType
  }
}

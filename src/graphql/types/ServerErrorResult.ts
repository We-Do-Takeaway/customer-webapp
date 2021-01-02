export interface ServerErrorResult {
  message: string
  locations?: {
    line: number
    column: number
  }[]
  path?: (string | number)[]
  extensions?: Record<string, string | number>
}

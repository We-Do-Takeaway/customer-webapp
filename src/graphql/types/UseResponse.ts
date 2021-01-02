import { ServerErrorResult } from './ServerErrorResult'

export interface UseResponse<T> {
  loading?: boolean
  errors?: ServerErrorResult[]
  data?: T
}

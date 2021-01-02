import { ApolloError, ServerError } from '@apollo/client'
import { ServerErrorResult } from './types'

export function getServerErrors(
  error: ApolloError
): ServerErrorResult[] | undefined {
  if (error) {
    const networkError = error.networkError as ServerError
    return (
      networkError?.result?.errors || [
        {
          message: error.message,
        },
      ]
    )
  }

  return undefined
}

import {
  ApolloClient,
  createHttpLink,
  GraphQLRequest,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { getEnv } from '../utils'

const httpLink = createHttpLink({
  uri: getEnv('API_URL'),
})

const authLink = setContext((_: GraphQLRequest, { headers }) => {
  const token = localStorage.getItem('token')

  if (!token) {
    return { headers }
  }

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})

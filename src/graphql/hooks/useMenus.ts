import { ApolloError, gql, useQuery } from '@apollo/client'

import { Connection } from '../types'

export interface MenuSummary {
  id: string
  name: string
  description: string
  introduction?: string
  footer?: string
  photo?: string
}

interface UseMenusResponse {
  loading?: boolean
  error?: ApolloError
  menus?: Connection<MenuSummary>
}

interface UseMenusQueryResponse {
  menus: Connection<MenuSummary>
}

const MENUS_QUERY = gql`
  query Menus {
    menus {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
        }
      }
      nodes {
        id
        name
        description
        introduction
        footer
        photo
      }
    }
  }
`

export function useMenus(): UseMenusResponse {
  const { data, error, loading } = useQuery<UseMenusQueryResponse>(MENUS_QUERY)

  if (loading) {
    return { loading }
  }

  if (error) {
    return { error, loading }
  }

  return {
    menus: data?.menus,
    error,
    loading,
  }
}

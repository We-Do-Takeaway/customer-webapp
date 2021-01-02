import { gql, useQuery } from '@apollo/client'

import { Connection, UseResponse } from '../types'
import { getServerErrors } from '../utils'

export interface MenuSummary {
  id: string
  name: string
  description: string
  introduction?: string
  footer?: string
  photo?: string
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

export function useMenus(): UseResponse<Connection<MenuSummary>> {
  const { data, error, loading } = useQuery<UseMenusQueryResponse>(MENUS_QUERY)

  if (loading) {
    return { loading }
  }

  if (error) {
    return { errors: getServerErrors(error), loading }
  }

  return {
    data: data?.menus,
  }
}

import { gql, useQuery } from '@apollo/client'

import { Connection, UseResponse } from '../types'
import { getServerErrors } from '../utils'

export interface Item {
  id: string
  name: string
  description: string
  introduction?: string
  footer?: string
  photo?: string
}

export interface Section {
  id: string
  name: string
  description: string
  introduction?: string
  footer?: string
  photo?: string
  displayOrder?: number
  items?: Connection<Item>
}

interface Menu {
  id: string
  name: string
  description: string
  introduction?: string
  footer?: string
  sections?: Connection<Section>
}

interface UseMenuQueryResponse {
  menuById: Menu
}

const MENUS_QUERY = gql`
  query GetMenu($id: ID!) {
    menuById(id: $id) {
      id
      name
      description
      introduction
      footer
      photo
      sections {
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
          displayOrder
          items {
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
              photo
            }
          }
        }
      }
    }
  }
`

export function useMenu(id: string): UseResponse<Menu> {
  const { data, error, loading } = useQuery<UseMenuQueryResponse>(MENUS_QUERY, {
    variables: { id },
  })

  if (loading) {
    return { loading }
  }

  if (error) {
    return { errors: getServerErrors(error) }
  }

  return {
    data: data?.menuById,
  }
}

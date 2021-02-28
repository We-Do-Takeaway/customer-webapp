import { gql, useQuery } from '@apollo/client'

import { UseResponse } from '../types'
import { getServerErrors } from '../utils'

export interface Item {
  id: string
  name: string
  description: string
  photo?: string
}

export interface Section {
  id: string
  name: string
  description: string
  photo?: string
  displayOrder?: number
  items?: Item[]
}

interface Menu {
  id: string
  name: string
  description: string
  sections?: Section[]
}

interface UseMenuQueryResponse {
  menu: Menu
}

const MENUS_QUERY = gql`
  query GetMenu($id: ID!) {
    menu(id: $id) {
      id
      name
      description
      photo
      sections {
        id
        name
        description
        photo
        items {
          id
          name
          description
          photo
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
    data: data?.menu,
  }
}

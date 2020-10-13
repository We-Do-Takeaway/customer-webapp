import { ApolloError, gql, useQuery } from '@apollo/client'

export interface SectionItem {
  id: string
  name: string
  description: string
  introduction?: string
  footer?: string
  photo?: string
  order?: number
}

export interface MenuSection {
  id: string
  name: string
  description: string
  introduction?: string
  footer?: string
  photo?: string
  order?: number
  items?: SectionItem[]
}

interface Menu {
  id: string
  name: string
  description: string
  introduction?: string
  footer?: string
  sections?: MenuSection[]
}

interface UseMenuResponse {
  loading?: boolean
  error?: ApolloError
  menu?: Menu
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
      introduction
      footer
      photo
      sections {
        id
        name
        description
        introduction
        footer
        photo
        order
        items {
          id
          name
          description
        }
      }
    }
  }
`

export function useMenu(id: string): UseMenuResponse {
  const { data, error, loading } = useQuery<UseMenuQueryResponse>(MENUS_QUERY, {
    variables: { id },
  })

  if (loading) {
    return { loading }
  }

  if (error) {
    return { error, loading }
  }

  return {
    menu: data?.menu,
    error,
    loading,
  }
}

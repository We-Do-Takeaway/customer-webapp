import { ApolloError, gql, useQuery } from '@apollo/client'

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
  menus?: MenuSummary[]
}

interface UseMenusQueryResponse {
  menus: MenuSummary[]
}

const MENUS_QUERY = gql`
  query {
    menus {
      id
      name
      description
      introduction
      footer
      photo
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

import { gql, useQuery } from '@apollo/client'

import { UseResponse } from '../types'
import { getServerErrors } from '../utils'

export interface MenuSummary {
  id: string
  name: string
  description: string
  photo?: string
}

const MENUS_QUERY = gql`
  query Menus {
    menus {
      id
      name
      description
      photo
    }
  }
`

export function useMenus(): UseResponse<MenuSummary[]> {
  const { data, error, loading } = useQuery<{ menus: MenuSummary[] }>(
    MENUS_QUERY
  )

  if (loading) {
    return { loading }
  }

  if (error) {
    return { errors: getServerErrors(error), loading }
  }

  return {
    data: data?.menus || [],
  }
}

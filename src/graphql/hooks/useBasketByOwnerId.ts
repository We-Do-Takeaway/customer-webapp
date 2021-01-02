import { gql, useQuery } from '@apollo/client'

import { Basket, UseResponse } from '../types'
import { getServerErrors } from '../utils'

interface UseBasketByOwnerIdQueryResponse {
  basketByOwnerId: Basket
}

const BASKET_BY_OWNER_ID_QUERY = gql`
  query BasketByOwnerId($id: ID!) {
    basketByOwnerId(id: $id) {
      id
      ownerId
      basketType
      items {
        id
        name
        photo
        quantity
      }
    }
  }
`

export function useBasketByOwnerId(id: string): UseResponse<Basket> {
  const { data, error, loading } = useQuery<UseBasketByOwnerIdQueryResponse>(
    BASKET_BY_OWNER_ID_QUERY,
    {
      variables: { id },
    }
  )

  if (loading) {
    return { loading }
  }

  if (error) {
    return { errors: getServerErrors(error), loading }
  }

  return {
    data: data?.basketByOwnerId,
  }
}

import { gql, useQuery } from '@apollo/client'

import { Basket, UseResponse } from '../types'
import { getServerErrors } from '../utils'

interface UseBasketQueryResponse {
  basket: Basket
}

export const BASKET_QUERY = gql`
  query Basket($id: ID!) {
    basket(id: $id) {
      id
      items {
        id
        name
        photo
        quantity
      }
    }
  }
`

export function useBasket(id: string): UseResponse<Basket> {
  const { data, error, loading } = useQuery<UseBasketQueryResponse>(
    BASKET_QUERY,
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
    data: data?.basket,
  }
}

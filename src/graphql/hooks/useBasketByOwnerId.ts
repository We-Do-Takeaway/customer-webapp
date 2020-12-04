import { ApolloError, gql, useQuery } from '@apollo/client'

interface Item {
  id: string
  name: string
  quantity: number
}

export interface Basket {
  id: string
  ownerId: string
  basketType: 'CUSTOMER' | 'ANONYMOUS'
  items: Item[]
}

export interface UseBasketByOwnerIdResponse {
  loading?: boolean
  error?: ApolloError
  basket?: Basket
}

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
        quantity
      }
    }
  }
`

export function useBasketByOwnerId(id: string): UseBasketByOwnerIdResponse {
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
    return { error, loading }
  }

  return {
    basket: data?.basketByOwnerId,
    error,
    loading,
  }
}

import { gql, useMutation } from '@apollo/client'

import { getOwnerId } from '../../utils'
import { Basket } from '../types'
import { getServerErrors } from '../utils'

export interface ClearBasketMutationResponse {
  clearBasketByOwnerId: {
    basket?: Basket
  }
}

const CLEAR_BASKET_MUTATION = gql`
  mutation ClearBaskeByOwner($id: ID!) {
    clearBasketByOwnerId(id: $id) {
      basket {
        id
        ownerId
        items {
          id
          name
          quantity
        }
      }
    }
  }
`

interface IdInput {
  id: string
}

export const useClearBasket = () => {
  const [callClearBasket, { data, error, loading }] = useMutation<
    ClearBasketMutationResponse,
    IdInput
  >(CLEAR_BASKET_MUTATION)

  const clearBasket = () => {
    const id = getOwnerId()

    const variables = {
      id,
    }

    return callClearBasket({ variables })
  }

  const errors = error ? getServerErrors(error) : undefined

  return {
    clearBasket,
    data,
    errors,
    loading,
  }
}

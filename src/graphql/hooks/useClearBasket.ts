import { gql, useMutation } from '@apollo/client'

import { getBasketId } from '../../utils'
import { Basket } from '../types'
import { getServerErrors } from '../utils'

export interface ClearBasketMutationResponse {
  clearBasket: {
    basket?: Basket
  }
}

const CLEAR_BASKET_MUTATION = gql`
  mutation ClearBasket($basketId: ID!) {
    clearBasket(basketId: $basketId) {
      id
      items {
        id
        name
        quantity
      }
    }
  }
`

interface IdInput {
  basketId: string
}

export const useClearBasket = () => {
  const [callClearBasket, { data, error, loading }] = useMutation<
    ClearBasketMutationResponse,
    IdInput
  >(CLEAR_BASKET_MUTATION)

  const clearBasket = () => {
    const basketId = getBasketId()

    const variables = {
      basketId,
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

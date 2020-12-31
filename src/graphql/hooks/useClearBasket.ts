import { gql, useMutation } from '@apollo/client'
import { Basket } from '../types'
import { getOwnerId } from '../../utils'

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
  const [callClearBasket, result] = useMutation<
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

  return {
    clearBasket,
    result,
  }
}

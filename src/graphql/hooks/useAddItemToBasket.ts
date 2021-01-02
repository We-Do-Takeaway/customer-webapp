import { gql, useMutation } from '@apollo/client'

import { Basket, BasketItemInput, BasketItemParams } from '../types'
import { getServerErrors } from '../utils'

export interface AddItemToBasketMutationResponse {
  addBasketItem: {
    basket: Basket
  }
}

const ADD_BASKET_ITEM_MUTATION = gql`
  mutation AddBasketItem($input: BasketItemInput!) {
    addBasketItem(input: $input) {
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

export const useAddItemToBasket = () => {
  const [callAddItemToBasket, { data, error, loading }] = useMutation<
    AddItemToBasketMutationResponse,
    BasketItemInput
  >(ADD_BASKET_ITEM_MUTATION)

  const addItemToBasket = ({ itemId, ownerId, quantity }: BasketItemParams) => {
    const variables: BasketItemInput = {
      input: {
        itemId,
        ownerId,
        quantity,
      },
    }

    return callAddItemToBasket({
      variables,
    })
  }
  const errors = error ? getServerErrors(error) : undefined

  return { addItemToBasket, data, errors, loading }
}

import { gql, useMutation } from '@apollo/client'

import { Basket, BasketItemParams, BasketMutationVariables } from '../types'
import { getServerErrors } from '../utils'

export interface AddItemToBasketMutationResponse {
  addBasketItem: {
    basket: Basket
  }
}

const ADD_BASKET_ITEM_MUTATION = gql`
  mutation AddBasketItem($basketId: ID!, $basketItem: BasketItemInput!) {
    addBasketItem(basketId: $basketId, basketItem: $basketItem) {
      id
      items {
        id
        name
        quantity
      }
    }
  }
`

export const useAddItemToBasket = () => {
  const [callAddItemToBasket, { data, error, loading }] = useMutation<
    AddItemToBasketMutationResponse,
    BasketMutationVariables
  >(ADD_BASKET_ITEM_MUTATION)

  const addItemToBasket = ({
    itemId,
    basketId,
    quantity,
  }: BasketItemParams) => {
    const variables: BasketMutationVariables = {
      basketId,
      basketItem: {
        itemId,
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

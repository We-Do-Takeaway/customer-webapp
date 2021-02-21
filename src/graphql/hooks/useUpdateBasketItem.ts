import { gql, useMutation } from '@apollo/client'

import { Basket, BasketItemParams, BasketMutationVariables } from '../types'
import { getServerErrors } from '../utils'

export interface UpdateBasketItemMutationResponse {
  updateBasketItem: {
    basket: Basket
  }
}

const UPDATE_BASKET_ITEM_MUTATION = gql`
  mutation UpdateBasketItem($basketId: ID!, $basketItem: BasketItemInput!) {
    updateBasketItem(basketId: $basketId, basketItem: $basketItem) {
      id
      items {
        id
        name
        quantity
      }
    }
  }
`

export const useUpdateBasketItem = () => {
  const [callUpdateBasketItem, { data, error, loading }] = useMutation<
    UpdateBasketItemMutationResponse,
    BasketMutationVariables
  >(UPDATE_BASKET_ITEM_MUTATION)

  const updateBasketItem = ({
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

    return callUpdateBasketItem({
      variables,
    })
  }

  const errors = error ? getServerErrors(error) : undefined

  return { updateBasketItem, data, errors, loading }
}

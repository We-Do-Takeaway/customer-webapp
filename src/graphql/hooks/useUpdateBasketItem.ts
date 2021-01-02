import { gql, useMutation } from '@apollo/client'

import { Basket, BasketItemInput } from '../types'
import { getServerErrors } from '../utils'

export interface UpdateBasketItemMutationResponse {
  addBasketItem: {
    basket: Basket
  }
}

const UPDATE_BASKET_ITEM_MUTATION = gql`
  mutation UpdateBasketItem($input: BasketItemInput!) {
    updateBasketItem(input: $input) {
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

interface UpdateItemToBasketParameters {
  itemId: string
  ownerId: string
  quantity: number
}

export const useUpdateBasketItem = () => {
  const [callUpdateBasketItem, { data, error, loading }] = useMutation<
    UpdateBasketItemMutationResponse,
    BasketItemInput
  >(UPDATE_BASKET_ITEM_MUTATION)

  const updateBasketItem = ({
    itemId,
    ownerId,
    quantity,
  }: UpdateItemToBasketParameters) => {
    const variables: BasketItemInput = {
      input: {
        itemId,
        ownerId,
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

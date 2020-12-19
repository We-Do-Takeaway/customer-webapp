import { gql, useMutation } from '@apollo/client'
import { Basket, BasketItemDeleteInput, UserError } from '../types'

export interface RemoveItemFromBasketMutationResponse {
  addBasketItem: {
    basket: Basket
    errors: UserError[]
  }
}

const REMOVE_BASKET_ITEM_MUTATION = gql`
  mutation RemoveBasketItem($input: BasketItemDeleteInput!) {
    removeBasketItem(input: $input) {
      basket {
        id
        ownerId
        items {
          id
          name
          quantity
        }
      }
      errors {
        code
        message
      }
    }
  }
`

export const useRemoveItemFromBasket = () =>
  useMutation<RemoveItemFromBasketMutationResponse, BasketItemDeleteInput>(
    REMOVE_BASKET_ITEM_MUTATION
  )

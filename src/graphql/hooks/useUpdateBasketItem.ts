import { gql, useMutation } from '@apollo/client'
import { Basket, BasketItemInput } from '../types'

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

export const useUpdateBasketItem = () =>
  useMutation<UpdateBasketItemMutationResponse, BasketItemInput>(
    UPDATE_BASKET_ITEM_MUTATION
  )

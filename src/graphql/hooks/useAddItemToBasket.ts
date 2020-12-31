import { gql, useMutation } from '@apollo/client'
import { Basket, BasketItemInput } from '../types'

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

export const useAddItemToBasket = () =>
  useMutation<AddItemToBasketMutationResponse, BasketItemInput>(
    ADD_BASKET_ITEM_MUTATION
  )

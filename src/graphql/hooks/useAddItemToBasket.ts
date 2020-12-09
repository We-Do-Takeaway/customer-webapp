import { gql, useMutation } from '@apollo/client'
import { Basket, UserError } from '../types'

export interface BasketItemInput {
  input: {
    ownerId: string
    itemId: string
    quantity: number
  }
}

export interface AddItemToBasketMutationResponse {
  addBasketItem: {
    basket: Basket
    errors: UserError[]
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
      errors {
        code
        message
      }
    }
  }
`

export const useAddItemToBasket = () =>
  useMutation<AddItemToBasketMutationResponse, BasketItemInput>(
    ADD_BASKET_ITEM_MUTATION
  )

export interface BasketItemParams {
  basketId: string
  itemId: string
  quantity: number
}

export interface BasketMutationVariables {
  basketId: string
  basketItem: {
    itemId: string
    quantity: number
  }
}

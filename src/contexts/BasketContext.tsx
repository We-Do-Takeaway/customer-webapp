import React, { createContext } from 'react'

import { Basket, useBasket, UseResponse } from '../graphql'
import { getBasketId } from '../utils'

const defaultBasket: Basket = {
  id: '',
  basketType: 'ANONYMOUS',
  items: [],
}

const defaultValue = {
  basket: defaultBasket,
  loading: false,
}

export const BasketContext = createContext<UseResponse<Basket>>(defaultValue)

export const BasketProvider: React.FC = ({ children }) => {
  const basketId = getBasketId()
  const value = useBasket(basketId)

  return (
    <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
  )
}

import React, { createContext } from 'react'

import {
  Basket,
  useBasketByOwnerId,
  UseBasketByOwnerIdResponse,
} from '../graphql'
import { getOwnerId } from '../utils'

const defaultBasket: Basket = {
  id: '',
  ownerId: getOwnerId(),
  basketType: 'ANONYMOUS',
  items: [],
}

const defaultValue = {
  basket: defaultBasket,
  loading: false,
}

export const BasketContext = createContext<UseBasketByOwnerIdResponse>(
  defaultValue
)

export const BasketProvider: React.FC = ({ children }) => {
  const ownerId = getOwnerId()
  const value = useBasketByOwnerId(ownerId)

  return (
    <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
  )
}

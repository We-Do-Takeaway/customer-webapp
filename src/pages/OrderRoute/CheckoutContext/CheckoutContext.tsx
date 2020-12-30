import React, { createContext, useReducer } from 'react'

import { Contact, Order } from '../../../types'
import reducer from './reducer'

export const contextDefaultValue = {
  order: {
    items: [],
  } as Order,
  resetCheckout: () => {},
  updateContact: () => {},
}

export const CheckoutContext = createContext<{
  order: Order
  resetCheckout: () => void
  updateContact: (contact: Contact) => void
}>(contextDefaultValue)

export const CheckoutContextProvider: React.FC<{ value: Order }> = ({
  children,
  value,
}) => {
  const [order, dispatch] = useReducer(reducer, value)

  const updateContact = (contact: Contact) => {
    dispatch({
      type: 'UPDATE_CONTACT',
      payload: contact,
    })
  }

  const resetCheckout = () => {
    dispatch({
      type: 'RESET_CHECKOUT',
    })
  }

  return (
    <CheckoutContext.Provider
      value={{
        order,
        resetCheckout,
        updateContact,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  )
}

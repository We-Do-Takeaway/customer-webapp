import React, { createContext, useReducer } from 'react'

import { Contact, Order } from '../../../types'
import reducer from './reducer'

const contextDefaultValue = {
  order: {
    items: [],
  } as Order,
  updateContact: () => {},
}

export const CheckoutContext = createContext<{
  order: Order
  updateContact: (contact: Contact) => void
}>(contextDefaultValue)

export const CheckoutContextProvider: React.FC<{ value: Order }> = ({ children, value }) => {
  const [order, dispatch] = useReducer(reducer, value)

  const updateContact = (contact: Contact) => {
    dispatch({
      type: 'UPDATE_CONTACT',
      payload: contact,
    })
  }

  return (
    <CheckoutContext.Provider
      value={{
        order,
        updateContact,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  )
}

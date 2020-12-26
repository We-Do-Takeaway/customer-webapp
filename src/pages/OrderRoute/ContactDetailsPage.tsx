import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { BasketItemsTable } from '../../Sections'
import { CheckoutAddressForm } from './CheckoutAddressForm'
import { CheckoutContext } from './CheckoutContext'

export const ContactDetailsPage: React.FC = () => {
  const history = useHistory()
  const { order } = useContext(CheckoutContext)

  const onDone = () => {
    history.push('/order/place-order')
  }

  if (!order.items.length) {
    history.push('/basket')
  }

  return (
    <div data-testid="checkout-page">
      <BasketItemsTable items={order.items} readOnly />
      <CheckoutAddressForm onDone={onDone} />
    </div>
  )
}

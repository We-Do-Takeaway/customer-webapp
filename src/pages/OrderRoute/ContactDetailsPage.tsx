import { Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { BasketItemsTable } from '../../Sections'
import { CheckoutAddressForm } from './CheckoutAddressForm'
import { CheckoutContext } from './CheckoutContext'
import { useStyles } from './useStyles'

export const ContactDetailsPage: React.FC = () => {
  const classes = useStyles()
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
      <Typography className={classes.heading} variant="h5" component="h1">
        Basket items
      </Typography>

      <BasketItemsTable items={order.items} readOnly />
      <CheckoutAddressForm onDone={onDone} />
    </div>
  )
}

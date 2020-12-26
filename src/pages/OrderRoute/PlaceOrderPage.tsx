import { Button, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { BasketItemsTable } from '../../Sections'
import { CheckoutContext } from './CheckoutContext'
import { useStyles } from './useStyles'

export const PlaceOrderPage: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const { order } = useContext(CheckoutContext)

  if (!order.contact?.name) {
    history.push('/order/contact-details')
  }

  const onConfirm = () => {
    // Place the order and once done, move to the next step
  }

  return (
    <div data-testid="checkout-page">
      <Typography className={classes.heading} variant="h5" component="h1">
        Basket items
      </Typography>

      <BasketItemsTable items={order.items} readOnly />

      <div className={classes.buttonBar}>
        <Button
          color="default"
          data-testid="checkout-cancel-button"
          type="button"
          variant="contained"
          onClick={() => history.goBack()}
          className={classes.button}
        >
          Go back
        </Button>

        <Button
          color="primary"
          data-testid="checkout-submit-button"
          type="button"
          variant="contained"
          onClick={onConfirm}
          className={classes.button}
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}

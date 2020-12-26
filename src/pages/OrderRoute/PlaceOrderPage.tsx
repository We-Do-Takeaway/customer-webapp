import { Button } from '@material-ui/core'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { BasketItemsTable } from '../../Sections'
import { CheckoutContext } from './CheckoutContext'
import { useStyles } from './useStyles'
import { ContactDetailsSummary } from './ContactDetailsSummary'

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
      <BasketItemsTable items={order.items} readOnly />
      <ContactDetailsSummary />

      <div className={classes.buttonBar}>
        <Button
          color="default"
          data-testid="checkout-back-button"
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

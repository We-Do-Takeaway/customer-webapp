import { Button, CircularProgress } from '@material-ui/core'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { useAddOrder, useClearBasket } from '../../graphql'
import { BasketItemsTable } from '../../Sections'
import { CheckoutContext } from './CheckoutContext'
import { ContactDetailsSummary } from './ContactDetailsSummary'
import { useStyles } from './useStyles'

export const PlaceOrderPage: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()

  const { order, resetCheckout } = useContext(CheckoutContext)

  const {
    addOrder,
    loading: addOrderLoading,
    errors: addOrderErrors,
  } = useAddOrder()

  const {
    clearBasket,
    loading: clearBasketLoading,
    errors: clearBasketErrors,
  } = useClearBasket()

  if (!order.contact?.name) {
    history.push('/order/contact-details')
  }

  const onConfirm = async () => {
    const addOrderResult = await addOrder(order)

    await clearBasket()
    resetCheckout()

    const orderId = addOrderResult.data?.addOrder?.id || ''
    history.push(`/order/receipt/${orderId}`)
  }

  const loading = addOrderLoading || clearBasketLoading

  return (
    <div data-testid="checkout-page">
      <BasketItemsTable items={order.items} readOnly />
      <ContactDetailsSummary />

      {!loading && (
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
            data-testid="checkout-confirm-button"
            type="button"
            variant="contained"
            onClick={onConfirm}
            className={classes.button}
          >
            Confirm
          </Button>
        </div>
      )}

      {loading && <CircularProgress data-testid="order-loading" size={24} />}
      {addOrderErrors &&
        addOrderErrors.map((error) => (
          <p key={error.message}>{error.message}</p>
        ))}
      {clearBasketErrors &&
        clearBasketErrors.map((error) => (
          <p key={error.message}>{error.message}</p>
        ))}
    </div>
  )
}

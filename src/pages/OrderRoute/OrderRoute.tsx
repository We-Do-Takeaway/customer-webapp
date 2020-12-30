import React, { useContext } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { Step, StepLabel, Stepper, Typography } from '@material-ui/core'

import { BasketContext } from '../../contexts'
import { HeaderContent } from '../../layouts'
import { Order } from '../../types'
import { CheckoutContextProvider } from './CheckoutContext'
import { ContactDetailsPage } from './ContactDetailsPage'
import { PlaceOrderPage } from './PlaceOrderPage'
import { ReceiptPage } from './ReceiptPage'
import { useStyles } from './useStyles'

const steps = [
  {
    url: '/contact-details',
    label: 'Enter contact details',
  },
  {
    url: '/place-order',
    label: 'Place order',
  },
  {
    url: '/receipt',
    label: 'Receipt',
  },
]

export const OrderRoute: React.FC = () => {
  const { path } = useRouteMatch()
  const classes = useStyles()
  const { basket, loading } = useContext(BasketContext)

  const currentPath = window.location.pathname
  const currentStep = steps.findIndex(
    (step) => currentPath.indexOf(step.url) > 0
  )
  const onReceiptPage = currentPath.indexOf('/receipt') > 0

  if (loading || !basket) {
    return <p>Loading</p>
  }

  const value: Order = {
    items: basket.items,
  }

  return (
    <CheckoutContextProvider value={value}>
      <HeaderContent
        sub={
          <Stepper activeStep={currentStep}>
            {steps.map(({ label, url }) => (
              <Step key={url}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        }
      >
        <Typography className={classes.heading} variant="h4" component="h1">
          {onReceiptPage && 'Receipt'}
          {!onReceiptPage && 'Checkout'}
        </Typography>
        <Switch>
          <Route
            path={`${path}/contact-details`}
            component={ContactDetailsPage}
          />
          <Route path={`${path}/place-order`} component={PlaceOrderPage} />
          <Route path={`${path}/receipt/:orderId`} component={ReceiptPage} />
        </Switch>
      </HeaderContent>
    </CheckoutContextProvider>
  )
}

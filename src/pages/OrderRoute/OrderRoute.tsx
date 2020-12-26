import React, { useContext } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { Step, StepLabel, Stepper } from '@material-ui/core'

import { BasketContext } from '../../contexts'
import { HeaderContent } from '../../layouts'
import { Order } from '../../types'
import { CheckoutContextProvider } from './CheckoutContext'
import { ContactDetailsPage } from './ContactDetailsPage'
import { PlaceOrderPage } from './PlaceOrderPage'

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
  const currentPath = window.location.pathname
  const { basket, loading } = useContext(BasketContext)

  const currentStep = steps.findIndex((step) => currentPath.endsWith(step.url))

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
        <Switch>
          <Route
            path={`${path}/contact-details`}
            component={ContactDetailsPage}
          />
          <Route path={`${path}/place-order`} component={PlaceOrderPage} />
        </Switch>
      </HeaderContent>
    </CheckoutContextProvider>
  )
}

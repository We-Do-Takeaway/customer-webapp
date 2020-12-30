import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Paper, Typography } from '@material-ui/core'

import { useStyles } from './useStyles'

export const ReceiptPage: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const { orderId } = useParams<{ orderId: string }>()

  if (!orderId) {
    history.push('/basket')
  }

  return (
    <>
      <Paper className={classes.paperSuccess}>
        <div className={classes.paperContent}>
          <Typography className={classes.heading} variant="h4" component="h2">
            We&apos;re on it
          </Typography>
          <p>
            Thank you for your order. We&apos;ve sent all the details to the
            kitchen and our chefs will start preparing in the next few minutes.
          </p>

          <p>
            As soon as your food is ready and is handed over to the delivery
            person we&apos;ll send you a message to let you know it&apos;s on
            its way.
          </p>

          <p>
            If things are taking too long or you are unhappy with your order,
            select the &apos;Support&apos; link and quote the order id below
            (sorry it&apos;s so long).
          </p>
          <p>
            <strong>
              Order: <span data-testid="order-id">{orderId}</span>
            </strong>
          </p>
        </div>
      </Paper>
    </>
  )
}

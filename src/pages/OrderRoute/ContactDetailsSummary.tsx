import React, { useContext } from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'

import { CheckoutContext } from './CheckoutContext'
import { useStyles } from './useStyles'

export const ContactDetailsSummary: React.FC = () => {
  const classes = useStyles()
  const { order } = useContext(CheckoutContext)

  const address = [
    order.contact?.address1,
    order.contact?.address2,
    order.contact?.town,
    order.contact?.postcode,
  ]
    .filter((item) => item !== '')
    .join(', ')

  return (
    <>
      <Typography
        data-testid="contact-details-title"
        className={classes.heading}
        variant="h5"
        component="h2"
      >
        Summary
      </Typography>
      <Paper className={classes.paper}>
        <div className={classes.paperContent}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography
                data-testid="delivery-heading"
                className={classes.heading}
                variant="h5"
                component="h2"
              >
                Delivery details
              </Typography>
              <Typography gutterBottom data-testid="delivery-name">
                <strong>{order.contact?.name}</strong>
              </Typography>
              <Typography gutterBottom data-testid="delivery-address">
                {address}
              </Typography>
              <Typography className={classes.verticalSpaced}>
                <strong>Phone:</strong>{' '}
                <span data-testid="delivery-phone">{order.contact?.phone}</span>
              </Typography>
              {order.contact?.email && (
                <Typography gutterBottom>
                  <strong>Email:</strong>{' '}
                  <span data-testid="delivery-email">
                    {order.contact?.email}
                  </span>
                </Typography>
              )}
            </Grid>
            <Grid item container direction="column" xs={12} sm={6}>
              <Typography
                className={classes.heading}
                variant="h5"
                component="h2"
              >
                Payment details
              </Typography>
              <Grid container>N/A</Grid>
            </Grid>
            {order.contact?.instructions && (
              <Grid item sm={12} data-testid="delivery-instructions-section">
                <hr />
                <Typography
                  className={classes.heading}
                  variant="h5"
                  component="h2"
                >
                  Instructions
                </Typography>
                <Typography data-testid="delivery-instructions" gutterBottom>
                  {order.contact?.instructions}
                </Typography>
              </Grid>
            )}
          </Grid>
        </div>
      </Paper>
    </>
  )
}

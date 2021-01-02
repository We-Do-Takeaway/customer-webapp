import React, { useContext } from 'react'
import {
  Backdrop,
  Button,
  CircularProgress,
  Theme,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

import { BasketContext } from '../../contexts'

import { BasketItemsTable } from '../../Sections'

const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  heading: {
    margin: theme.spacing(2, 0),
  },
}))

export const BasketPage: React.FC = () => {
  const { data: basket, errors, loading } = useContext(BasketContext)

  const classes = useStyles()
  const hasItems = basket?.items && basket.items.length > 0

  return (
    <div data-testid="basket-page">
      <Typography
        className={classes.heading}
        component="h1"
        data-testid="basket-page-title"
        variant="h5"
      >
        Basket items
      </Typography>
      {loading && (
        <Backdrop
          open
          className={classes.backdrop}
          data-testid="basket-page-loading"
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {errors && (
        <div data-testid="basket-page-error">
          {errors.map((error) => (
            <p key={error.message}>{error.message}</p>
          ))}
        </div>
      )}
      {!loading && !hasItems && (
        <p data-testid="basket-page-empty">Your basket is currently empty</p>
      )}

      {hasItems && (
        <>
          <BasketItemsTable items={basket?.items || []} />

          <p>
            <Button
              color="primary"
              component={Link}
              data-testid="proceed-to-checkout"
              to="/order/contact-details"
              variant="contained"
            >
              Checkout
            </Button>
          </p>
        </>
      )}
    </div>
  )
}

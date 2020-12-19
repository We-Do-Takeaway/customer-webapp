import React, { useContext } from 'react'
import {
  Backdrop,
  CircularProgress,
  createStyles,
  Theme,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { BasketContext } from '../../contexts'

import { BasketItemsTable } from './BasketItemsTable'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })
)

export const BasketPage: React.FC = () => {
  const { basket, error, loading } = useContext(BasketContext)

  const classes = useStyles()
  const hasItems = basket?.items && basket.items.length > 0

  return (
    <div data-testid="basket-page">
      <h1 data-testid="basket-page-title">Basket items</h1>
      {loading && (
        <Backdrop
          open
          className={classes.backdrop}
          data-testid="basket-page-loading"
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {!loading && error && (
        <p data-testid="basket-page-error">Error: {error.message}</p>
      )}
      {!loading && !hasItems && (
        <p data-testid="basket-page-empty">Your basket is currently empty</p>
      )}

      {hasItems && <BasketItemsTable items={basket?.items || []} />}
    </div>
  )
}

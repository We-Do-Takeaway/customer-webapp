import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import React, { useContext } from 'react'

import { BasketContext } from '../../contexts'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0, 1, 0, 0),
  },
}))

export const BasketIndicator = () => {
  const classNames = useStyles()
  const { basket } = useContext(BasketContext)
  const isActive = !!(basket && basket.items.length)
  const itemCount = basket?.items?.length || 0

  return (
    <div className={classNames.root} data-testid="basket-indicator">
      <Button color={isActive ? 'primary' : 'default'}>
        <ShoppingCartIcon />
        {isActive && (
          <span data-testid="basket-indicator-count">{itemCount}</span>
        )}
      </Button>
    </div>
  )
}

import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { BasketContext } from '../../contexts'
import { BasketItem } from '../../graphql/types/Item'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0, 1, 0, 0),
  },
}))

const basketCountReducer = (accumulator: number, { quantity }: BasketItem) =>
  accumulator + quantity

export const BasketIndicator = () => {
  const classNames = useStyles()
  const { basket } = useContext(BasketContext)
  const history = useHistory()
  const itemCount =
    basket && basket?.items?.length > 0
      ? basket.items.reduce(basketCountReducer, 0)
      : 0
  const isActive = itemCount > 0

  const onClick = () => {
    history.push('/basket')
  }

  return (
    <div className={classNames.root} data-testid="basket-indicator">
      <Button onClick={onClick} color={isActive ? 'primary' : 'default'}>
        <ShoppingCartIcon />
        {isActive && (
          <span data-testid="basket-indicator-count">{itemCount}</span>
        )}
      </Button>
    </div>
  )
}

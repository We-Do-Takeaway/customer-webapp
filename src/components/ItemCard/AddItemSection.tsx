import React, { useContext, useState } from 'react'
import { Button, Snackbar, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { BasketContext } from '../../contexts'
import { BasketItemInput, useAddItemToBasket } from '../../graphql'
import { useCounter } from '../../hooks'

const useStyles = makeStyles<Theme, { loading: boolean }>((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    cursor: (props) => (props.loading ? 'wait' : 'cursor'),
  },
}))

export const AddItemSection: React.FC<{ itemId: string }> = ({ itemId }) => {
  const {
    state: { count: quantity },
    dispatch,
  } = useCounter({
    initialCount: 1,
    min: 1,
    max: 20,
  })
  const { basket } = useContext(BasketContext)
  const [addItemToBasket, { loading, error, data }] = useAddItemToBasket()
  const [showConfirmation, shouldShowConfirmation] = useState(false)

  const classes = useStyles({ loading })

  if (!basket) return null

  const onAddItemToBasket = async () => {
    // If we are waiting for query to complete, don't fire off another one (stop double click and spam)
    if (loading) return

    const variables: BasketItemInput = {
      input: {
        basketId: basket.id,
        itemId,
        quantity,
      },
    }

    await addItemToBasket({ variables })
    shouldShowConfirmation(true)
  }

  if (error) return <p>Error: {error.message}</p>
  if (data && data.addBasketItem.errors)
    return <p>{data.addBasketItem.errors[0].message}</p>

  return (
    <>
      <div className={classes.root}>
        <Button
          data-testid="add-to-basket-button"
          type="button"
          onClick={onAddItemToBasket}
          variant="contained"
          disableElevation
          size="small"
        >
          Add
        </Button>

        <Button
          data-testid="add-to-basket-decrease"
          type="button"
          onClick={() => dispatch({ type: 'decrement' })}
          size="small"
        >
          -
        </Button>
        <span data-testid="add-to-basket-quantity">{quantity}</span>
        <Button
          data-testid="add-to-basket-increase"
          type="button"
          onClick={() => dispatch({ type: 'increment' })}
          size="small"
        >
          +
        </Button>
      </div>

      <Snackbar
        data-testid="add-notification"
        autoHideDuration={6000}
        message="Added item to basket"
        onClose={() => shouldShowConfirmation(false)}
        open={showConfirmation}
      />
    </>
  )
}

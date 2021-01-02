import React, { useState } from 'react'
import { Button, Snackbar, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useAddItemToBasket } from '../../graphql'
import { useCounter } from '../../hooks'
import { getOwnerId } from '../../utils'

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
  const ownerId = getOwnerId()
  const { addItemToBasket, loading, errors } = useAddItemToBasket()
  const [showConfirmation, shouldShowConfirmation] = useState(false)

  const classes = useStyles({ loading })

  const onAddItemToBasket = async () => {
    // If we are waiting for query to complete, don't fire off another one (stop double click and spam)
    if (loading) return

    await addItemToBasket({
      ownerId,
      itemId,
      quantity,
    })
    shouldShowConfirmation(true)
  }

  if (errors) {
    return (
      <>
        {errors.map((error) => (
          <p key={error.message}>{error.message}</p>
        ))}
      </>
    )
  }

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

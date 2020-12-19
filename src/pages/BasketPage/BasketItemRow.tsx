import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  CircularProgress,
  Snackbar,
  TableCell,
  TableRow,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { BasketItem, useUpdateBasketItem } from '../../graphql'
import { getOwnerId } from '../../utils'
import { RemoveItemConfirmationDialog } from './RemoveItemConfirmationDialog'

const useStyles = makeStyles((theme) => ({
  decreaseButton: {
    margin: theme.spacing(0, 1, 0, 0),
  },
  increaseButton: {
    margin: theme.spacing(0, 0, 0, 1),
  },
  img: {
    maxWidth: 50,
  },
  controls: {
    display: 'inline-block',
    marginTop: 7,
  },
  remove: {
    fill: 'red',
  },
}))

export const BasketItemRow: React.FC<{ item: BasketItem }> = ({ item }) => {
  const [updateBasketItem, { loading }] = useUpdateBasketItem()
  const [quantity, setQuantity] = useState(item.quantity)
  const [removing, setRemoving] = useState(false)
  const [showRemoved, shouldShowRemoved] = useState(false)
  const [showConfirmRemove, shouldShowConfirmRemove] = useState(false)

  const classes = useStyles({ loading })

  const onDecrease = async () => {
    if (quantity < 2) return

    const newQuantity = quantity - 1
    setQuantity(newQuantity)

    await updateBasketItem({
      variables: {
        input: {
          ownerId: getOwnerId(),
          itemId: item.id,
          quantity: newQuantity,
        },
      },
    })
  }

  const onIncrease = async () => {
    const newQuantity = quantity + 1
    setQuantity(newQuantity)

    await updateBasketItem({
      variables: {
        input: {
          ownerId: getOwnerId(),
          itemId: item.id,
          quantity: newQuantity,
        },
      },
    })
  }

  const onRemove = () => {
    shouldShowConfirmRemove(true)
  }

  const onConfirmRemove = async () => {
    shouldShowConfirmRemove(false)

    const newQuantity = 0
    setQuantity(newQuantity)
    setRemoving(true)

    await updateBasketItem({
      variables: {
        input: {
          ownerId: getOwnerId(),
          itemId: item.id,
          quantity: newQuantity,
        },
      },
    })

    shouldShowRemoved(true)
  }

  const onCancelRemove = () => {
    shouldShowConfirmRemove(false)
  }

  return (
    <>
      <TableRow key={item.id} style={{ opacity: removing ? 0.33 : 1 }}>
        <TableCell>
          {item?.photo && (
            <img
              src={item.photo}
              alt={item.name}
              className={classes.img}
              data-testid={`image-${item.id}`}
            />
          )}
        </TableCell>
        <TableCell data-testid={`description-${item.id}`}>
          {item.name}
        </TableCell>
        <TableCell align="center">
          <button
            onClick={onDecrease}
            className={classes.decreaseButton}
            data-testid={`decrease-${item.id}`}
          >
            -
          </button>
          <span data-testid={`quantity-${item.id}`}>{quantity}</span>
          <button
            onClick={onIncrease}
            className={classes.increaseButton}
            data-testid={`increase-${item.id}`}
          >
            +
          </button>
        </TableCell>

        <TableCell align="right">
          <span className={classes.controls}>
            {loading && <CircularProgress size={24} />}
            <DeleteIcon
              onClick={() => onRemove()}
              className={classes.remove}
              data-testid={`remove-${item.id}`}
            />
          </span>
        </TableCell>
      </TableRow>

      <Snackbar
        data-testid="remove-notification"
        autoHideDuration={6000}
        message="Removed item from basket"
        onClose={() => shouldShowRemoved(false)}
        open={showRemoved}
      />
      {showConfirmRemove && (
        <RemoveItemConfirmationDialog
          item={item}
          onCancel={onCancelRemove}
          onConfirm={onConfirmRemove}
        />
      )}
    </>
  )
}

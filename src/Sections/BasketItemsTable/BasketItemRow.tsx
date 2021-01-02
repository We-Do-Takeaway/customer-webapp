import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  CircularProgress,
  Snackbar,
  TableCell,
  TableRow,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

import { CompactButton } from '../../components'
import { BasketItem, useUpdateBasketItem } from '../../graphql'
import { getOwnerId } from '../../utils'
import { RemoveItemConfirmationDialog } from './RemoveItemConfirmationDialog'

const useStyles = makeStyles((theme) => ({
  controls: {
    display: 'inline-block',
    marginTop: 7,
  },
  img: {
    maxWidth: 50,
  },
  quantity: {
    padding: theme.spacing(0, 1),
  },
  remove: {
    fill: 'red',
  },
}))

export const BasketItemRow: React.FC<{
  item: BasketItem
  readOnly?: boolean
}> = ({ item, readOnly }) => {
  const { updateBasketItem, loading, errors } = useUpdateBasketItem()
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
      ownerId: getOwnerId(),
      itemId: item.id,
      quantity: newQuantity,
    })
  }

  const onIncrease = async () => {
    const newQuantity = quantity + 1
    setQuantity(newQuantity)

    await updateBasketItem({
      ownerId: getOwnerId(),
      itemId: item.id,
      quantity: newQuantity,
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
      ownerId: getOwnerId(),
      itemId: item.id,
      quantity: newQuantity,
    })

    shouldShowRemoved(true)
  }

  const onCancelRemove = () => {
    shouldShowConfirmRemove(false)
  }

  return (
    <>
      {errors &&
        errors.map((error) => <p key={error.message}>{error.message}</p>)}

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
          {!readOnly && (
            <CompactButton
              onClick={onDecrease}
              data-testid={`decrease-${item.id}`}
            >
              -
            </CompactButton>
          )}
          <span
            className={classes.quantity}
            data-testid={`quantity-${item.id}`}
          >
            {quantity}
          </span>
          {!readOnly && (
            <CompactButton
              onClick={onIncrease}
              data-testid={`increase-${item.id}`}
            >
              +
            </CompactButton>
          )}
        </TableCell>
        {!readOnly && (
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
        )}
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

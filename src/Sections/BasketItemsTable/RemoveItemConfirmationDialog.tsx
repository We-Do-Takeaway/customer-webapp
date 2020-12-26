import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import React from 'react'

import { BasketItem } from '../../graphql'

export const RemoveItemConfirmationDialog: React.FC<{
  item: BasketItem
  onCancel: () => void
  onConfirm: (item: BasketItem) => Promise<void>
}> = ({ item, onCancel, onConfirm }) => (
  <Dialog
    aria-labelledby="remove-item-alert-dialog-title"
    aria-describedby="remove-item-alert-dialog-description"
    data-testid="remove-basket-item-confirmation"
    onClose={onCancel}
    open
  >
    <DialogTitle
      id="remove-item-dialog-title"
      data-testid="remove-item-dialog-title"
    >
      Remove item from basket
    </DialogTitle>
    <DialogContent>
      <DialogContentText
        id="remove-item-dialog-description"
        data-testid="remove-item-dialog-description"
      >
        Are you sure you want to remove &lsquo;{item.name}&rsquo; item from the
        basket?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={onCancel}
        color="default"
        data-testid="remove-item-dialog-cancel"
      >
        No
      </Button>
      <Button
        onClick={() => onConfirm(item)}
        color="secondary"
        data-testid="remove-item-dialog-confirm"
        autoFocus
      >
        Yes
      </Button>
    </DialogActions>
  </Dialog>
)

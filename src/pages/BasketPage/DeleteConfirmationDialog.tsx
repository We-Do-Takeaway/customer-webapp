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

export const DeleteConfirmationDialog: React.FC<{
  item: BasketItem
  onCancel: () => void
  onConfirm: (item: BasketItem) => Promise<void>
}> = ({ item, onCancel, onConfirm }) => (
  <Dialog
    aria-labelledby="delete-item-alert-dialog-title"
    aria-describedby="delete-item-alert-dialog-description"
    data-testid="delete-basket-item-confirmation"
    onClose={onCancel}
    open
  >
    <DialogTitle
      id="delete-item-dialog-title"
      data-testid="delete-item-dialog-title"
    >
      Delete item from basket
    </DialogTitle>
    <DialogContent>
      <DialogContentText
        id="delete-item-dialog-description"
        data-testid="delete-item-dialog-description"
      >
        Are you sure you want to remove &lsquo;{item.name}&rsquo; item from the
        basket?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={onCancel}
        color="default"
        data-testid="delete-item-dialog-cancel"
      >
        No
      </Button>
      <Button
        onClick={() => onConfirm(item)}
        color="secondary"
        data-testid="delete-item-dialog-confirm"
        autoFocus
      >
        Yes
      </Button>
    </DialogActions>
  </Dialog>
)

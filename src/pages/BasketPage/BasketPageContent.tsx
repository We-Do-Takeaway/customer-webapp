import React, { useContext, useState } from 'react'
import {
  Backdrop,
  CircularProgress,
  createStyles,
  Snackbar,
  Theme,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { BasketContext } from '../../contexts'
import {
  BasketItem,
  BasketItemDeleteInput,
  useRemoveItemFromBasket,
} from '../../graphql'
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog'
import { BasketItemsTable } from './BasketItemsTable'
import { getOwnerId } from '../../utils'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })
)

export const BasketPageContent: React.FC = () => {
  const { basket, error, loading } = useContext(BasketContext)
  const [removeItemFromBasket] = useRemoveItemFromBasket()
  const [showDone, shouldShowDone] = useState(false)
  const [deleteConfirmationItem, confirmDeleteItem] = useState<
    BasketItem | undefined
  >()

  const classes = useStyles()
  const hasItems = basket?.items && basket.items.length > 0

  const onRemove = (item: BasketItem) => {
    confirmDeleteItem(item)
  }

  const onCancelItemDelete = () => {
    confirmDeleteItem(undefined)
  }

  const onConfirmItemDelete = async (item: BasketItem) => {
    confirmDeleteItem(undefined)

    const ownerId = getOwnerId()

    const variables: BasketItemDeleteInput = {
      input: {
        ownerId,
        itemId: item.id,
      },
    }

    await removeItemFromBasket({
      variables,
    })

    shouldShowDone(true)
  }

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

      {hasItems && (
        <BasketItemsTable items={basket?.items || []} onRemove={onRemove} />
      )}

      <Snackbar
        data-testid="remove-notification"
        autoHideDuration={6000}
        message="Removed item from basket"
        onClose={() => shouldShowDone(false)}
        open={showDone}
      />
      {deleteConfirmationItem && (
        <DeleteConfirmationDialog
          item={deleteConfirmationItem}
          onCancel={onCancelItemDelete}
          onConfirm={onConfirmItemDelete}
        />
      )}
    </div>
  )
}

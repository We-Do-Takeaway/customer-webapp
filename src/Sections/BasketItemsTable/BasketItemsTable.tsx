import React, { useState } from 'react'
import {
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { BasketItem } from '../../graphql'
import { BasketItemRow } from './BasketItemRow'

const useStyles = makeStyles((theme) => ({
  table: {
    maxWidth: 800,
    marginBottom: theme.spacing(6),
  },
}))

export const BasketItemsTable: React.FC<{
  items: BasketItem[]
  readOnly?: boolean
}> = ({ items, readOnly = false }) => {
  const classes = useStyles({ readOnly })
  const [showDone, shouldShowDone] = useState(false)

  return (
    <>
      <TableContainer className={classes.table} component={Paper}>
        <Table
          aria-label="Basket items table"
          data-testid="basket-page-item-table"
        >
          <TableHead>
            <TableRow>
              <TableCell component="th" width="50">
                &nbsp;
              </TableCell>
              <TableCell component="th">Name</TableCell>
              <TableCell component="th" align="center" width="130">
                Quantity
              </TableCell>
              {!readOnly && (
                <TableCell component="th" width="80">
                  &nbsp;
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <BasketItemRow key={item.id} item={item} readOnly={readOnly} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        data-testid="remove-notification"
        autoHideDuration={6000}
        message="Removed item from basket"
        onClose={() => shouldShowDone(false)}
        open={showDone}
      />
    </>
  )
}

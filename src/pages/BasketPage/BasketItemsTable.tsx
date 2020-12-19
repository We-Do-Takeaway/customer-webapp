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

const useStyles = makeStyles({
  table: {
    maxWidth: 800,
  },
})

export const BasketItemsTable: React.FC<{
  items: BasketItem[]
}> = ({ items }) => {
  const classes = useStyles()
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
              <TableCell component="th" width="80">
                &nbsp;
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <BasketItemRow key={item.id} item={item} />
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

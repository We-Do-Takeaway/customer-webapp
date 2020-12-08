import React from 'react'
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'

import { BasketItem } from '../../graphql'

const useStyles = makeStyles({
  table: {
    maxWidth: 800,
  },
  img: {
    maxWidth: 50,
  },
})

export const BasketItemsTable: React.FC<{
  items: BasketItem[]
  onRemove: (item: BasketItem) => void
}> = ({ items, onRemove }) => {
  const classes = useStyles()

  return (
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
            <TableCell component="th" align="right">
              Quantity
            </TableCell>
            <TableCell component="th" width="64">
              &nbsp;
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {item?.photo && (
                  <img
                    src={item.photo}
                    alt={item.name}
                    className={classes.img}
                  />
                )}
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="center">
                <Button
                  data-testid="basket-page-remove-item"
                  onClick={() => onRemove(item)}
                  color="secondary"
                >
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

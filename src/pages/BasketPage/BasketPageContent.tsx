import React, { useContext } from 'react'
import {
  Backdrop,
  CircularProgress,
  createStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { BasketContext } from '../../contexts'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    table: {
      maxWidth: 800,
    },
    img: {
      maxWidth: 50,
    },
  })
)

export const BasketPageContent: React.FC = () => {
  const { basket, error, loading } = useContext(BasketContext)
  const classes = useStyles()

  const hasItems = basket?.items?.length

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

      {!loading && hasItems && (
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
              </TableRow>
            </TableHead>
            <TableBody>
              {basket?.items.map((item) => (
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  )
}

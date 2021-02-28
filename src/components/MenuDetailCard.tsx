import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import { MenuSummary } from '../graphql'

interface MenuProps {
  menu: MenuSummary
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: theme.spacing(5, 0),
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    width: '100%',
  },
}))

export const MenuDetailCard: React.FC<MenuProps> = ({ menu }) => {
  const classes = useStyles()

  return (
    <Card data-testid="menu-section-item" className={classes.root}>
      <div className={classes.details}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            data-testid="menu-detail-card-title"
          >
            {menu.name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            data-testid="menu-detail-card-description"
          >
            {menu.description}
          </Typography>
        </CardContent>
      </div>
      {menu.photo && (
        <CardMedia
          className={classes.media}
          image={menu.photo}
          title={menu.name}
        />
      )}
    </Card>
  )
}

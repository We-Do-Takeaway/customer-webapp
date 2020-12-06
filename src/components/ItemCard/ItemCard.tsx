import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import { Item } from '../../graphql'
import { AddItemSection } from './AddItemSection'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    margin: '.5rem',
    '&:firstChild': {
      marginLeft: 0,
    },
  },

  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  title: {
    fontSize: '1.25rem',
  },
}))

interface ItemCardProps {
  item: Item
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const classes = useStyles()
  return (
    <Card className={classes.root} data-testid="item-card" data-id={item.id}>
      <CardMedia
        className={classes.media}
        image={item.photo}
        title={item.name}
        data-testid="item-card-image"
      />
      <CardContent>
        <AddItemSection itemId={item.id} />
        <Typography
          className={classes.title}
          gutterBottom
          component="h3"
          data-testid="item-card-title"
        >
          {item.name}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          data-testid="item-card-description"
        >
          {item.description}
        </Typography>
      </CardContent>
    </Card>
  )
}

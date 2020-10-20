import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'

import { MenuSummary } from '../graphql/hooks'

interface MenuSummaryCardProps {
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

export const MenuSummaryCard: React.FC<MenuSummaryCardProps> = ({ menu }) => {
  const classes = useStyles()
  const history = useHistory()

  const learnMore = () => {
    history.push(`/menu/${menu.id}`)
  }

  return (
    <Card
      data-testid="menu-summary-card"
      className={classes.root}
      onClick={learnMore}
    >
      <div className={classes.details}>
        <CardActionArea data-testid="menu-summary-card-button">
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              data-testid="menu-summary-card-title"
            >
              {menu.name}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              data-testid="menu-summary-card-description"
            >
              {menu.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={learnMore}>
            Learn More
          </Button>
        </CardActions>
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

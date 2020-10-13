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

import { MenuSummary } from '../../graphql/hooks'

interface MenuProps {
  menu: MenuSummary
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
})

export const Menu: React.FC<MenuProps> = ({ menu }) => {
  const classes = useStyles()
  const history = useHistory()

  const learnMore = () => {
    history.push(`/menu/${menu.id}`)
  }

  return (
    <Card className={classes.root} onClick={learnMore}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://via.placeholder.com/345x140"
          title={menu.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {menu.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {menu.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary" onClick={learnMore}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}

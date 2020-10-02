import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Link from '@material-ui/core/Link'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { Link as RouterLink } from 'react-router-dom'

import { ProfileMenu } from '../Sections'

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}))

export const HeaderContent: React.FC = ({ children }) => {
  const classes = useStyles()

  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
            data-testid="service-name"
          >
            We Do Takeaway
          </Typography>
          <nav>
            <Link
              component={RouterLink}
              variant="button"
              color="textPrimary"
              to="/menu"
              className={classes.link}
            >
              Menu
            </Link>
            <Link
              component={RouterLink}
              variant="button"
              color="textPrimary"
              to="/tracking"
              className={classes.link}
            >
              Tracking
            </Link>
            <Link
              component={RouterLink}
              variant="button"
              color="textPrimary"
              to="/support"
              className={classes.link}
            >
              Support
            </Link>
          </nav>
          <ProfileMenu />
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </>
  )
}

import React, { ReactElement } from 'react'

import AppBar from '@material-ui/core/AppBar'
import Link from '@material-ui/core/Link'
import { Breadcrumbs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import { useKeycloak } from '@react-keycloak/web'
import { Link as RouterLink } from 'react-router-dom'

import { BasketIndicator } from '../components'
import { ProfileLoggedOut, ProfileMenu } from '../Sections'

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(0, 3),
    maxWidth: 1024,
    width: '100%',
  },
  toolbarTitle: {
    flexGrow: 1,
    color: '#000',
  },
  breadcrumbs: {
    flexWrap: 'wrap',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(1, 3),
    maxWidth: 1024,
    width: '100%',
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  main: {
    marginTop: theme.spacing(5),
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(0, 3),
    maxWidth: 1024,
    width: '100%',
  },
  sub: {
    width: '100%',
    padding: 0,
    margin: 0,
    backgroundColor: theme.palette.common.white,
  },
  subContent: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 1024,
    width: '100%',
  },
}))

interface HeaderContentProps {
  sub?: ReactElement | ReactElement[]
  breadcrumbs?: ReactElement | ReactElement[]
}

export const HeaderContent: React.FC<HeaderContentProps> = ({
  children,
  breadcrumbs,
  sub,
}) => {
  const classes = useStyles()
  const { keycloak } = useKeycloak()

  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar data-testid="header-toolbar" className={classes.toolbar}>
          <Link
            data-testid="service-name"
            className={classes.toolbarTitle}
            component={RouterLink}
            variant="h6"
            to="/"
          >
            We Do Takeaway
          </Link>

          <nav>
            <Link
              component={RouterLink}
              variant="button"
              color="textPrimary"
              to="/"
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
          <BasketIndicator />
          {keycloak.authenticated && <ProfileMenu />}
          {!keycloak.authenticated && <ProfileLoggedOut />}
        </Toolbar>
      </AppBar>
      {sub && (
        <div className={classes.sub}>
          <div className={classes.subContent}>{sub}</div>
        </div>
      )}
      {breadcrumbs && (
        <Breadcrumbs
          className={classes.breadcrumbs}
          separator="›"
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      )}
      <main className={classes.main}>{children}</main>
    </>
  )
}

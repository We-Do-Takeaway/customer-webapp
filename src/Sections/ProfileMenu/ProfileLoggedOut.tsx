import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { useKeycloak } from '@react-keycloak/web'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}))

export const ProfileLoggedOut = () => {
  const classes = useStyles()

  const { keycloak } = useKeycloak()

  return (
    <div className={classes.root}>
      <div>
        <Button
          onClick={() => keycloak.login()}
          variant="outlined"
          data-testid="profile-menu__login"
        >
          Login
        </Button>
      </div>
    </div>
  )
}

import { Button, withStyles } from '@material-ui/core'

export const CompactButton = withStyles((theme) => ({
  root: {
    padding: theme.spacing(0.5),
    minWidth: 30,
  },
}))(Button)

import { TextField, withStyles } from '@material-ui/core'

export const VerticalTextField = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 4,
    margin: theme.spacing(2, 0),
  },
}))(TextField)

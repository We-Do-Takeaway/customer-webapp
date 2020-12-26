import { makeStyles } from '@material-ui/core/styles'

const maxWidth = 800
const innerMargin = 200

export const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  button: {
    margin: theme.spacing(0, 0, 0, 4),
  },
  buttonBar: {
    textAlign: 'right',
    maxWidth,
    marginTop: theme.spacing(4),
  },
  form: {
    marginBottom: theme.spacing(8),
  },
  heading: {
    margin: theme.spacing(2, 0),
  },
  paper: {
    padding: theme.spacing(2),
    maxWidth,
    margin: theme.spacing(1, 0, 6),
  },
  paperContent: {
    maxWidth: maxWidth - innerMargin,
    margin: '0 auto',
  },
}))

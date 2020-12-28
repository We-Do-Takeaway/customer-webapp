import { makeStyles } from '@material-ui/core/styles'

const maxWidth = 800
const innerMargin = 100

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
  paperSuccess: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    margin: theme.spacing(1, 0, 6),
    maxWidth,
    padding: theme.spacing(2),
  },
  paperContent: {
    maxWidth: maxWidth - innerMargin,
    margin: '0 auto',
  },
  split: {
    display: 'flex',
  },
  splitCell: {
    flexGrow: 1,
  },
  verticalSpaced: {
    marginTop: theme.spacing(2),
  },
}))

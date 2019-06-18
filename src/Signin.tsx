import React from 'react'

import { Theme, withStyles, Button, Container, Paper, Box, Typography, TextField, Avatar, IconButton } from '@material-ui/core'
import blue from '@material-ui/core/colors/blue'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

interface IProps {
  classes: { [key: string]: any }
}

interface IState {
  left: boolean
}

class Signin extends React.Component<IProps, IState> {
  render () {
    const { classes } = this.props
    return <Box className={classes.root}>
      <Container maxWidth='sm' className={classes.container}>
      <Paper className={classes.paper}>
        <Box className={classes.linear_horizental}>
          <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='Menu' onClick={() => window.history.back()}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant='h5' component='h3' className={classes.title}>
            SIGN IN
          </Typography>
        </Box>
        <TextField
          id='id-input'
          label='ID'
          className={classes.textField}
          margin='normal'
          variant='outlined'
        />
        <TextField
          id='password-input'
          label='Password'
          className={classes.textField}
          type='password'
          autoComplete='current-password'
          margin='normal'
          variant='outlined'
        />
        <Button className={classes.button}>
          sign in
        </Button>
        <Button variant='outlined' className={classes.google_button}>
          <Avatar src='/assets/google_icon.svg' className={classes.extendedIcon} />
          Sign in with google
        </Button>
      </Paper>
      </Container>
    </Box>
  }

  static style (theme: Theme) {
    return {
      root: {
        backgroundColor: blue[300]
      },
      title: {
        margin: theme.spacing(1, 0),
        flexGrow: 1
      },
      linear_horizental: {
        display: 'flex',
        flexDirection: 'row' as 'row',
        margin: theme.spacing(0, 1)
      },
      button: {
        margin: theme.spacing(2, 1, 1, 1),
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        color: 'white',
        height: 56,
        padding: '0 30px'
      },
      google_button: {
        margin: theme.spacing(2, 1, 1, 1),
        color: 'black',
        height: 56,
        padding: '0 30px'
      },
      container: {
        display: 'flex',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center'
      },
      paper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column' as 'column',
        padding: theme.spacing(3, 2)
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
      },
      extendedIcon: {
        width: 20,
        height: 20,
        marginRight: theme.spacing(1)
      }
    }
  }
}

export default withStyles(Signin.style)(Signin)

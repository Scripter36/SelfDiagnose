import React from 'react'

import { Theme, withStyles, Button, Container, Paper, Box, Typography, TextField, Avatar, IconButton, createMuiTheme } from '@material-ui/core'
import blue from '@material-ui/core/colors/blue'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { ThemeProvider } from '@material-ui/styles'

interface IProps {
  classes: { [key: string]: any }
}

interface IState {
  idError: string
  pwError: string
}

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  }
})

class Signin extends React.Component<IProps, IState> {
  id: string
  password: string
  constructor (props: IProps) {
    super(props)
    this.id = ''
    this.password = ''
    this.state = { idError: '', pwError: '' }
  }
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
            SIGN UP
          </Typography>
        </Box>
        <TextField
          error={this.state.idError !== ''}
          id='id-input'
          label={this.state.idError === '' ? 'ID' : this.state.idError}
          className={classes.textField}
          margin='normal'
          variant='outlined'
          onChange={(e) => {
            this.id = e.target.value
          }}
        />
        <ThemeProvider theme={theme}>
          <TextField
            error={this.state.pwError !== ''}
            id='password-input'
            label={this.state.pwError === '' ? 'Password' : this.state.pwError}
            className={classes.textField}
            type='password'
            autoComplete='current-password'
            margin='normal'
            variant='outlined'
            onChange={(e) => {
              this.password = e.target.value
            }}
          />
        </ThemeProvider>
        <Button className={classes.button} onClick={() => {
          if (this.id === '') {
            this.setState({ idError: '아이디를 입력하세요', pwError: '' })
            return
          }
          if (this.password === '') {
            this.setState({ pwError: '비밀번호를 입력하세요', idError: '' })
            return
          }
          this.signup(this.id, this.password).catch(e => {
            console.error(e)
          })
        }}>
          sign up
        </Button>
        <Typography variant='caption' display='block' gutterBottom style={{ paddingLeft: 8 }}>버튼을 누르면 <a href='/privacy_policy.html'>개인정보처리방침</a>에 동의한 것으로 간주합니다.</Typography>
      </Paper>
      </Container>
    </Box>
  }

  async signup (id: string, password: string) {
    return fetch('/user/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, password }),
      redirect: 'follow'
    }).then(async (response) => {
      if (response.redirected) {
        window.location.href = response.url
        return
      }
      const result = await response.json()
      if (!result.success) {
        this.setState({ idError: result.reason, pwError: '' })
      }
    })
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

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'

import Main from './Main'
import Signin from './Signin'
import Diagnose from './Diagnose'
import Result from './Result'

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'NanumSquare',
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

ReactDOM.render(<Router>
  <ThemeProvider theme={theme}>
    <Route path='/' exact component={Main} />
    <Route path='/signin/' exact component={Signin} />
    <Route path='/diagnose/' exact component={Diagnose} />
    <Route path='/result/' exact component={Result} />
  </ThemeProvider>
</Router>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
/*
  <Route path='/about/' component={About} />
  <Route path='/users/' component={Users} />
*/
serviceWorker.unregister()

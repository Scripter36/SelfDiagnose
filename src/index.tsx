import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'

import Main from './Main'
import Signin from './Signin'
import Signup from './Signup'
import Diagnose from './Diagnose'
import Result from './Result'
import Hospital from './Hospital'
import DiagnoseList from './DiagnoseList'
import HospitalDetail from './HospitalDetail'

import 'react-image-gallery/styles/css/image-gallery.css'

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
    <Route path='/signup' exact component={Signup} />
    <Route path='/diagnose/' exact component={Diagnose} />
    <Route path='/result/' exact component={Result} />
    <Route path='/hospital/' exact component={Hospital} />
    <Route path='/hospital/detail' exact component={HospitalDetail} />
    <Route path='/diagnose/list/' exact component={DiagnoseList} />
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

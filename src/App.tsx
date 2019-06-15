import React from 'react'
import logo from './logo.svg'
import './App.css'

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import { Toolbar, IconButton, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles(theme => ({
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px'
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    textAlign: 'left'
  }
}))

const App: React.FC = () => {
  const classes = useStyles()
  return (
    <div className='App'>
      <header className='App-header'>
        <AppBar position='fixed'>
          <Toolbar>
            <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='Menu'>
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              News
          </Typography>
            <Button color='inherit'>Login</Button>
          </Toolbar>
        </AppBar>
      </header>
      <Button className={classes.root}>
        Learn React
      </Button>
    </div>
  )
}

export default App

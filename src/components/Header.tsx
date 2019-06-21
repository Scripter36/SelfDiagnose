import React from 'react'

import Button from '@material-ui/core/Button'
import { Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import { Toolbar, IconButton, Typography, SwipeableDrawer, withStyles, Box } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import SideBar from './SideBar'
import MyInfoLoader from '../utils/MyInfoLoader'

interface IProps {
  classes: { menuButton: string, title: string, list: string },
  title: string
}

interface IState {
  left: boolean,
  logined: boolean,
  userId: string
}

class Header extends React.Component<IProps, IState> {
  constructor (prop: IProps) {
    super(prop)
    this.state = { left: false, logined: true, userId: '' }
    MyInfoLoader.load().then((data) => {
      if (data.success) {
        this.setState({ logined: true, userId: data.result.id })
      } else {
        this.setState({ logined: false })
      }
    }).catch(e => {
      console.error(e)
      this.setState({ logined: false })
    })
  }

  render () {
    const { classes, title } = this.props
    return (
      <div>
        <AppBar position='static'>
          <Toolbar>
            <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='Menu' onClick={() => this.setState({ left: true })}>
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              {title}
            </Typography>
            {(() => {
              if (!this.state.logined) {
                return <Box>
                  <Button color='inherit' href='/signin'>
                    Sign in
                  </Button>
                  <Button color='inherit' href='/signup'>
                    Sign up
                  </Button>
                </Box>
              }
            })()}
          </Toolbar>
        </AppBar>
        <SwipeableDrawer open={this.state.left} onClose={() => this.setState({ left: false })} onOpen={() => this.setState({ left: true })}>
          <div className={classes.list} role='presentation' onClick={() => this.setState({ left: false })} onKeyDown={() => this.setState({ left: false })}>
            {(() => {
              if (this.state.logined) {
                return <SideBar primary={this.state.userId} secondary='환영합니다!'/>
              } else {
                return <SideBar primary='로그인이 필요합니다.' secondary=''/>
              }
            })()}
          </div>
        </SwipeableDrawer>
      </div>
    )
  }

  static style (theme: Theme) {
    return {
      menuButton: {
        marginRight: theme.spacing(2)
      },
      title: {
        flexGrow: 1
      },
      list: {
        width: 250,
        maxWidth: '100vh'
      }
    }
  }
}

export default withStyles(Header.style)(Header)

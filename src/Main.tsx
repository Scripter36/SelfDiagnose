import React from 'react'

import { Theme } from '@material-ui/core/styles'
import pink from '@material-ui/core/colors/pink'
import teal from '@material-ui/core/colors/teal'
import purple from '@material-ui/core/colors/purple'
import lightBlue from '@material-ui/core/colors/lightBlue'
import { Button, withStyles, Box, Container, Grid } from '@material-ui/core'

import Header from './components/Header'

interface IProps {
  classes: { [key: string]: any }
}

class Main extends React.Component<IProps> {
  render () {
    const { classes } = this.props
    return (
      <Box className={classes.root}>
        <Header title='Application Name'/>
        <Grid container className={classes.container}>
          <Grid item xs={12} sm={12}>
            <Button className={classes.button} style={{ backgroundColor: 'white', color: 'black' }}>
              슬라이더 있는 곳~~
            </Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button className={classes.button} style={{ backgroundColor: pink['A100'] }} href='/diagnose'>
              자가 진단
            </Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button className={classes.button} style={{ backgroundColor: teal['300'] }}>
              병원 찾기
            </Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button className={classes.button} style={{ backgroundColor: purple['300'] }}>
              질병 사전
            </Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button className={classes.button} style={{ backgroundColor: lightBlue['A100'] }}>
              진단 기록
            </Button>
          </Grid>
        </Grid>
      </Box>
    )
  }

  static style (theme: Theme) {
    return {
      root: {
        flexGrow: 1,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column' as 'column'
      },
      button: {
        border: 0,
        borderRadius: 0,
        color: 'white',
        width: '100%',
        height: '100%',
        padding: '0 30px'
      },
      container: {
        flexGrow: 1,
        display: 'flex'
        // minHeight: '100vh',
        // justifyContent: 'center',
        // alignItems: 'center'
      }
    }
  }
}

export default withStyles(Main.style)(Main)

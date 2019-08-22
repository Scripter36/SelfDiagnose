import React from 'react'

import { Theme } from '@material-ui/core/styles'
import pink from '@material-ui/core/colors/pink'
import teal from '@material-ui/core/colors/teal'
import purple from '@material-ui/core/colors/purple'
import lightBlue from '@material-ui/core/colors/lightBlue'
import { Button, withStyles, Box, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'

import Header from './components/Header'

interface IProps {
  classes: { [key: string]: any }
}

interface IState {
  open: boolean
}

class Main extends React.Component<IProps, IState> {
  constructor (props: IProps) {
    super(props)
    this.state = { open: false }
  }
  render () {
    const { classes } = this.props
    return (
      <Box className={classes.root}>
        <Header title='D-Search' />
        <Grid container className={classes.container}>
          <Grid item xs={12} sm={12}>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography component='h1' style={{ fontSize: 48, fontWeight: 'bolder', textAlign: 'center' }}>
                Welcome To D-Search!
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button className={classes.button} style={{ backgroundColor: pink['A100'] }} href='/diagnose'>
              자가 진단
            </Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button className={classes.button} style={{ backgroundColor: teal['300'] }} href='/hospital'>
              병원 찾기
            </Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button className={classes.button} style={{ backgroundColor: purple['300'] }} onClick={() => this.setState({ open: true })}>
              질병 사전
            </Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button className={classes.button} style={{ backgroundColor: lightBlue['A100'] }} href='/diagnose/list'>
              진단 기록
            </Button>
          </Grid>
        </Grid>
        <Dialog
          open={this.state.open}
          onClose={() => {
            this.setState({ open: false })
          }}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{'외부 웹 사이트를 여시겠습니까?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              질병 사전은 외부 웹 사이트로 연결됩니다.
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color='primary' onClick={() => {
              this.setState({ open: false })
            }}>
              취소
          </Button>
            <Button color='primary' onClick={() => {
              window.location.href = 'http://www.amc.seoul.kr/asan/healthinfo/disease/diseaseSubmain.do'
            }}>
              이동
          </Button>
          </DialogActions>
        </Dialog>
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

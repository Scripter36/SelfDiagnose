import React from 'react'
import * as Hangul from 'hangul-js'
import { Theme, withStyles, Box, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Paper, IconButton, InputBase, Typography } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import Header from './components/Header'

import diseases from './assets/diseases.json'
import symptoms from './assets/symptoms.json'

interface DiagnoseData {
  index: number,
  data: { posibility: number, index: number }[],
  symptoms: number[]
}

interface IProps {
  classes: { [key: string]: string }
}

interface IState {
  data: DiagnoseData[],
  open: boolean,
  search: string
}

class DiagnoseList extends React.Component<IProps, IState> {
  constructor (props: IProps) {
    super(props)
    this.state = { data: [], open: false, search: '' }
    fetch('/user/diagnoselist').then(async (res) => {
      const data = await res.json()
      if (data.success) {
        this.setState({ data: data.list })
      } else {
        this.setState({ open: true })
      }
    }).catch(e => {
      console.error(e)
    })
  }

  render () {
    const { classes } = this.props
    return <Box style={{ display: 'flex', flexDirection: 'column' }}>
      <Header title='진단 기록' />
      <Box className={classes.list}>
        {
          this.state.data.map((diagnoseData) => {
            if (Hangul.disassembleToString(diagnoseData.symptoms.join(' ')).includes(Hangul.disassembleToString(this.state.search))) {
              return <Paper>
                <Typography variant='h5' component='h3'>
                  {diseases[diagnoseData.data[0].index].name}
                </Typography>
                <Typography component='p' style={{ marginBottom: '64px' }}>
                  증상: {diagnoseData.symptoms.join(', ')}
                </Typography>
                <Button color='primary' className={classes.button} onClick={() => {
                  window.location.href = `/result?id=${diagnoseData.index}&feedback=true`
                }}>
                  자세히 보기
              </Button>
              </Paper>
            }
          })
        }
      </Box>
      <Paper className={classes.paper}>
        <IconButton className={classes.iconButton} aria-label='Menu' onClick={() => window.history.back()}>
          <ArrowBackIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder='증상명 검색'
          inputProps={{ 'aria-label': '증상명 검색' }}
          onChange={(event) => {
            this.setState({ search: event.currentTarget.value })
          }}
        />
      </Paper>
      <Dialog
        open={this.state.open}
        onClose={() => {
          window.history.back()
        }}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'로그인 하시겠습니까?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            진단 기록을 보려면 <a href='/signin'>로그인</a>이 필요합니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={() => {
            window.history.back()
          }}>
            뒤로 가기
          </Button>
          <Button color='primary' onClick={() => {
            window.location.href = '/signin'
          }}>
            로그인
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  }

  static style (theme: Theme) {
    return {
      root: {
        width: '100%'
      },
      paper: {
        position: 'fixed' as 'fixed',
        top: 0,
        left: 0,
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%'
      },
      list: {
        flexGrow: 1,
        paddingTop: 50,
        paddingBottom: 50
      }
    }
  }
}

export default withStyles(DiagnoseList.style)(DiagnoseList)

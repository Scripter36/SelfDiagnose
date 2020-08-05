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
  symptoms: number[],
  date: string
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
      <Box style={{ display: 'flex', flexDirection: 'column', position: 'relative', flex: 1, overflowX: 'hidden' }}>
        <Box className={classes.list}>
          {
            this.state.data.map((diagnoseData) => {
              if (Hangul.disassembleToString(diagnoseData.symptoms.map((symptomNumber) => symptoms[symptomNumber]).join(', ') + ' ' + diseases[diagnoseData.data[0].index].name).includes(Hangul.disassembleToString(this.state.search))) {
                return <Paper className={classes.paper}>
                  <Typography variant='h5' component='h3'>
                    {diseases[diagnoseData.data[0].index].name}
                  </Typography>
                  <Typography component='p'>
                    증상: {diagnoseData.symptoms.map((symptomNumber) => symptoms[symptomNumber]).join(', ')}
                  </Typography>
                  <Typography component='p' style={{ fontSize: '12px', color: 'gray', marginBottom: '64px' }}>
                    {diagnoseData.date}
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
        <Paper className={classes.searchBar}>
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
      </Box>
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
      searchBar: {
        position: 'absolute' as 'absolute',
        top: 0,
        left: 0,
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%'
      },
      paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2)
      },
      list: {
        flex: 1,
        paddingTop: 50,
        paddingBottom: 50
      }
    }
  }
}

export default withStyles(DiagnoseList.style)(DiagnoseList)

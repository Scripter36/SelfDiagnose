import React from 'react'
import { Theme, withStyles, Box, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'
import Header from './components/Header'

import diseases from './assets/diseases.json'

interface DiagnoseData {
  index: number,
  data: { posibility: number, index: number }[]
}

interface IProps {
  classes: { [key: string]: string }
}

interface IState {
  data: DiagnoseData[],
  open: boolean
}

class DiagnoseList extends React.Component<IProps, IState> {
  constructor (props: IProps) {
    super(props)
    this.state = { data: [], open: false }
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
    return <Box>
      <Header title='진단 기록'/>
      <List className={classes.root}>
        {
          this.state.data.map((diagnoseData) => {
            return <ListItem button onClick={() => {
              window.location.href = `/result?id=${diagnoseData.index}&feedback=true`
            }}>
              <ListItemText primary={diseases[diagnoseData.data[0].index].name} secondary='클릭해서 이동' />
            </ListItem>
          })
        }
      </List>
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
        width: '100%',
        backgroundColor: theme.palette.background.paper
      }
    }
  }
}

export default withStyles(DiagnoseList.style)(DiagnoseList)

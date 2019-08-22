import React from 'react'
import { Theme, withStyles, Box, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, Paper, Button, Snackbar, IconButton } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CloseIcon from '@material-ui/icons/Close'
import queryString from 'query-string'

import diseases from './assets/diseases.json'
import Header from './components/Header'

interface IProps {
  classes: { [key: string]: string }
}

interface IState {
  result: { posibility: number, index: number }[]
  showFeedback: boolean,
  openSnackbar: boolean
}

class Result extends React.Component<IProps, IState> {
  constructor (props: IProps) {
    super(props)
    this.state = { result: [], showFeedback: queryString.parse(window.location.search)['feedback'] === 'true', openSnackbar: false }
    fetch(`/diagnose/data?id=${queryString.parse(window.location.search)['id']}`).then(async (res) => {
      const response = await res.json()
      this.setState({ result: response.result })
    }).catch(e => {
      console.error(e)
    })
  }

  render () {
    const { classes } = this.props
    return <Box>
      <Header title='진단 결과'/>
      <Paper className={classes.paper}>
        <Typography variant='h5' component='h3'>
          주의!
        </Typography>
        <Typography component='p'>
          이 웹 페이지는 전문적인 의학 지식을 제공하지 않습니다. 반드시 의사와 상담하시기 바랍니다.
        </Typography>
        {(() => {
          if (this.state.result.length > 0) {
            return <Typography component='p' style={{ marginTop: 32 }}>
            분석 결과, {(diseases[this.state.result[0].index].where as string[])[0]}에 방문하셔야 할 것 같습니다.
          </Typography>
          }
        })()}
        <Button variant='outlined' href='/hospital' className={classes.button}>
          병원 검색하러 가기
        </Button>
      </Paper>
      {(() => {
        if (this.state.showFeedback) {
          return <Paper className={classes.paper} style={{ margin: '16px 0' }}>
            <Typography component='p'>
              진단 결과에 만족하셨나요?
            </Typography>
            <Box style={{ display: 'flex' as 'flex', flexDirection: 'row' as 'row' }}>
              <Button className={classes.button} onClick={() => { this.setState({ showFeedback: false, openSnackbar: true }) }}>
                매우 만족
              </Button>
              <Button className={classes.button} onClick={() => { this.setState({ showFeedback: false, openSnackbar: true }) }}>
                만족
              </Button>
              <Button className={classes.button} onClick={() => { this.setState({ showFeedback: false, openSnackbar: true }) }}>
                불만
              </Button>
              <Button className={classes.button} onClick={() => { this.setState({ showFeedback: false, openSnackbar: true }) }}>
                매우 불만
              </Button>
            </Box>
          </Paper>
        }
      })()}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={this.state.openSnackbar}
        autoHideDuration={6000}
        onClose={() => { this.setState({ openSnackbar: false }) }}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id='message-id'>설문에 참가해 주셔서 감사합니다.</span>}
        action={[
          <IconButton
            key='close'
            aria-label='Close'
            color='inherit'
            className={classes.close}
            onClick={() => { this.setState({ openSnackbar: false }) }}
          ><CloseIcon /></IconButton>
        ]}
      />
      {
        this.state.result.map((data) => {
          return <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel_${data.index}`}
              id={`panel_${data.index}`}
            >
              <Typography className={classes.heading}>{`${diseases[data.index].name} (${Math.floor(data.posibility * 10000) / 100}%)`}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ display: 'flex' as 'flex', flexDirection: 'column' as 'column' }}>
              <Typography>
                진료과: {(() => {
                  if (Array.isArray(diseases[data.index].where)) {
                    const where = diseases[data.index].where as string[]
                    return where.join(', ')
                  } else {
                    return '정보 없음'
                  }
                })()}
              </Typography>
              <Typography><a href={`http://www.amc.seoul.kr/asan/healthinfo/disease/diseaseList.do?searchKeyword=${diseases[data.index].name.split('(')[0]}`}>질병 정보 보기</a></Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        })
      }
    </Box>
  }

  static style (theme: Theme) {
    return {
      paper: {
        padding: theme.spacing(3, 2)
      },
      button: {
        padding: theme.spacing(1)
      }
    }
  }
}

export default withStyles(Result.style)(Result)

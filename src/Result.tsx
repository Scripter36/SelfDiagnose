import React from 'react'
import { Theme, withStyles, Box, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, Paper, Button, Snackbar, IconButton, CircularProgress } from '@material-ui/core'
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
    if (this.state.result.length === 0) {
      return <Box style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'middle' }}>
        <CircularProgress />
      </Box>
    } else {
      const wheres: { where: string, total: number, amount: number, results: number[] }[] = []
      this.state.result.forEach((data, index) => {
        diseases[data.index].where.forEach((where) => {
          const found = wheres.some((whereData) => {
            if (whereData.where === where) {
              whereData.total += data.posibility
              whereData.amount++
              whereData.results.push(index)
              return true
            }
          })
          if (!found) wheres.push({ where: where, total: data.posibility, amount: 1, results: [index] })
        })
      })
      wheres.sort((b, a) => a.total / a.amount - b.total / b.amount)
      return <Box>
        <Header title='진단 결과' />
        <Paper className={classes.paper}>
          <Typography variant='h5' component='h3'>
            주의!
        </Typography>
          <Typography component='p'>
            이 웹 페이지는 전문적인 의학 지식을 제공하지 않습니다. 반드시 의사와 상담하시기 바랍니다.
        </Typography>
          <Typography component='p' style={{ marginTop: 16, marginBottom: 16 }}>
            분석 결과, {wheres[0].where}에 방문하셔야 할 것 같습니다.
        </Typography>
          <Button variant='outlined' href={`/hospital?showSelect=false&type=${wheres[0].where}`} className={classes.button}>
            병원 검색하러 가기
        </Button>
        </Paper>
        {this.state.showFeedback ? <Paper className={classes.paper} style={{ margin: '16px 0' }}>
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
        </Paper> : null
        }
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
          wheres.map((whereData) => {
            return <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>{whereData.where}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails style={{ display: 'flex' as 'flex', flexDirection: 'column' as 'column' }}>
                <Box style={{ display: 'flex' as 'flex', flexDirection: 'column' as 'column' }}>
                {
                  whereData.results.map((index) => {
                    const data = this.state.result[index]
                    return <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography className={classes.heading}>{`${diseases[data.index].name} (${Math.floor(data.posibility * 10000) / 100}%)`}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ display: 'flex' as 'flex', flexDirection: 'column' as 'column' }}>
                      <Typography>
                        진료과: {(() => {
                          if (Array.isArray(diseases[data.index].where)) {
                            const where = diseases[data.index].where
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
                <Button variant='outlined' style={{ marginTop: '16px' }} href={`/hospital?showSelect=false&type=${whereData.where}`}>병원 검색하러 가기</Button>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          })
        }
      </Box>
    }
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

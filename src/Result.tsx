import React from 'react'
import { Theme, withStyles, Box, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, Paper, Button } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import queryString from 'query-string'

import diseases from './assets/diseases.json'
import Header from './components/Header'

interface IProps {
  classes: { [key: string]: string }
}

interface IState {
  result: { posibility: number, index: number }[]
}

class Result extends React.Component<IProps, IState> {
  constructor (props: IProps) {
    super(props)
    this.state = { result: [] }
    fetch(`/diagnose/data?id=${queryString.parse(window.location.search)['id']}`).then(async (res) => {
      const result = await res.json()
      this.setState({ result })
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
            <ExpansionPanelDetails>
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

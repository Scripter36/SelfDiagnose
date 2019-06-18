import React from 'react'
import { Theme, withStyles, Box, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import queryString from 'query-string'

import diseases from './assets/diseases.json'

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

    }
  }
}

export default withStyles(Result.style)(Result)

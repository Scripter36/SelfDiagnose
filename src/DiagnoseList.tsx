import React from 'react'
import { Theme, withStyles, Box, List, ListItem, ListItemText } from '@material-ui/core'
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
  data: DiagnoseData[]
}

class DiagnoseList extends React.Component<IProps, IState> {
  constructor (props: IProps) {
    super(props)
    this.state = { data: [] }
    fetch('/user/diagnoselist').then(async (res) => {
      const data = await res.json()
      this.setState({ data })
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
            return <ListItem button href={`/result?id=${diagnoseData.index}`}>
              <ListItemText primary={diseases[diagnoseData.data[0].index].name} secondary='클릭해서 이동' />
            </ListItem>
          })
        }
      </List>
    </Box>
  }

  static style (theme: Theme) {
    return {
      root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
      }
    }
  }
}

export default withStyles(DiagnoseList.style)(DiagnoseList)

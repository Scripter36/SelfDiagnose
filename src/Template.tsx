import React from 'react'
import { Theme, withStyles, Box } from '@material-ui/core'

interface IProps {
  classes: { [key: string]: string }
}

interface IState {
  left: boolean
}

class Login extends React.Component<IProps, IState> {
  render () {
    const { classes } = this.props
    return <Box>

    </Box>
  }

  static style (theme: Theme) {
    return {

    }
  }
}

export default withStyles(Login.style)(Login)

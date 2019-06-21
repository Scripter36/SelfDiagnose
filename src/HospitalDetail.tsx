import React from 'react'
import { Theme, withStyles, Box, List, ListItem, ListItemText, Paper, Typography, Button, TextField, ListItemAvatar, Avatar, Divider } from '@material-ui/core'
import Header from './components/Header'
import StarIcon from '@material-ui/icons/Star'
import StarHalfIcon from '@material-ui/icons/StarHalf'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import queryString from 'query-string'

import diseases from './assets/diseases.json'
import hospitals from './assets/hospitals.json'

interface HospitalData {
  rating: number,
  comments: { contents: string, rating: number }[]
}

interface IProps {
  classes: { [key: string]: string }
}

interface IState {
  data: HospitalData[],
  index: number
}

class HospitalDetail extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    const id = parseInt(queryString.parse(window.location.search)['id'] as string, 10)
    let index = 0
    hospitals.every((hospital, i) => {
      if (hospital.번호 === id) {
        index = i
        return false
      }
      return true
    })
    this.state = { data: [], index }
    fetch(`/hospital/info?id=${this.state.index}`).then(async (res) => {
      const data = await res.json()
      this.setState({ data })
    }).catch(e => {
      console.error(e)
    })
  }

  render() {
    const { classes } = this.props
    return <Box>
      <Header title='병원 정보' />
      <Paper className={classes.paper}>
        <Typography variant='h5' component='h3'>
          {hospitals[this.state.index].이름}
        </Typography>
        <Typography component='p'>
          전화번호: <a href={`tel:${hospitals[this.state.index].전화번호}`}>{hospitals[this.state.index].전화번호}</a><br />
          진료과: {hospitals[this.state.index].진료과} ({hospitals[this.state.index].타입})<br />
          주소: {hospitals[this.state.index].주소} ({hospitals[this.state.index].우편번호})
        </Typography>
      </Paper>
      <Box style={{ display: 'flex', flexDirection: 'row' }}>
        <TextField
          id="comment"
          label="후기"
          placeholder="후기를 작성해 주세요."
          multiline
          className={classes.textField}
          margin="normal"
          variant="filled"
        />
        <Button variant="contained" color="secondary" className={classes.submitButton}>
          등록
      </Button>
      </Box>
      <List>
        <Paper>
          <Typography component='p' style={{ padding: 8, backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
            인기 긍정적 후기
        </Typography>
          <ListItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', backgroundColor: 'rgba(0, 0, 0, 0.09)' }}>
            <Box style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
              <ListItemText primary="1350adwx" />
              <Box style={{ flexGrow: 1 }} />
              <StarIcon className={classes.icon} />
              <StarIcon className={classes.icon} />
              <StarIcon className={classes.icon} />
              <StarIcon className={classes.icon} />
              <StarIcon className={classes.icon} />
            </Box>
            <Typography component='p'>
              의사선생님께서 정말 친절하게 대해 주셨네요^^
        </Typography>
          </ListItem>
        </Paper>
          <Box style={{ paddingTop: 8 }} />
        <Paper>
          <Typography component='p' style={{ padding: 8, backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
            인기 부정적 후기
        </Typography>
          <ListItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', backgroundColor: 'rgba(0, 0, 0, 0.09)' }}>
            <Box style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
              <ListItemText primary="정원영" />
              <Box style={{ flexGrow: 1 }} />
              <StarHalfIcon className={classes.icon} />
              <StarBorderIcon className={classes.icon} />
              <StarBorderIcon className={classes.icon} />
              <StarBorderIcon className={classes.icon} />
              <StarBorderIcon className={classes.icon} />
            </Box>
            <Typography component='p'>
              서비스가 최악이네요. 다시는 안 가려고요.
        </Typography>
          </ListItem>
        </Paper>
        <Box style={{ paddingTop: 8 }} />
        <Paper>
          <Typography component='p' style={{ padding: 8, backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
            후기
        </Typography>
          <ListItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', backgroundColor: 'rgba(0, 0, 0, 0.09)' }}>
            <Box style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
              <ListItemText primary="1350adwx" />
              <Box style={{ flexGrow: 1 }} />
              <StarIcon className={classes.icon} />
              <StarIcon className={classes.icon} />
              <StarIcon className={classes.icon} />
              <StarIcon className={classes.icon} />
              <StarIcon className={classes.icon} />
            </Box>
            <Typography component='p'>
              의사선생님께서 정말 친절하게 대해 주셨네요^^
        </Typography>
          </ListItem>
          <Divider />
          <ListItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', backgroundColor: 'rgba(0, 0, 0, 0.09)' }}>
            <Box style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
              <ListItemText primary="정원영" />
              <Box style={{ flexGrow: 1 }} />
              <StarHalfIcon className={classes.icon} />
              <StarBorderIcon className={classes.icon} />
              <StarBorderIcon className={classes.icon} />
              <StarBorderIcon className={classes.icon} />
              <StarBorderIcon className={classes.icon} />
            </Box>
            <Typography component='p'>
              서비스가 최악이네요. 다시는 안 가려고요.
        </Typography>
          </ListItem>
        </Paper>
      </List>
    </Box>
  }

  static style(theme: Theme) {
    return {
      paper: {
        padding: theme.spacing(3, 2)
      },
      button: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(1)
      },
      textField: {
        flexGrow: 1
      },
      submitButton: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1)
      },
      icon: {
        width: 16,
        height: 16
      }
    }
  }
}

export default withStyles(HospitalDetail.style)(HospitalDetail)

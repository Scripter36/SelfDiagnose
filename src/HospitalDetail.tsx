import React from 'react'
import { Theme, withStyles, Box, List, ListItem, ListItemText, Paper, Typography, Button, TextField, ListItemAvatar, Avatar, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import Header from './components/Header'
import StarIcon from '@material-ui/icons/Star'
import StarHalfIcon from '@material-ui/icons/StarHalf'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import queryString from 'query-string'

import diseases from './assets/diseases.json'
import hospitals from './assets/hospitals.json'
import { FilledTextFieldProps } from '@material-ui/core/TextField'

interface HospitalData {
  id: string,
  contents: string,
  rating: number
}

interface IProps {
  classes: { [key: string]: string }
}

interface IState {
  data: HospitalData[],
  index: number,
  open: boolean
}

class HospitalDetail extends React.Component<IProps, IState> {
  contents: string
  rating: number
  id: number
  constructor (props: IProps) {
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
    this.id = index
    this.state = { data: [], index, open: false }
    fetch(`/hospital/info?id=${this.state.index}`).then(async (res) => {
      const response = await res.json()
      this.setState({ data: response.result })
    }).catch(e => {
      console.error(e)
    })
    this.contents = ''
    this.rating = 0
  }

  render () {
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
      <Paper style={{ display: 'flex', flexDirection: 'column', padding: 8 }}>
      <TextField
        id='comment'
        label='후기'
        placeholder='후기를 작성해 주세요.'
        multiline
        className={classes.textField}
        margin='normal'
        variant='filled'
        onChange={(e) => {
          this.contents = e.target.value
        }}
      />
      <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', padding: 8 }}>
        <TextField
          id='rating'
          label='별점'
          placeholder='0~5'
          type='number'
          margin='normal'
          variant='filled'
          onChange={(e) => {
            const rating = parseFloat(e.target.value)
            if (!isNaN(rating)) {
              if (rating < 0) {
                e.target.value = '0'
                this.rating = 0
              } else if (rating > 5) {
                e.target.value = '5'
                this.rating = 5
              } else {
                this.rating = rating
              }
            }
          }}
        />
        <Button variant='contained' color='secondary' className={classes.submitButton} onClick={() => {
          fetch('/hospital/comment', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: this.id, contents: this.contents, rating: this.rating })
          }).then(async (res) => {
            const result = await res.json()
            if (result.success) {
              // 성공
              fetch(`/hospital/info?id=${this.state.index}`).then(async (res) => {
                const response = await res.json()
                this.setState({ data: response.result })
              }).catch(e => {
                console.error(e)
              })
            } else {
              // 실패
              this.setState({ open: true })
            }
          }).catch((e) => {
            console.error(e)
          })
        }}>
          등록
        </Button>
      </Box>
      </Paper>
      <List>
        <Paper>
          <Typography component='p' style={{ padding: 8, backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
            인기 긍정적 후기
          </Typography>
          {(() => {
            const sorted = this.state.data.sort((a, b) => b.rating - a.rating)
            if (sorted.length > 0) {
              return <ListItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', backgroundColor: 'rgba(0, 0, 0, 0.09)' }}>
                <Box style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                  <ListItemText primary={sorted[0].id} />
                  <Box style={{ flexGrow: 1 }} />
                  {HospitalDetail.getStars(sorted[0].rating, classes.icon)}
                </Box>
                <Typography component='p'>
                  {sorted[0].contents}
                </Typography>
              </ListItem>
            }
          })()}
        </Paper>
        <Box style={{ paddingTop: 8 }} />
        <Paper>
          <Typography component='p' style={{ padding: 8, backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
            인기 부정적 후기
          </Typography>
          {(() => {
            const sorted = this.state.data.sort((a, b) => a.rating - b.rating)
            if (sorted.length > 0) {
              return <ListItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', backgroundColor: 'rgba(0, 0, 0, 0.09)' }}>
                <Box style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                  <ListItemText primary={sorted[0].id} />
                  <Box style={{ flexGrow: 1 }} />
                  {HospitalDetail.getStars(sorted[0].rating, classes.icon)}
                </Box>
                <Typography component='p'>
                  {sorted[0].contents}
                </Typography>
              </ListItem>
            }
          })()}
        </Paper>
        <Box style={{ paddingTop: 8 }} />
        <Paper>
          <Typography component='p' style={{ padding: 8, backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
            후기
          </Typography>
          {
            this.state.data.map((hospital) => {
              return <ListItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', backgroundColor: 'rgba(0, 0, 0, 0.09)' }}>
                <Box style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                  <ListItemText primary={hospital.id} />
                  <Box style={{ flexGrow: 1 }} />
                  {HospitalDetail.getStars(hospital.rating, classes.icon)}
                </Box>
                <Typography component='p'>
                  {hospital.contents}
                </Typography>
              </ListItem>
            })
          }
        </Paper>
      </List>
      <Dialog
        open={this.state.open}
        onClose={() => {
          this.setState({ open: false })
        }}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'로그인 하시겠습니까?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            후기를 작성하려면 <a href='/signin'>로그인</a>이 필요합니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={() => {
            this.setState({ open: false })
          }}>
            취소
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

  static getStars (rating: number, className?: string) {
    const n = Math.floor(rating)
    const a = rating - n
    return <Box>
      {(() => {
        const result: JSX.Element[] = []
        for (let i = 0; i < n; i++) {
          result.push(<StarIcon className={className} />)
        }
        return result
      })()}
      {(() => {
        if (a > 0) return <StarHalfIcon className={className} />
      })()}
      {(() => {
        let len = a === 0 ? 5 - n : 4 - n
        const result: JSX.Element[] = []
        for (let i = 0; i < len; i++) {
          result.push(<StarBorderIcon className={className} />)
        }
        return result
      })()}
    </Box>
  }

  static style (theme: Theme) {
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

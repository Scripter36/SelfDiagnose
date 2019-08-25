import React from 'react'
import * as Hangul from 'hangul-js'
import { Theme, withStyles, Box, List, ListItem, ListItemText, Paper, IconButton, InputBase, Typography, Chip, Button, Divider, Grid, ButtonBase } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import symptoms from './assets/symptoms.json'
import categorizedSymptoms from './assets/symptoms_categorized.json'

interface IProps {
  classes: { [key: string]: string }
}

interface IState {
  search: string
  chips: number[]
  selectedCategory: string
}

class Diagnose extends React.Component<IProps, IState> {
  constructor (prop: IProps) {
    super(prop)
    this.state = { search: '', chips: [], selectedCategory: '' }
  }

  render () {
    const { classes } = this.props
    const search = Hangul.disassembleToString(this.state.search)
    return <Box className={classes.root}>
      <List component='nav' className={classes.list}>
        <Box className={classes.chipPaper}>
          {(() => {
            return this.state.chips.map((chip, index) => {
              return <Chip
                label={symptoms[chip]}
                onDelete={() => {
                  this.state.chips.splice(index, 1)
                  this.setState({})
                }}
                className={classes.chip}
              />
            })
          })()}
        </Box>
        {(() => {
          if (this.state.chips.length > 0) return <Divider />
          return null
        })()}
        {(() => {
          if (search === '') {
            if (this.state.selectedCategory === '') {
              return <Box style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='subtitle1' component='p' align='center' style={{ margin: '32px 0' }}>
                아픈 부위를 선택하세요.
              </Typography>
              <Grid container spacing={2}>
                {
                  Object.keys(categorizedSymptoms).map((category) => <Grid item xs={3} sm={2} xl={1} onClick={() => {
                    this.setState({ selectedCategory: category })
                  }}>
                    <Button variant='contained' style={{ backgroundImage: `url('/assets/human/${category}.jpg')`, width: '100%', paddingTop: '100%', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                    </Button>
                  </Grid>)
                }
              </Grid>
            </Box>
            } else {
              const result: JSX.Element[] = []
              result.push(<Typography variant='subtitle1' component='p' align='center' style={{ marginTop: '32px' }}>
                {this.state.selectedCategory} 증상 목록입니다.
              </Typography>)
              result.push(<a onClick={() => { this.setState({ selectedCategory: '' }) }} style={{ cursor: 'pointer', textDecoration: 'underline' }}><Typography variant='subtitle1' component='p' align='center' style={{ marginBottom: '32px', fontSize: '12px' }}>
                뒤로 가기
              </Typography></a>)
              // @ts-ignore
              const symptoms = categorizedSymptoms[this.state.selectedCategory] as string[]
              symptoms.forEach((symptom, index) => {
                result.push(<ListItem button
                  onClick={() => {
                    this.state.chips.push(index)
                    this.setState({})
                  }}>
                  <ListItemText primary={symptom} />
                </ListItem>)
              })
              return result
            }
          } else {
            const result: JSX.Element[] = []
            symptoms.forEach((symptom, index) => {
              if (!this.state.chips.includes(index) && Hangul.disassembleToString(symptom).includes(search)) {
                result.push(<ListItem button
                  onClick={() => {
                    this.state.chips.push(index)
                    this.setState({})
                  }}>
                  <ListItemText primary={symptom} />
                </ListItem>)
              }
            })
            if (result.length === 0) {
              return <Typography variant='subtitle1' component='p' align='center'>
                검색 결과가 없습니다.
              </Typography>
            } else {
              return result
            }
          }
        })()}
      </List>
      <Paper className={classes.paper}>
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
      <Button variant='contained' color='primary' className={classes.button} disabled={this.state.chips.length === 0} onClick={() => {
        if (this.state.chips.length > 0) {
          window.location.href = `/submit?symptoms=${JSON.stringify(this.state.chips)}`
        }
      }}>
        진단
      </Button>
    </Box>
  }

  static style (theme: Theme) {
    return {
      root: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        height: '100%'
      },
      paper: {
        position: 'fixed' as 'fixed',
        top: 0,
        left: 0,
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%'
      },
      chipPaper: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap' as 'wrap',
        padding: theme.spacing(0.5)
      },
      list: {
        flexGrow: 1,
        paddingTop: 50,
        paddingBottom: 50
      },
      input: {
        marginLeft: 8,
        flex: 1
      },
      iconButton: {
        padding: 10
      },
      divider: {
        width: 1,
        height: 28,
        margin: 4
      },
      chip: {
        margin: theme.spacing(1)
      },
      button: {
        position: 'fixed' as 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 50
      }
    }
  }
}

export default withStyles(Diagnose.style)(Diagnose)

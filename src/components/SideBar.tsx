import React from 'react'

import { List, ListItem, ListItemIcon, ListItemText, Divider, ListItemAvatar, Avatar } from '@material-ui/core'
import ImageIcon from '@material-ui/icons/Image'
import HospitalIcon from '@material-ui/icons/LocalHospital'

interface IProps {
  primary: string,
  secondary: string
}

class SideBar extends React.Component<IProps> {
  render () {
    return (
      <div>
        <List>
          <ListItem>
            <ListItemText primary={this.props.primary} secondary={this.props.secondary} />
          </ListItem>
          <Divider />
          <ListItem button key='메인' onClick={() => window.location.href = '/'}>
            <ListItemIcon>
              <HospitalIcon />
            </ListItemIcon>
            <ListItemText primary='메인' />
          </ListItem>
          <ListItem button key='자가 진단' onClick={() => window.location.href = '/diagnose'}>
            <ListItemIcon>
              <HospitalIcon />
            </ListItemIcon>
            <ListItemText primary='자가 진단' />
          </ListItem>
          <ListItem button key='병원 찾기' onClick={() => window.location.href = '/hospital'}>
            <ListItemIcon>
              <HospitalIcon />
            </ListItemIcon>
            <ListItemText primary='병원 찾기' />
          </ListItem>
          <ListItem button key='질병 검색' onClick={() => window.location.href = 'http://www.amc.seoul.kr/asan/healthinfo/disease/diseaseSubmain.do'}>
            <ListItemIcon>
              <HospitalIcon />
            </ListItemIcon>
            <ListItemText primary='질병 검색'/>
          </ListItem>
          <ListItem button key='진단 기록' onClick={() => window.location.href = '/diagnose/list'}>
            <ListItemIcon>
              <HospitalIcon />
            </ListItemIcon>
            <ListItemText primary='진단 기록' />
          </ListItem>
        </List>
      </div>
    )
  }
}

export default SideBar

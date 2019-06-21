import React from 'react'
import { Theme, withStyles, Box, Paper, ListItem, ListItemText, List } from '@material-ui/core'

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

import hospitals from './assets/hospitals.json'

interface IProps {
  classes: { [key: string]: string }
}

interface IState {
  lat: number,
  lng: number
}

interface GoogleMapProps {
  lat: number,
  lng: number
}

const MyGoogleMap = withScriptjs(withGoogleMap((props: GoogleMapProps) =>
  <GoogleMap defaultZoom={16} defaultCenter={{ lat: props.lat, lng: props.lng }} center={{ lat: props.lat, lng: props.lng }}>
    <Marker position={{ lat: props.lat, lng: props.lng }} />
    {
      hospitals.map((hospital) => {
        return <Marker position={{ lat: hospital.위도, lng: hospital.경도 }} />
      })
    }
  </GoogleMap>
))

class Hospital extends React.Component<IProps, IState> {
  constructor (props: IProps) {
    super(props)
    this.state = { lat: 37.56679716050026, lng: 126.97858435222469 }
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({ lat: position.coords.latitude, lng: position.coords.longitude })
    })
  }
  render () {
    const { classes } = this.props
    return <Box>
      <List component='nav' style={{ marginTop: '50vh' }}>
        {(() => {
          const beforeSort: { 번호: number, 이름: string, 타입: string, 전화번호: string, 우편번호: string, 주소: string, 위도: number, 경도: number, 진료과: string, 거리: number }[] = []
          hospitals.forEach((hospital) => {
            const distance = Hospital.distance(this.state.lat, this.state.lng, hospital.위도, hospital.경도)
            beforeSort.push({ ...hospital, 거리: distance })
          })
          const sorted = beforeSort.sort((a, b) => a.거리 - b.거리)
          const result: JSX.Element[] = []
          for (let i = 0; i < 100 && i < sorted.length; i++) {
            result.push(<ListItem button onClick={() => window.location.href = `/hospital/detail?id=${sorted[i].번호}`}>
              <ListItemText primary={`${sorted[i].이름} (${(() => {
                if (sorted[i].거리 < 1) {
                  return `${Math.floor(sorted[i].거리 * 1000)}m`
                } else {
                  return `${Math.floor(sorted[i].거리 * 100) / 100}km`
                }
              })()})`} secondary={sorted[i].주소} />
            </ListItem>)
          }
          return result
        })()}
      </List>
      <MyGoogleMap
        lat={this.state.lat}
        lng={this.state.lng}
        containerElement={<Paper style={{ height: '50vh', position: 'fixed' as 'fixed', top: 0, left: 0, right: 0 }} />}
        mapElement={<div style={{ height: `100%` }} />}
        googleMapURL='https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAe9wraXp9gVOSo9sFkxQoD9Npd4UYapVY'
        loadingElement={<div style={{ height: `100%` }} />} />
    </Box>
  }

  static style (theme: Theme) {
    return {

    }
  }

  static distance (lat1: number, lon1: number, lat2: number, lon2: number) {
    const p = 0.017453292519943295    // Math.PI / 180
    const c = Math.cos
    const a = 0.5 - c((lat2 - lat1) * p) / 2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p)) / 2

    return 12742 * Math.asin(Math.sqrt(a)) // 2 * R; R = 6371 km
  }
}

export default withStyles(Hospital.style)(Hospital)

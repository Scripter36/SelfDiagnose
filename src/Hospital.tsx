import React from 'react'
import { Theme, withStyles, Box, Paper, ListItem, ListItemText, List, Typography, Grid, Button, Select, MenuItem, InputLabel } from '@material-ui/core'

import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'

import hospitals from './assets/hospitals.json'

interface MarkerProps {
  info: string | JSX.Element
  position: { lat: number, lng: number },
  key?: number
  label?: string
}

interface MarkerState {
  showInfoWindow: boolean
}

class CustomMarker extends React.Component<MarkerProps, MarkerState> {
  constructor (props: MarkerProps) {
    super(props)
    this.state = { showInfoWindow: false }
  }

  render () {
    const { showInfoWindow } = this.state
    const { info, position, key, label } = this.props
    return <Marker position={position}
      onClick={() => this.setState({ showInfoWindow: true })}
      key={key}
      label={label}
    >
      {showInfoWindow && (
        <InfoWindow onCloseClick={() => this.setState({ showInfoWindow: false })}>
          {info}
        </InfoWindow>
      )}
    </Marker>
  }
}

interface GoogleMapProps {
  lat: number,
  lng: number,
  hospitalList: { 번호: number, 이름: string, 타입: string, 전화번호: string, 우편번호: string, 주소: string, 위도: number, 경도: number, 진료과: string, 거리: number }[],
  onCenterChanged?: () => any,
  mapRef?: React.RefObject<GoogleMap>
}

const MyGoogleMap = withScriptjs(withGoogleMap((props: GoogleMapProps) => {
  const markerList: { 데이터: { 번호: number, 이름: string, 거리: number, 주소: string }[], 위도: number, 경도: number }[] = []
  props.hospitalList.forEach((hospital) => {
    for (const marker of markerList) {
      if (marker.위도 === hospital.위도 && marker.경도 === hospital.경도) {
        marker.데이터.push({ 번호: hospital.번호, 이름: hospital.이름, 주소: hospital.주소, 거리: hospital.거리 })
        return
      }
    }
    markerList.push({ 데이터: [{ 번호: hospital.번호, 이름: hospital.이름, 주소: hospital.주소, 거리: hospital.거리 }], 위도: hospital.위도, 경도: hospital.경도 })
  })
  return <GoogleMap defaultZoom={16} defaultCenter={{ lat: props.lat, lng: props.lng }} center={{ lat: props.lat, lng: props.lng }} onCenterChanged={props.onCenterChanged} ref={props.mapRef}>
    {
      markerList.map((markerData, index) => {
        const name: string[] = []
        markerData.데이터.forEach((data) => name.push(data.이름)) //  onClick={() => window.location.href = `/hospital/detail?id=${sorted[i].번호}`}
        return <CustomMarker position={{ lat: markerData.위도, lng: markerData.경도 }} info={<List component='nav'>{
          markerData.데이터.map((data) => {
            return <ListItem button onClick={() => window.location.href = `/hospital/detail?id=${data.번호}`}>
            <ListItemText primary={`${data.이름} (${(() => {
              if (data.거리 < 1) {
                return `${Math.floor(data.거리 * 1000)}m`
              } else {
                return `${Math.floor(data.거리 * 100) / 100}km`
              }
            })()})`} secondary={data.주소} />
          </ListItem>
          })
        }</List>} />
      })
    }
  </GoogleMap>
}))

interface IProps {
  classes: { [key: string]: string }
}

interface IState {
  lat: number,
  lng: number,
  row: boolean,
  showCount: number
}

class Hospital extends React.Component<IProps, IState> {
  center: { lat: number, lng: number }
  mapRef: React.RefObject<GoogleMap>
  constructor (props: IProps) {
    super(props)
    this.center = { lat: 37.56679716050026, lng: 126.97858435222469 }
    this.state = { lat: 37.56679716050026, lng: 126.97858435222469, row: window.innerHeight > window.innerWidth, showCount: 30 }
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = { lat: position.coords.latitude, lng: position.coords.longitude }
      this.setState({ lat: position.coords.latitude, lng: position.coords.longitude })
    })
    window.addEventListener('resize', () => {
      const newRow = window.innerHeight > window.innerWidth
      if (this.state.row !== newRow) {
        this.setState({ row: newRow })
      }
    })
    this.mapRef = React.createRef()
  }
  render () {
    const { classes } = this.props
    const beforeSort: { 번호: number, 이름: string, 타입: string, 전화번호: string, 우편번호: string, 주소: string, 위도: number, 경도: number, 진료과: string, 거리: number }[] = []
    hospitals.forEach((hospital) => {
      if (!hospital.위도) return
      const distance = Hospital.distance(this.state.lat, this.state.lng, hospital.위도, hospital.경도)
      if (hospital.이름 === '서울스페셜병원') console.log(this.state.lat, this.state.lng, hospital.위도, hospital.경도)
      beforeSort.push({ ...hospital, 거리: distance })
    })
    console.log(beforeSort)
    const sorted = beforeSort.sort((a, b) => a.거리 - b.거리)
    console.log(sorted)
    return <Grid container style={{ maxHeight: '100vh', position: 'relative', width: '100%', height: '100%', flexDirection: (this.state.row ? 'row' : 'column') }}>
      <Grid item xs={12} style={this.state.row ? { height: `50%` } : { height: `100%`, width: '50%', minWidth: 'calc(100% - 400px)' }}>
      <MyGoogleMap
        lat={this.state.lat}
        lng={this.state.lng}
        mapRef={this.mapRef}
        containerElement={<Paper style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        googleMapURL='https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAe9wraXp9gVOSo9sFkxQoD9Npd4UYapVY'
        loadingElement={<div style={{ height: `100%` }} />}
        hospitalList={sorted.slice(1, this.state.showCount)}
        onCenterChanged={() => {
          const current = this.mapRef.current
          if (current) {
            const center = current.getCenter()
            this.center = { lat: center.lat(), lng: center.lng() }
          }
        }} />
      </Grid>
      <Grid item xs={12} style={this.state.row ? {  overflowY: 'scroll' , height: `50%` } : {  overflowY: 'scroll' , height: `100%`, width: '50%', maxWidth: '400px' }}>

      <List component='nav'>
      <Box style={{ display: 'flex' as 'flex', flexDirection: 'row' }}>
        <Button color='primary' className={classes.button} onClick={() => {
          this.setState({ lat: this.center.lat, lng: this.center.lng })
        }}>이 위치에서 재검색</Button>
        <Box style={{ flexGrow: 1 }} />
        <Select
          value={this.state.showCount}
          onChange={(e) => {
            console.log(e.target.value)
            this.setState({ showCount: e.target.value as number })
          }}
          inputProps={{
            name: 'showcount',
            id: 'showcount'
          }}
          style={{ marginRight: 16 }}
        >
          <MenuItem value={30}>30개씩 보기</MenuItem>
          <MenuItem value={100}>100개씩 보기</MenuItem>
          <MenuItem value={500}>500개씩 보기</MenuItem>
          <MenuItem value={1000}>1000개씩 보기</MenuItem>
          <MenuItem value={hospitals.length}>모두 보기</MenuItem>
        </Select>
      </Box>
        {(() => {
          const result: JSX.Element[] = []
          for (let i = 0; i < this.state.showCount && i < sorted.length; i++) {
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
      </Grid>
    </Grid>
  }

  static style (theme: Theme) {
    return {
      button: {
        margin: theme.spacing(1)
      }
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

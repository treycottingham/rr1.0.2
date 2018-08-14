import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class GeolocationExample extends Component {
  constructor(props) {
    super(props)
    this.state = {
      speed: null,
      latitude: null,
      longitude: null,
      error: null,
    }
  }
  componentDidMount() {
    // this.getPosition()
  }
  positionChange = (data) => {
    console.log('DATA IN POSCHANGE', data)
  }
  componentWillUnmount() {
    console.log('UNMOUNTED')
    navigator.geolocation.clearWatch(this.watchId)
  }
  render() {
    setTimeout(() => {
      this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        if(position.coords.speed >= 0) {
          return this.setState({
            speed: position.coords.speed,
            isShown: true
          })
        } else {
          console.log('NOT GENERATING POINTS')
        }
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    )
    }, 10000)
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        {this.state.isShown && <Text>Generating Points</Text>}
        <Text>Speed: {this.state.speed}</Text>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
      </View>
    )
  }
}

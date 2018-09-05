import React from 'react'
import { StyleSheet, ImageBackground } from 'react-native'
import { Container, Content, Text } from 'native-base'
import moment from 'moment'
import * as firebase from 'firebase'
import { KeepAwake } from 'expo'

import Logo from './Logo'

const apiURL = 'https://road-rewards-1.herokuapp.com/users/'

export default class GeoAndMoments extends React.Component {
  constructor(props) {
    super(props)
    this.didMount = false
    this.state = {
      id: null,
      email: '',
      startingMoment: moment(),
      speed: 0,
      currentMoment: 0,
      storedPoints: 0,
      counter: 0,
      pointTotal: 0,
      isLoaded: false,
      isShown: false,
    }
  }
  componentDidMount() {
    this.fetchUserData()
    this.didMount = true
    if(!this.state.isShown){
      setTimeout(() => {
        this.watchId = navigator.geolocation.watchPosition(
          (position) => {
            if(position.coords.speed >= -1) {
              this.setState({
                speed: position.coords.speed,
                isShown: true,
                startingMoment: moment(),
                counter: moment().diff(this.state.startingMoment, 'minutes'),
                storedAndCounter: moment().diff(this.state.startingMoment, 'minutes') + this.state.storedPoints,
              })
            } else if(position.coords.speed >= 0) {
              this.setState({
                speed: position.coords.speed,
              })
            }
          },
          (error) => this.setState({ error: error.message }),
          { enableHighAccuracy: true, timeout: 21000, maximumAge: 1000, distanceFilter: 10 },
        )
      }, 10000)
    }
  }
  componentDidUpdate() {
    // this.fetchUserData()
    if(this.state.isShown) {
      this.intervalId = setInterval(this.timer, 60000)
    }
  }
  timer = () => {
    this.setState({
      counter: moment().diff(this.state.startingMoment, 'minutes'),
      storedAndCounter: moment().diff(this.state.startingMoment, 'minutes') + this.state.storedPoints,
    })
    this.updatePoints() 
  }
  fetchUserData = () => {
    var user = firebase.auth().currentUser
    var email
    if (user != null) {
      email = user.email
      this.getUser(email)
    }
  }
  getUser = (email) => {
    fetch(apiURL)
    .then(response => response.json())
    .then(data => data.users.filter(
      user => user.email == email
    ))
    .then(user => {
      var pointImport = user[0].pointTotal
      var userID = user[0].id
      var userEmail = user[0].email
      this.setState({
        email: userEmail,
        storedPoints: pointImport,
        isLoaded: true,
        id: userID
      })
    })
  }
  updatePoints = () => {
    let pointsPosted = {
      pointTotal: this.state.storedAndCounter
    }
    fetch(apiURL + this.state.id, {
      method: 'PUT',
      body: JSON.stringify(pointsPosted),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .catch((error) => {console.log('ERROR IN UPDATEPOINTS', error)})
  }
  componentWillUnmount() {
    clearInterval(this.intervalId)
    console.log('COMPWILLUNMOUNT')
    this.didMount = false
  }
  render() {
    return (
      <Container>
        <Container style={styles.whiteBack}>
        <KeepAwake />
        {this.state.isShown ? null : <Text style={styles.bigText}>You currently have {this.state.storedPoints} points.</Text>}
        {this.state.isShown ? null : <Text style={styles.bigText}>Current Speed: {this.state.speed}</Text>}
        {this.state.isShown ? null : <Text style={styles.smallText}>Points will begin to generate when you are moving at least 10MPH, please remember to drive safely.</Text>}
        {this.state.isShown && <Container style={styles.container}>
          <Content>
            {this.state.isLoaded ? <Text style={styles.bigText}>Welcome {this.state.email}</Text> : null}
            <Text
            style={styles.bigText}
            >Points Earned This Trip</Text>
            <ImageBackground
            style={styles.background}
            source={require('../public/odometer.jpg')}
            >
              <Text
              style={styles.spacedText}
              >{this.state.counter}</Text>
            </ImageBackground>
            <Text
            style={styles.bigText}
            >Total Points Earned</Text>
            <ImageBackground
            style={styles.background}
            source={require('../public/odometer.jpg')}
            >
            {this.state.isLoaded ? <Text style={styles.spacedText}>{this.state.storedAndCounter}</Text> : <Text style={styles.spacedText}>Loading...</Text>}
            </ImageBackground>
          </Content>
        </Container>}
        <Logo />
        </Container>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  bigText: {
    marginTop: 6,
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'TrebuchetMS',
    color: 'black',
  },
  whiteBack: {
    backgroundColor: 'white',
  },
  smallText: {
    marginTop: 6,
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'TrebuchetMS',
    color: 'black',
  },
  background: {
    flex: 1,
    alignItems: 'flex-end',
    width: 150,
    height: 25,
    marginLeft: 65,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacedText: {
    color: 'white',
    letterSpacing: 18,
  },
  button: {
    marginTop: 10,
  }
})

// if(moment().diff(this.state.startingMoment, 'minutes') >= 1) {
  //   var timer = setTimeout(() => {
    //   return this.watchId = navigator.geolocation.watchPosition(
      //   (position) => {
        //     if(position.coords.speed >= -1) {
          //       var counter = this.state.counter - 1
          //       console.log('COUNTER IN SETTIMEOUT 2:', counter)
          //       return this.setState({
            //         speed: position.coords.speed,
            //         isShown: true,
            //         currentMoment: moment(),
            //         previousCounter: counter,
            //         counter: moment().diff(this.state.startingMoment, 'minutes')
            //       })
            //     } 
            //     // if(this.state.counter > this.state.previousCounter){
              //     //   return this.logPoints()
              //     // }
              //   },
              //   (error) => this.setState({ error: error.message }),
              //   { enableHighAccuracy: true, timeout: 21000, maximumAge: 1000, distanceFilter: 10 },
              // )}, 30001) } else {
                //   clearTimeout(timer)
                // }
      
      
      
      // logPoints = () => {
      //   console.log('LOGPOINTS')
      //   var storedPoints = this.state.storedPoints + this.state.counter - this.state.previousCounter
      //   if(storedPoints > this.state.storedPoints){
      //     console.log('DIFF', (this.state.counter - this.state.previousCounter))
      //     console.log('VAR STOREDPOINTS', storedPoints, 'THIS STATE STOREDPOINTS', this.state.storedPoints)
      //     // this.setState({
      //     //   storedPoints: storedPoints,
      //     //   // startingMoment: moment(),
      //     //   // counter: 0
      //     // })
      //     return this.updatePoints(storedPoints)
      //   }
      // }
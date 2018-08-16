import React from 'react'
import { StyleSheet, View, ImageBackground, TouchableHighlight } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { KeepAwake } from 'expo'
import moment from 'moment'
import { Container, Header, Title, Input, Content, Form, Item, Label, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base'
import * as firebase from 'firebase'

import Logo from './Logo'
import Feedback from './Feedback'

const apiURL = 'https://road-rewards-1.herokuapp.com/users/'

export default class GeoAndMoments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      email: '',
      startingMoment: moment(),
      currentMoment: 0,
      storedPoints: 0,
      counter: 0,
      pointTotal: 0,
      isLoaded: false,
      // isShown: true, //delete this for production
    }
  }
  componentDidMount() {
    this.fetchUserData()
  }
  fetchUserData = (userEmail) => {
    var user = firebase.auth().currentUser
    var name, email, photoUrl, uid, emailVerified

    if (user != null) {
      email = user.email
      // uid = user.uid // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      this.getUser(email)
    }
  }
  getUser = (email) => {
    // console.log('GETUSER EMAIL', email)
    fetch(apiURL)
      .then(response => response.json())
      .then(data => data.users.filter(
        user => user.email === email
      ))
      .then(user => {
        console.log(user[0])
        var pointImport = user[0].pointTotal
        var userID = user[0].id
        var userEmail = user[0].email
        // console.log('USER IN GETUSER', user)
        this.setState({
          email: userEmail,
          storedPoints: pointImport,
          isLoaded: true,
          id: userID
      })
    })
  }
  logPoints = () => {
    var storedPoints = this.state.storedPoints + this.state.counter
    this.setState({
      storedPoints: storedPoints,
      startingMoment: moment(),
      counter: 0
    })
    this.updatePoints(storedPoints)
  }
  updatePoints = (data) => {
    let pointsPosted = {
      pointTotal: data
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
    .catch(function (error) {
      console.log('ERROR IN UPDATEPOINTS', error)
    })
  }
  signOut() {
    firebase.auth().signOut().then(Actions.landing())
  }
  render() {
    setTimeout(() => {
      this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        if(position.coords.speed >= 10) {
          return this.setState({
            speed: position.coords.speed,
            isShown: true,
            currentMoment: moment(),
            counter: moment().diff(this.state.startingMoment, 'minutes')
          })
        }
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 21000, maximumAge: 1000, distanceFilter: 10 },
    )
    }, 20000) //140 is speed I could double press
    return (
      <Container>
        <Container>
        <KeepAwake />
        {this.state.isShown ? null : <Text style={styles.beginText}>Points will begin to generate when you are moving at least 10MPH, please remember to drive safely.</Text>}
        {this.state.isShown && <Container style={styles.container}>
          <Content>
            {this.state.isLoaded ? <Text style={styles.bigText}>Welcome {this.state.email}</Text> : null}
            <Text
            style={styles.bigText}
            >Points Earned This Session</Text>
            <ImageBackground
            style={styles.background}
            source={require('../odometer.jpg')}
            >
              <Text
              style={styles.text}
              >{this.state.counter}</Text>
            </ImageBackground>
            <Text
            style={styles.bigText}
            >Total Points Earned</Text>
            <ImageBackground
            style={styles.background}
            source={require('../odometer.jpg')}
            >
            {this.state.isLoaded ? <Text style={styles.pointTotal}>{this.state.storedPoints}</Text> : <Text style={styles.pointTotal}>Loading...</Text>}
            </ImageBackground>
            <Container style={{backgroundColor : 'green', height : '20%'}}>
              <Button bordered light
                onPress={this.logPoints}
                style={{marginLeft: 50, marginTop: 10}}>
                  <Text>Add Points to Total</Text>
              </Button>
              <Button bordered light
                onPress={this.signOut}
                style={{marginLeft: 92, marginTop: 10}}>
                  <Text>Log Out</Text>
              </Button>
            </Container>
          </Content>
        </Container>}
        <Logo />
        </Container>
        <Feedback />
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
    color: 'white',
  },
  beginText: {
    marginTop: 6,
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'TrebuchetMS',
    color: 'black',
  },
  dashboard: {
    marginTop: '10%',
  },
  pointTotal: {
    color: 'white',
    letterSpacing: 18,
  },
  image: {
    width: 100,
    height: 50,
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  background: {
    flex: 1,
    alignItems: 'flex-end',
    width: 150,
    height: 25,
    marginLeft: 65,
  },
  container: {
    backgroundColor: 'green',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    letterSpacing: 18,
  },
})
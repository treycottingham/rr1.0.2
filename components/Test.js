import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Text } from 'native-base'
import moment from 'moment'
import * as firebase from 'firebase'
import { KeepAwake } from 'expo'

import Logo from './Logo'
import Feedback from './Feedback'

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
      fetchInCDM: false,
    }
  }
  componentDidMount() {
    var user = firebase.auth().currentUser
    console.log('FIREBASE USER', user)
    var email
    if (user != null) {
      email = user.email

      this.getUser(email)
      this.setState({
        fetchInCDM: true,
      })
    }
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
    // if(this.state.storedPoints === undefined){
    //   email = user.email
    //   this.getUser(email)
    //   this.setState({
    //     fetchInCDM: true,
    //   })
    //   setTimeout(() => {
    //     console.log('GETUSER TIMEOUT FIRING')
    //     this.getUser(email)
    //   }, 10000)
    // }
  }
  componentDidUpdate() {
    if(this.state.isShown) {
      this.intervalId = setInterval(this.timer, 20000)
    }
  }
  timer = () => {
    this.setState({
      counter: moment().diff(this.state.startingMoment, 'minutes'),
      storedAndCounter: moment().diff(this.state.startingMoment, 'minutes') + this.state.storedPoints,
      timerInit: true,
    })
    this.updatePoints() 
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
      console.log('USER', user, 'USER EMAIL', user[0].email, 'TYPEOFUSER', typeof user, 'STATE', this.state)
      var typeOfUserDB = typeof user
      var typeOfID = typeof userID
      var typeOfEmail = typeof userEmail
      var typeOfPointImport = typeof pointImport
      this.setState({
        typeOfPointImport: typeOfPointImport,
        typeOfID: typeOfID,
        typeOfEmail: typeOfEmail,
        typeOfUserDB: typeOfUserDB,
        email: userEmail,
        storedPoints: pointImport,
        isLoaded: true,
        id: userID
      })
    })
    .then(() => {
      var typeOfStoredPoints = typeof this.state.storedPoints
      this.setState({typeOfStoredPoints: typeOfStoredPoints})
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
    .then(this.setState({updatePoints: true}))
    .catch((error) => {console.log('ERROR IN UPDATEPOINTS', error)})
  }
  componentWillUnmount() {
    clearInterval(this.intervalId)
    this.didMount = false
    console.log('COMPWILLUNMOUNT')
  }
  render() {
    return (
      <Container>
        <KeepAwake />
        <Container style={styles.whiteBack}>
          <Text style={styles.smallText}>Please let this page run for 20seconds, screenshot and slack it to #feedbackalpha. Best Case: 15 tests should run.</Text>
          {this.state.fetchInCDM ? <Text style={styles.smallText}>1 FetchInCompDidMount</Text> : null}
          {this.state.storedPoints ? <Text style={styles.smallText}>2 Stored Points: {this.state.storedPoints}</Text> : null}
          {this.state.typeOfStoredPoints ? <Text style={styles.smallText}>3 Type of Stored Points: {this.state.typeOfStoredPoints}</Text> : null}
          {this.state.isLoaded ? <Text style={styles.smallText}>4 Is Loaded {this.state.isLoaded}</Text> : null}
          {this.state.email ? <Text style={styles.smallText}>5 Email from DB: {this.state.email}</Text> : null}
          {this.state.id ? <Text style={styles.smallText}>6 ID from DB: {this.state.id}</Text> : null}
          {this.state.typeOfUserDB ? <Text style={styles.smallText}>7 Type of User from DB: {this.state.typeOfUserDB}</Text> : null}
          {this.state.typeOfEmail ? <Text style={styles.smallText}>8 Type of Email: {this.state.typeOfEmail}</Text> : null}
          {this.state.typeOfID ? <Text style={styles.smallText}>9 Type of ID: {this.state.typeOfID}</Text> : null}
          {this.state.typeOfPointImport ? <Text style={styles.smallText}>10 Type of PointImport: {this.state.typeOfPointImport}</Text> : null}
          {this.state.speed ? <Text style={styles.smallText}>11 Speed: {this.state.speed}</Text> : null}
          {this.state.storedAndCounter ? <Text style={styles.smallText}>12 Stored & Counter: {this.state.storedAndCounter}</Text> : null}
          {this.state.counter ? <Text style={styles.smallText}>13 Counter: {this.state.counter}</Text> : null}
          {this.state.timerInit ? <Text style={styles.smallText}>14 Timer Init</Text> : null}
          {this.state.updatePoints ? <Text style={styles.smallText}>15 Points Updating</Text> : null}

          {this.state.isShown ? <Text style={styles.smallText}></Text> : null}
          {this.state.isShown ? <Text style={styles.smallText}></Text> : null}
          {this.state.isShown ? <Text style={styles.smallText}></Text> : null}
          {this.state.isShown ? <Text style={styles.smallText}></Text> : null}
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
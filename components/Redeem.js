import React from 'react'
import { StyleSheet, View, Easing, ImageBackground, Image, TouchableHighlight, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { KeepAwake } from 'expo'
import moment from 'moment'
// import Prompt from 'react-native-prompt'
import { Container, Header, Title, Input, Content, Form, Item, Label, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base'
import * as firebase from 'firebase'

import Logo from './Logo'
import Feedback from './Feedback'

const apiURL = 'https://road-rewards-1.herokuapp.com/users/'

export default class Redeem extends React.Component {
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
      isShown: true,
    }
  }
  componentDidMount() {
    this.fetchUserData()
  }
  fetchUserData = () => {
    var user = firebase.auth().currentUser
    var name, email, photoUrl, uid, emailVerified

    if (user != null) {
      email = user.email
      uid = user.uid
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
  removePoints = () => {
    var storedPoints = this.state.storedPoints - 5
    if(storedPoints >= 0){
      this.setState({
        storedPoints: storedPoints,
      })
      this.updatePoints(storedPoints)
    }
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
  goToGen() {
    Actions.generator()
  }
  redeemOne = () => {
    this.setState({promptVisible: true})
    // this.setState({rewardOneShown: true})
    // this.removePoints()
  }
  redeemTwo = () => {
    this.setState({rewardTwoShown: true})
    this.removePoints()
  }
  render() {
    return (
        <Container>
          {this.state.isShown && <Container style={styles.container}>
          <KeepAwake />
              {this.state.isLoaded ? <Text style={styles.bigText}>{this.state.storedPoints} points.</Text> : null}
              <ScrollView style={{backgroundColor : 'green', marginBottom: 60}}>
                <Text style={styles.bigText}>Free Burrito: 5 points</Text>
                {/* <Prompt
                  title='"Say something"'
                  placeholder='"Start typing"'
                  defaultValue='"Hello"'
                  visible={ this.state.promptVisible }
                  onCancel={ () => this.setState({
                    promptVisible: false,
                    message: '"You cancelled"'
                  }) }
                  onSubmit={ (value) => this.setState({
                    promptVisible: false,
                    message: `You said "${value}"`
                }) }/> */}
                {this.state.rewardOneShown ? <Image source={require('../barcode.jpg')} style={styles.image}></Image> : <Button bordered light
                  onPress={this.redeemOne}
                  style={{marginLeft: 62, marginTop: 10}}>
                    <Text>Redeem Points</Text>
                </Button>}
                <Text style={styles.bigText}>Gym Membership: 5 points</Text>
                {this.state.rewardTwoShown ? <Image source={require('../barcode.jpg')} style={styles.image}></Image> : <Button bordered light
                  onPress={this.redeemTwo}
                  style={{marginLeft: 62, marginTop: 10}}>
                    <Text>Redeem Points</Text>
                </Button>}
              </ScrollView>
          <Logo />
          <Feedback />
          </Container>}
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
    marginTop: 150,
  },
  pointTotal: {
    color: 'white',
    letterSpacing: 18,
  },
  image: {
    width: 300,
    height: 200,
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

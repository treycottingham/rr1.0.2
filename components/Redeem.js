import React from 'react'
import { StyleSheet, Image, ScrollView, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { KeepAwake } from 'expo'
import moment from 'moment'
import { Container, Button, Text } from 'native-base'
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
    var email
    if (user != null) {
      email = user.email
      uid = user.uid
      this.getUser(email)
    }
  }
  getUser = (email) => {
    fetch(apiURL)
      .then(response => response.json())
      .then(data => data.users.filter(
        user => user.email === email
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
  removePoints = () => {
    var storedPoints = this.state.storedPoints - 5
    if(storedPoints >= 0){
      this.setState({storedPoints: storedPoints})
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
    .catch(function (error) {console.log('ERROR IN UPDATEPOINTS', error)})
  }
  goToGen() {
    Actions.generator()
  }
  confirmSelectionOne = () => {
    Alert.alert(
      'Redeem Points?',
      '5 points',
      [
        {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => this.redeemOne()},
      ],
      { cancelable: false }
    )   
  }
  confirmSelectionTwo = () => {
    Alert.alert(
      'Redeem Points?',
      '5 points',
      [
        {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => this.redeemTwo()},
      ],
      { cancelable: false }
    )   
  }
  redeemOne = () => {
    this.setState({rewardOneShown: true})
    this.removePoints()
  }
  redeemTwo = () => {
    this.setState({rewardTwoShown: true})
    this.removePoints()
  }
  render() {
    return (
      <Container>
        <Container style={styles.container}>
          <KeepAwake />
          {this.state.isLoaded ? <Text style={styles.bigText}>You have {this.state.storedPoints} points.</Text> : null}
          {this.state.isShown && <ScrollView style={styles.scrollView}>
            <Text style={styles.description}>Free burrito from Los Locos: 5 points</Text>
            {this.state.rewardOneShown ? <Image source={require('../barcode.jpg')} style={styles.image}></Image> : <Button bordered light full
              onPress={this.confirmSelectionOne}
              style={styles.button}>
                <Text>Redeem Points</Text>
            </Button>}
            <Text style={styles.description}>1 month gym membership at Skye Fitness: 5 points</Text>
            {this.state.rewardTwoShown ? <Image source={require('../barcode.jpg')} style={styles.image}></Image> : <Button bordered light full
              onPress={this.confirmSelectionTwo}
              style={styles.button}>
                <Text>Redeem Points</Text>
            </Button>}
          </ScrollView>}
          <Logo />
        </Container>
        <Feedback />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  description: {
    color: 'white', 
    textAlign: 'center', 
    marginTop: 10,
  },
  button: {
    marginTop: 10,
  },
  bigText: {
    marginTop: 6,
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'TrebuchetMS',
    color: 'white',
  },
  scrollView: {
    backgroundColor: 'green', 
    marginBottom: 60, 
  },
  image: {
    width: 300,
    height: 200,
    marginLeft: '9%',
    marginTop: '3%'
  },
  container: {
    backgroundColor: 'green',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
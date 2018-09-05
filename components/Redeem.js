import React from 'react'
import { StyleSheet, Image, ScrollView, Alert, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { KeepAwake } from 'expo'
import { Container, Button, Text } from 'native-base'
import * as firebase from 'firebase'

import Logo from './Logo'

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
  removePointsOne = () => {
    var storedPoints = this.state.storedPoints - 5
    if(storedPoints >= 0){
      this.setState({storedPoints: storedPoints})
      this.updatePoints(storedPoints)
    }
  }
  removePointsTwo = () => {
    var storedPoints = this.state.storedPoints - 10
    if (storedPoints >= 0) {
      this.setState({
        storedPoints: storedPoints
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
    .catch(function (error) {console.log('ERROR IN UPDATEPOINTS', error)})
  }
  confirmSelectionOne = (event) => {
    // console.log('EVENT', event.props)
    if(this.state.storedPoints >= 5){
      Alert.alert(
        'Redeem Points?',
        '5 points',
        [
          {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Yes', onPress: () => this.redeemOne()},
        ],
        { cancelable: false }
      )   
    } else {
      alert('You do not have enough points.')
    }
  }
  confirmSelectionTwo = () => {
    if(this.state.storedPoints >= 10){
      Alert.alert(
        'Redeem Points?',
        '10 points',
        [
          {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Yes', onPress: () => this.redeemTwo()},
        ],
        { cancelable: false }
      )   
    } else {
      alert('You do not have enough points.')
    }
  }
  redeemOne = () => {
    this.setState({rewardOneShown: true})
    this.removePointsOne()
  }
  redeemTwo = () => {
    this.setState({rewardTwoShown: true})
    this.removePointsTwo()
  }
  render() {
    return (
      <Container>
        <Container style={styles.container}>
          <KeepAwake />
          {this.state.isLoaded ? <Text style={styles.bigText}>You have {this.state.storedPoints} points.</Text> : null}
          {this.state.isShown && <ScrollView style={styles.scrollView}>
            <View style={{flex: 1, flexDirection: 'row', width: '80%'}}>
              <Image source={require('../public/iplogo.png')} style={styles.logo}></Image>
              <Text style={styles.description}>Illegal Petes Fountain Drink with purchase of a burrito: 5 points</Text>
            </View>
            {this.state.rewardOneShown ? <Image source={require('../public/qr.png')} style={styles.image}></Image> : <Button bordered success full
              onPress={this.confirmSelectionOne}
              style={styles.button}>
                <Text>Redeem Points</Text>
            </Button>}
            {/* <Text style={styles.description}>1 month gym membership at Skye Fitness: 10 points</Text>
            {this.state.rewardTwoShown ? <Image source={require('../public/barcode.jpg')} style={styles.image}></Image> : <Button bordered success full
              onPress={this.confirmSelectionTwo}
              style={styles.button}>
                <Text>Redeem Points</Text>
            </Button>} */}
          </ScrollView>}
          <Logo />
        </Container>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  description: {
    color: 'black', 
    textAlign: 'center', 
    marginTop: 10,
  },
  logo: {
    width: 100,
    height: 60,
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
    color: 'black',
  },
  scrollView: {
    backgroundColor: 'white', 
    marginBottom: 60, 
  },
  image: {
    width: 200,
    height: 200,
    marginLeft: '19%',
    marginTop: '3%'
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
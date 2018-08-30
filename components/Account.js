import React from 'react'
import { StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { KeepAwake } from 'expo'
import { Container, Content, Button, Text } from 'native-base'
import * as firebase from 'firebase'

import Logo from './Logo'
import Feedback from './Feedback'

const apiURL = 'https://road-rewards-1.herokuapp.com/users/'

export default class Account extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      storedPoints: 0,
      // pointTotal: 0,
      isLoaded: false,
    }
  }
  componentDidMount() {
    this.fetchUserData()
  }
  componentDidUpdate() {
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
  goToGen() {
    Actions.generator()
  }
  redeem() {
    Actions.redeem()
  }
  render() {
    return (
      <Container style={styles.container}>
        <KeepAwake />
        <Content style={styles.dashboard}>
          {this.state.isLoaded ? <Text style={styles.bigText}>Welcome {this.state.email}, You currenly have {this.state.storedPoints} points.</Text> : null}
          <Container style={styles.container}>
            <Text style={styles.description}>Redeem points for rewards from our partner businesses.</Text>
            <Button bordered success full
              onPress={this.redeem}
              style={styles.button}>
                <Text>Redeem Points</Text>
            </Button>
            <Text style={styles.description}>Earn points by driving safely.</Text>
            <Button bordered success full
              onPress={this.goToGen}
              style={styles.button}>
                <Text>Earn Points</Text>
            </Button>
            <Button bordered success full
              onPress={() => Actions.test()}
              style={styles.button}>
                <Text>Test Login Status</Text>
            </Button>
          </Container>
        </Content>
        <Logo />
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
  button: {
    marginTop: 10
  },
  dashboard: {
    marginTop: '10%',
  },
  container: {
    backgroundColor: 'white',
  },
  description: {
    color: 'black',
    textAlign: 'center',
    marginTop: 10
  },
})
import React from 'react'
import { StyleSheet, ImageBackground } from 'react-native'
import { Container, Content, Text } from 'native-base'
import * as firebase from 'firebase'
import { KeepAwake } from 'expo'

import Logo from './Logo'
import Feedback from './Feedback'

const apiURL = 'https://road-rewards-1.herokuapp.com/users/'

export default class Test extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null, // id from db
      uid: null, // auth id
      authUser: '', // auth user
      dbEmail: '', // email from db
      storedPoints: 0, // pts from db
      pointTotal: 0, // pts from db
    }
  }
  componentDidMount() {
    if(this.state.id === null) {
      setTimeout(() => {
        this.authCheck()
      }, 10000)
    }
    // this.authCheck()
  }
  // componentDidUpdate() {
  //   console.log('CDU')
  //   this.authCheck()
  // }
  authCheck = () => {
    console.log('AUTHCHECK')
    var user = firebase.auth().currentUser
    var email
    if (user != null) {
      email = user.email
      this.setState({
        authUser: email
      })
      this.getUser(email)
    } else {
      this.setState({
        authUser: 'not signed in'
      })
    }
  }
  getUser = (email) => {
    fetch(apiURL).then(response => response.json())
    .then(data => data.users.filter(
      user => user.email === email
    ))
    .then(user => {  // the index 0 might be the cause since nothing is returned
      this.setState({
        email: user[0].email,
        storedPoints: user[0].pointTotal,
        id: user[0].id,
      })
    })
  }
  render() {
    return (
      <Container>
        <Container style={styles.whiteBack}>
          <KeepAwake />
          <Text style={styles.smallText}>Every ten seconds, the app is checking your login.</Text>
          <Text style={styles.smallText}>Email: {this.state.email}</Text>
          <Text style={styles.smallText}>ID: {this.state.id}</Text>
          <Text style={styles.smallText}>Auth User: {this.state.authUser}</Text>
          <Logo />
        </Container>
        <Feedback />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
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
})
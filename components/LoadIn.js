import React from 'react'
import { Animated, View, StyleSheet } from 'react-native'
import { Container, Form, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base'
import { Actions, ActionConst } from 'react-native-router-flux'
import * as firebase from 'firebase'

import FadeLogo from './FadeLogo'

export default class FadeInView extends React.Component {
  constructor(props) {
    super(props)
    // this.state ={
    // }
  }
  componentDidMount() {
    // this.fetchUserData()
  }
  fetchUserData() {
    var user = firebase.auth().currentUser
    var name, email, photoUrl, uid, emailVerified
    if (user != null) {
      console.log('IF')
      Actions.dash()
    } else {
      console.log('ELSE')
      Actions.landing()
    }
  }
  render() {
    return (
        <Container style={styles.container}>
          <FadeLogo />
          <Button bordered success full 
          onPress={this.fetchUserData}
          ><Text>Enter</Text></Button>
        </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
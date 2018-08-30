import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Button, Text } from 'native-base'
import { Actions } from 'react-native-router-flux'
import * as firebase from 'firebase'

import FadeLogo from './FadeLogo'

export default class FadeInView extends React.Component {
  fetchUserData() {
    var user = firebase.auth().currentUser
    if (user != null) {
      Actions.dash()
    } else {
      Actions.landing()
    }
  }
  render() {
    return (
        <Container style={styles.container}>
          <FadeLogo />
          <Text>V1.0.7</Text>
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
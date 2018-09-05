import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Button, Text } from 'native-base'
import { Actions } from 'react-native-router-flux'

import FadeView from './FadeView'

export default class Landing extends React.Component {
  logInButton = () => {
    Actions.login()
  }
  signUpButton = () => {
    Actions.login({passwordConfirm : true})
  }
    render() {
      return (
        <Container>
          <Container style={styles.container}>
            <Text style={styles.bigText}>The App Formerly Known As:</Text>
            <FadeView />
            <Button bordered full success onPress={this.logInButton}><Text>Log In</Text></Button>
            <Button bordered full success onPress={this.signUpButton}><Text>SignUp</Text></Button>
            <Text>IMPORTANT: Due to a trademark issue, we will be changing the company name before our official launch.  In the meantime, your feedback is vitally important to improving the app.  Thank you so much to all of our Alpha testers for being part of this journey, we are very excited for the future of this venture.</Text>
          </Container>
        </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigText: {
    marginTop: 6,
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'TrebuchetMS',
  },
})
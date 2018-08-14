import React from 'react'
import { StyleSheet, Image, ImageBackground } from 'react-native'
import { Container, Form, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base'

import LoginForm from './LoginForm'
import SignUp from './SignUp'

import Logo from './Logo'

import * as firebase from 'firebase'

// const firebaseConfig = {
//   apiKey: "AIzaSyA2seVYrVMi-IW0MHISxmRFrdhxHHS6MH4",
//   authDomain: "road-rewards-with-auth.firebaseapp.com",
//   databaseURL: "https://road-rewards-with-auth.firebaseio.com",
//   projectId: "road-rewards-with-auth",
//   storageBucket: "",
// }

// firebase.initializeApp(firebaseConfig)

export default class LoginButton extends React.Component {
    render() {
      return (
        <Container>
          <Button>
            <Text>Log In</Text>
          </Button>
        </Container>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 50,
    position: "absolute",
    bottom: 8,
    right: 8,
  },
})
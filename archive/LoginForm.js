import React from 'react'
import { StyleSheet, View, TouchableHighlight } from 'react-native'
import { Actions, ActionConst } from 'react-native-router-flux'
import { Container, Header, Item, Text, Label, Input, Form, Content, Button } from 'native-base'
import * as firebase from 'firebase'

import Logo from './Logo'

const apiURL = 'https://road-rewards-1.herokuapp.com/users/'

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }
  logIn = (email, password) => {
    try {
      if (this.state.password.length < 8) {
        alert('Password must be at least 8 characters long.')
        return
      } 
      firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
        var errorCode = error.code
        var errorMessage = error.message
        console.log('ERRORCODE', errorCode, 'ERRORMESSAGE', errorMessage)
      })
    }
    catch (error) {
      console.log(error.toString())
    }
  }
  goToDash = () => {
    Actions.dash()
  }
  render() {
      return (
        <Container>
          <Header />
          <Container>
            <Form>
              <Item floatingLabel>
                <Label>Email</Label>
                <Input 
                onChangeText={(email) => this.setState({email})}/>
              </Item>
              <Item floatingLabel last>
                <Label>Password</Label>
                <Input 
                onChangeText={(password) => this.setState({password})}
                secureTextEntry={true} />
              </Item>
              <Button full bordered success
              onPress={() => this.logIn(this.state.email, this.state.password)}
              style={styles.button}
              >
                <Text>Login</Text>
              </Button>
            </Form>
          </Container>
          <Logo />
        </Container>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 12,
    // marginLeft: 16,
  },
})
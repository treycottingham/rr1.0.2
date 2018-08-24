import React from 'react'
import { StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Container, Item, Content, Label, Input, Form, Button, Text } from 'native-base'
import * as firebase from 'firebase'

import Logo from './Logo'
import Feedback from './Feedback'

const apiURL = 'https://road-rewards-1.herokuapp.com/users/'

export default class SignUpAuth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pointTotal: 25,
      email: '',
      password: '',
      passwordConfirm: ''
    }
  }
  signUp = (email, password) => {
    try {
      if (this.state.password.length < 8) {
        alert('Password must be at least 8 characters')
        return
      } else if (this.state.password !== this.state.passwordConfirm) {
        alert('Passwords must match')
        return
      }
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => this.createUser(this.state))
    } catch (error) {console.log(error.toString())}
  }
  createUser = (data) => {
    let infoLog = {
      email: data.email,
      pointTotal: data.pointTotal
    }
    fetch(apiURL, {
      method: 'POST',
      body: JSON.stringify(infoLog),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(() => {
      this.goToDash()
    })
    .catch(function (error) {console.log('ERROR IN CREATEUSER', error)})
  }
  logIn = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {this.goToDash()})
  }
  goToDash = () => {
    Actions.dash()
  }  
  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input 
              onChangeText={(email) => this.setState({email})}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input 
              onChangeText={(password) => this.setState({password})}
              secureTextEntry={true} />
            </Item>
            {this.props.passwordConfirm && <Item floatingLabel last>
              <Label>Confirm Password</Label>
              <Input 
              onChangeText={(passwordConfirm) => this.setState({passwordConfirm})}
              secureTextEntry={true} />
            </Item>}
            {this.props.passwordConfirm && <Button bordered success
            style={styles.button}
            onPress={() => this.signUp(this.state.email, this.state.password)}>
              <Text>Sign Up</Text>
            </Button>}
            {this.props.passwordConfirm ? null : <Button bordered success
            style={styles.button}
            onPress={() => this.logIn(this.state.email, this.state.password)}>
              <Text>Log In</Text>
            </Button>}
          </Form>
        </Content>
        <Feedback />
        <Logo />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 6,
    marginLeft: 16,
  },
})
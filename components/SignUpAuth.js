import React from 'react'
import { StyleSheet, View, TouchableHighlight } from 'react-native'
import { Actions, ActionConst } from 'react-native-router-flux'
import { Container, Header, Title, Item, Content, Label, Input, Form, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base'
import * as firebase from 'firebase'

import Logo from './Logo'
import Feedback from './Feedback'

const apiURL = 'https://road-rewards-1.herokuapp.com/users/'

export default class SignUpAuth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pointTotal: 0,
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
    } catch (error) {
      console.log(error.toString())
    }
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
    .catch(function (error) {
      console.log('ERROR IN CREATEUSER', error)
    })
  }
  logIn = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => this.getUser(email))
  }
  getUser = (email) => {
    fetch(apiURL)
      .then(response => response.json())
      .then(data => data.users.filter(
        user => user.email === email
      ))
      .then(() => {
        this.goToDash()
      })
  }
  goToDash = () => {
    Actions.dash()
  }  
  render() {
    return (
      <Container>
        {/* <Header /> */}
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
  page: {
    flex: 1,
    position: 'absolute',
    bottom: 400,  //this is how to align vertically
  },
  signupButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '25%',
    marginLeft: '25%',
    marginTop: '1%',
    backgroundColor:'blue',
    borderRadius: 5,
    borderWidth: 0,
    borderColor: '#fff',
    width: '50%',
    height: '30%',
  },
  input: {
    color: 'blue',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 50,
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
})
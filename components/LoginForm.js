import React from 'react'
import { StyleSheet, View, TouchableHighlight } from 'react-native'
// import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
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
      // firebase.auth().signInWithEmailAndPassword(email, password).then(() => this.goToDash(this.state))
      firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
        var errorCode = error.code
        var errorMessage = error.message
        console.log('ERRORCODE', errorCode, 'ERRORMESSAGE', errorMessage)
      })
      // sign in vs sign up
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

// const styles = StyleSheet.create({
//   page: {
//     flex: 1,
//     position: 'absolute',
//     // bottom: 475,  //this is how to align vertically
//   },
//   loginButton:{
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: '25%',
//     marginLeft: '25%',
//     marginTop: '2%',
//     backgroundColor:'green',
//     borderRadius: 5,
//     borderWidth: 0,
//     borderColor: '#fff',
//     width: '50%',
//     height: '30%',
//   },
//   signupButton: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: '25%',
//     marginLeft: '25%',
//     marginTop: '1%',
//     backgroundColor:'blue',
//     borderRadius: 5,
//     borderWidth: 0,
//     borderColor: '#fff',
//     width: '50%',
//     height: '30%',
//   },
//   input: {
//     color: 'blue',
//   },
//   buttonText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
// })

// <Container style={styles.page}>
//   <FormLabel>
//     <Text>Username</Text>
//     <FormInput placeholder='Username'
//     style={styles.input}/>
//     <Text>Password</Text>
//     <FormInput placeholder='Password'
//     style={styles.input}/>
//   </FormLabel>
//   <TouchableHighlight 
//   style={styles.loginButton}
//   title='Log In'
//   onPress={this.logIn}
//   >
//     <Text style={styles.buttonText}>Login</Text>
//   </TouchableHighlight>
//   <TouchableHighlight 
//   style={styles.signupButton}
//   title='Sign Up'
//   onPress={this.signUp}
//   >
//     <Text style={styles.buttonText}>Sign Up</Text>
//   </TouchableHighlight>
// </Container>
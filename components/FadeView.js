import React from 'react'
import { Animated, View } from 'react-native'
import { Container, Form, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base'
import { Actions, ActionConst } from 'react-native-router-flux'

import FadeLogo from './FadeLogo'

class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }
  componentDidMount() {
    this.fadeIn()
  }
  fadeIn = () => {
    Animated.timing( // Animate over time
      this.state.fadeAnim, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 5000, // Make it take a while
      }
    ).start()
  }
  fadeOut = () => {
    Animated.timing(
      this.state.fadeAnim, {
        toValue: 0,
        duration: 5000,
      }
    ).start()
  }
  logInButton = () => {
    console.log('login')
    Actions.login()
  }
  signUpButton = () => {
    console.log('signup')
    Actions.signup()
  }
  render() {
    let { fadeAnim } = this.state

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    )
  }
}

export default class App extends React.Component {
  render() {
    return (
        <FadeInView >
          <FadeLogo />
        </FadeInView>
    )
  }
}

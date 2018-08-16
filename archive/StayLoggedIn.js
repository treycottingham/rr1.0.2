import React from 'react'
import { Container, Text } from 'native-base'
import * as firebase from 'firebase'

import FadeView from './FadeView'

export default class StayLoggedIn extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      authenticated: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loading: false, authenticated: true })
      } else {
        this.setState({ loading: false, authenticated: false })
      }
    })
  }

  render() {
    if (this.state.loading) // Render loading/splash screen etc
      <FadeView />
    if (!this.state.authenticated) {
      return <Container><Text>Not Authenticated</Text></Container>
    }

    return <Container><Text>Home Screen</Text></Container>
  }
}
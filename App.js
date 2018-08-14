import React from 'react'
import { Router, Stack, Scene, ActionConst } from 'react-native-router-flux'

import Landing from './components/Landing'
import Dashboard from './components/Dashboard'
import SignUp from './components/SignUp'
import LoginForm from './components/LoginForm'
import FadeView from './components/FadeView'
import SignUpAuth from './components/SignUpAuth'
import Geolocation from './components/Geolocation'
import GeoAndMoments from './components/GeoAndMoments'

import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyA2seVYrVMi-IW0MHISxmRFrdhxHHS6MH4",
  authDomain: "road-rewards-with-auth.firebaseapp.com",
  databaseURL: "https://road-rewards-with-auth.firebaseio.com",
  projectId: "road-rewards-with-auth",
  storageBucket: "",
}

firebase.initializeApp(firebaseConfig)


export default class App extends React.Component {
  render() {
    return (
      <Router>        
        <Stack key="root">
          {/* <Scene hideNavBar={true} key="landing" component={Landing} /> */}
          {/* <Scene hideNavBar={true} key="login" component={SignUpAuth} /> */}
          <Scene hideNavBar={true} key="dash" component={GeoAndMoments} />
        </Stack>
      </Router>
    )
  }
}
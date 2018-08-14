import React from 'react'
import { Router, Stack, Scene, ActionConst } from 'react-native-router-flux'

import Landing from './components/Landing'
import SignUpAuth from './components/SignUpAuth'
import GeoAndMoments from './components/GeoAndMoments'
import Account from './components/Account'
import Redeem from './components/Redeem'
import StayLoggedIn from './components/StayLoggedIn'


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
          <Scene key="landing" component={Landing} />
          <Scene key="login" component={SignUpAuth} />
          <Scene key="dash" component={Account} />
          <Scene key="generator" component={GeoAndMoments} />
          <Scene key="redeem" component={Redeem} />
          {/* <Scene hideNavBar={true} key="landing" component={StayLoggedIn} />   */}
          {/* hideNavBar={true} */}
        </Stack>
      </Router>
    )
  }
}
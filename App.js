import React from 'react'
import { Router, Stack, Scene, Actions, ActionConst } from 'react-native-router-flux'
import * as firebase from 'firebase'

import LoadIn from './components/LoadIn'
import Landing from './components/Landing'
import SignUpAuth from './components/SignUpAuth'
import Account from './components/Account'
import GeoAndMoments from './components/GeoAndMoments'
import Redeem from './components/Redeem'

const firebaseConfig = {
  apiKey: 'AIzaSyA2seVYrVMi-IW0MHISxmRFrdhxHHS6MH4',
  authDomain: 'road-rewards-with-auth.firebaseapp.com',
  databaseURL: 'https://road-rewards-with-auth.firebaseio.com',
  projectId: 'road-rewards-with-auth',
  storageBucket: '',
}

firebase.initializeApp(firebaseConfig)

export default class App extends React.Component {
  signOut() {
    firebase.auth().signOut().then(Actions.landing())
  }
  render() {
    return (
      <Router>        
        <Stack key='root'>
          <Scene 
            key='/' 
            initial
            hideNavBar={true} 
            component={LoadIn} />
          <Scene 
            key='landing' 
            hideNavBar={true} 
            component={Landing} />
          <Scene 
            key='login'
            title='v1.0.6' 
            component={SignUpAuth} />
          <Scene 
            key='dash' 
            component={Account} 
            title='v1.0.6'
            onRight={() => this.signOut()}
            rightTitle='Sign Out'
            />
          <Scene 
            key='generator'
            component={GeoAndMoments}
            title='v1.0.6'
            onRight={() => this.signOut()}
            rightTitle='Sign Out'
            />
          <Scene 
            key='redeem' 
            component={Redeem} 
            title='v1.0.6'
            onRight={() => this.signOut()}
            rightTitle='Sign Out'
            />
        </Stack>
      </Router>
    )
  }
}
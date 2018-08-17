import React from 'react'
import { StyleSheet, Image } from 'react-native'

export default class Logo extends React.Component {
  render() {
    return (
      <Image
        source={require('../public/rrlogo.png')}
        style={styles.image}
        ></Image>
    )
  }
}

const styles = StyleSheet.create({
    image: {
      width: 100,
      height: 50,
      position: 'absolute',
      bottom: 8,
      right: 8,
    },
  }
)
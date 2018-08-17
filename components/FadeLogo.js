import React from 'react'
import { StyleSheet, Image } from 'react-native'

export default class Logo extends React.Component {
  render() {
    return (
      <Image
        source={require('../public/rrlogo.png')}
        style={styles.image}
      >
      </Image>
    )
  }
}

const styles = StyleSheet.create({
    image: {
      width: 350,
      height: 200,
    },
  }
)
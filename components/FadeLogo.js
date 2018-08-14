import React from 'react'
import { StyleSheet, Image, ImageBackground } from 'react-native'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';



export default class Logo extends React.Component {
  render() {
    return (
      <Image
        source={require('../rrlogo.png')}
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
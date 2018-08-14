import React from 'react'
import { StyleSheet, Image, ImageBackground } from 'react-native'
import LoginForm from './LoginForm'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';



export default class Logo extends React.Component {
  render() {
    return (
      <Image
        source={require('../rrlogo.png')}
        style={styles.image}
        ></Image>
    )
  }
}

const styles = StyleSheet.create({
    image: {
      width: 100,
      height: 50,
      position: "absolute",
      bottom: 8,
      right: 8,
    },
  }
)
import React from 'react'
import { StyleSheet, Image, ImageBackground, Modal } from 'react-native'
import { Container, Form, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, View, Input } from 'native-base'
import { Actions, ActionConst } from 'react-native-router-flux'

const apiURL = 'https://feedback-database-alpha.herokuapp.com/'

export default class Landing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      text: '',
    }
  }
  showModal = () => {
    this.setState({modalVisible : true})
  }
  submitFeedback = (text) => {
    let feedback = {text}
    fetch(apiURL, {
      method: 'POST',
      body: JSON.stringify(feedback),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(() => {
      alert('Thank you for your feedback.')
    })
    .then(this.setState({modalVisible : false}))
  }
    render() {
      return (
        <View>
          {this.state.modalVisible && 
          <Modal
          animationType="slide"
          transparent={false}
          onRequestClose={() => {
            alert('Modal has been closed.')
          }}>
            <Content style={{marginTop : '70%'}}>
              <Text style={styles.spaced}>Feedback</Text>
              <View style={{marginBottom : '10%'}}>
                <Input placeholderTextColor='white' placeholder='Tap here to enter text' style={{backgroundColor : 'gray'}} onChangeText={(text) => this.setState({text})}></Input>
              </View>
              <Button success onPress={() => this.submitFeedback(this.state.text)}>
                <Text>Submit</Text>
              </Button>
            </Content>
          </Modal>}
          <Button style={styles.feedbackButton} success onPress={() => this.showModal()}><Text>Submit Feedback</Text></Button>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '30%',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  bigText: {
    marginTop: 6,
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'TrebuchetMS',
  },
  button: {
    width: '100%',
  },
  spaced: {
    marginBottom: '3%',
    fontSize: 25,
    fontFamily: 'TrebuchetMS',
  },
  image: {
    width: 100,
    height: 50,
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  feedbackButton: {
    position: 'absolute',
    bottom: 8,
    left: 8,
  }
})
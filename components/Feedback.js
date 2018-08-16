import React from 'react'
import { StyleSheet, Modal } from 'react-native'
import { Content, Button, Text, View, Input } from 'native-base'

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
            <Content style={styles.content}>
              <Text style={styles.spaced}>Feedback</Text>
              <View style={styles.view}>
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
  content: {
    marginTop: '70%',
  },
  spaced: {
    marginBottom: '3%',
    fontSize: 25,
    fontFamily: 'TrebuchetMS',
  },
  view: {
    marginBottom: '10%',
  },
  feedbackButton: {
    position: 'absolute',
    bottom: 8,
    left: 8,
  }
})
import React from 'react'
import { View, Text } from 'react-native'


export default class Interval extends React.Component {
  constructor(props){
    super(props)
    this.state = {currentCount: 0}
  }
  timer() {
    this.setState({
      currentCount: this.state.currentCount + 1
    })
    if(this.state.currentCount > 60) { 
      clearInterval(this.intervalId)
    }
  }
  componentDidMount() {
    this.intervalId = setInterval(this.timer.bind(this), 1000)
  }
  componentWillUnmount(){
    clearInterval(this.intervalId)
  }
  render() {
    return(
      <View style={{position: 'absolute', marginTop: '20%'}}>
        <Text>{this.state.currentCount}</Text>
      </View>
    )
  }
}
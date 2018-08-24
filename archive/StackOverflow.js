export default class GeoAndMoments extends React.Component {
  constructor(props) {
    super(props)
    this.didMount = false
    this.state = {
      startingMoment: moment(),
      speed: 0,
      currentMoment: 0,
      storedPoints: 0,
      counter: 0,
      pointTotal: 0,
      isLoaded: false,
      isShown: false, //delete this for production
    }
  }
  componentDidMount() {
    this.setState({isLoaded: true})
    this.didMount = true
  }
  componentWillUnmount() {
    clearInterval(this.intervalId)
    this.didMount = false
  }
  timer() {
    this.setState({
      counter: moment().diff(this.state.startingMoment, 'minutes'),
      storedAndCounter: moment().diff(this.state.startingMoment, 'minutes') + this.state.storedPoints,
    })
    if(this.state.counter >= 1) {
      this.updatePoints() 
    }
  }
  render() {
    if(!this.state.isShown){
      setTimeout(() => {
        this.watchId = navigator.geolocation.watchPosition(
          (position) => {
            if(position.coords.speed >= 10) {
              this.setState({
                speed: position.coords.speed,
                isShown: true,
                startingMoment: moment(),
                counter: moment().diff(this.state.startingMoment, 'minutes')
              })
              this.setState({
                storedAndCounter: moment().diff(this.state.startingMoment, 'minutes') + this.state.storedPoints,
              })
            } else if(position.coords.speed >= 0) {
              this.setState({
                speed: position.coords.speed,
              })
            }
          },
          (error) => this.setState({ error: error.message }),
          { enableHighAccuracy: true, timeout: 21000, maximumAge: 1000, distanceFilter: 10 },
        )
      }, 10000)
      this.intervalId = setInterval(this.timer.bind(this), 60000) && console.log('TIMER INIT')
      clearTimeout()
    }
    return (
      <Container>
        <Container style={styles.whiteBack}>
        <KeepAwake />
        {this.state.isShown ? null : <Text style={styles.bigText}>You currently have {this.state.storedPoints} points.</Text>}
        {this.state.isShown ? null : <Text style={styles.bigText}>Current Speed: {this.state.speed}</Text>}
        {this.state.isShown ? null : <Text style={styles.smallText}>Points will begin to generate when you are moving at least 10MPH, please remember to drive safely.</Text>}
        {this.state.isShown && <Container style={styles.container}>
          <Content>
            {this.state.isLoaded ? <Text style={styles.bigText}>Welcome {this.state.email}</Text> : null}
            <Text
            style={styles.bigText}
            >Points Earned This Trip</Text>
            <ImageBackground
            style={styles.background}
            source={require('../public/odometer.jpg')}
            >
              <Text
              style={styles.spacedText}
              >{this.state.counter}</Text>
            </ImageBackground>
            <Text
            style={styles.bigText}
            >Total Points Earned</Text>
            <ImageBackground
            style={styles.background}
            source={require('../public/odometer.jpg')}
            >
            {this.state.isLoaded ? <Text style={styles.spacedText}>{this.state.storedAndCounter}</Text> : <Text style={styles.spacedText}>Loading...</Text>}
            </ImageBackground>
          </Content>
        </Container>}
        <Logo />
        </Container>
        <Feedback />
      </Container>
    )
  }
}
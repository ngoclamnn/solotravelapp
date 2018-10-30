// Main.js
import React from 'react'
import { StyleSheet, Platform, Image, Button, Text, View } from 'react-native'
import firebase from 'react-native-firebase'
export default class Main extends React.Component {
  state = { currentUser: null }
  handleLogout = () => {
    firebase.auth().signOut().then(function () {
      this.props.navigation.navigate('SignUp')
    }).catch(function (error) {
      this.setState({ errorMessage: error.message })
    });
  }
  render() {
    const { currentUser } = this.state
    return (
      <View style={styles.container}>
        <Text>
          Hi {currentUser && currentUser.email}!
        </Text>
        <Button title="Logout" onPress={this.handleLogout} />
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
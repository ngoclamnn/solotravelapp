// @flow
import React, { Component } from 'react'
import { StyleSheet, Button, Text, View } from 'react-native'
import firebase from 'react-native-firebase'
import ROUTES from 'config/routes'

type State = {
  currentUser: any,
  errorMessage: any
}

export default class Main extends Component<any, State> {
  state = { currentUser: null, errorMessage: null }
  handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        this.props.navigation.navigate(ROUTES.signup.routeName)
      })
      .catch(function (error) {
        this.setState({ errorMessage: error.message })
      })
  }
  render () {
    const { currentUser } = this.state
    return (
      <View style={styles.container}>
        <Text>Hi {currentUser && currentUser.email}!</Text>
        <Button title='Logout' onPress={this.handleLogout} />
        {this.state.errorMessage && <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>}
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

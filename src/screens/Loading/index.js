// @flow
import React, { Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'react-native-firebase'

type Props = {
  navigation: any
}

export default class Loading extends Component<Props> {
  render () {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size='large' />
      </View>
    )
  }
  componentDidMount () {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Main' : 'SignUp')
    })
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

// @flow
import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import firebase from 'react-native-firebase'
import ROUTES from 'config/routes'
import { GoogleSignin } from 'react-native-google-signin'


type State = {
  email: string,
  password: string,
  errorMessage: any
}

export default class SignUp extends Component<any, State> {
  state = { email: '', password: '', errorMessage: null }
  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then()
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  facebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      if (result.isCancelled) {
        throw new Error('User cancelled request') // Handle this however fits the flow of your app
      }
      // get the access token
      const data = await AccessToken.getCurrentAccessToken()
      if (!data) {
        throw new Error('Something went wrong obtaining the users access token') // Handle this however fits the flow of your app
      }
      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)

      // login with credential
      const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential)
    } catch (e) {
    }
  }

  googleLogin = async () => {
    try {
      // Add any configuration settings here:
      await GoogleSignin.configure();

      const data = await GoogleSignin.signIn();

      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
      // login with credential
      const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

      console.info(JSON.stringify(currentUser.user.toJSON()));
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        {this.state.errorMessage && <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>}
        <TextInput
          placeholder='Email'
          autoCapitalize='none'
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder='Password'
          autoCapitalize='none'
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title='Sign Up' onPress={this.handleSignUp} />
        <Button title='Continue with Facebook' onPress={this.facebookLogin} />
        <Button title='Continue with Google' onPress={this.googleLogin} />
        <Button
          title='Already have an account? Login'
          onPress={() => this.props.navigation.navigate(ROUTES.login.routeName)}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})

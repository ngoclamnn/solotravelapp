// @flow
import React from 'react'
import { StyleSheet, Platform, Image, Button, Text, View, ActivityIndicator } from 'react-native'
import { GraphRequest, GraphRequestManager, AccessToken } from 'react-native-fbsdk';
import firebase from 'react-native-firebase'

export default class Main extends React.Component {
  state = { currentUser: null, userData: null }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    console.log("Main Component", currentUser)
    this.setState({ currentUser })
    console.log(currentUser.providerId)
    if (currentUser.providerData[0].providerId === 'facebook.com') {
      this.FBGraphRequest('id, email, picture.type(large)', this.FBLoginCallback);
    }
    else {
      this.setState({
        userData: { photoURL: currentUser.photoURL }
      });
    }
  }

  async FBGraphRequest(fields, callback) {
    const accessData = await AccessToken.getCurrentAccessToken();
    // Create a graph request asking for user information
    const infoRequest = new GraphRequest('/me', {
      accessToken: accessData.accessToken,
      parameters: {
        fields: {
          string: fields
        }
      }
    }, callback.bind(this));
    // Execute the graph request created above
    new GraphRequestManager().addRequest(infoRequest).start();
  }
  async FBLoginCallback(error, result) {
    if (error) {
      console.log(error)
      this.setState({
        errorMessage: error
      });
    } else {
      console.log(result)
      this.setState({
        userData: { photoURL: result.picture.data.url }
      });
    }
  }

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

  render() {
    const { currentUser, userData } = this.state
    console.log('Main', this.state)
    return (

      <View style={styles.container}>
        {!this.state.currentUser || !this.state.userData &&
          <View>
            <Text>Loading</Text>
            <ActivityIndicator size='large' />
          </View>
        }
        {this.state.currentUser && this.state.userData &&
          <View>
            < Image style={{ width: 200, height: 200 }} source={{ uri: userData.photoURL }} />
            <Text>
              Hi {currentUser && currentUser.email}!
        </Text>
            <Button title='Logout' onPress={this.handleLogout} />
          </View>
        }
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

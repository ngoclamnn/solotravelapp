// @flow
import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import firebase from 'react-native-firebase'
import FirebaseChat from 'config/firebasechat';

type Props = {
  name?: string,
};

class Chat extends React.Component<Props> {

  static navigationOptions = ({ navigation }) => ({
    title: 'Chat!',
  });

  state = {
    messages: [],
  };
  get firebaseChat() { return new FirebaseChat() }
  get user() {
    const { currentUser } = firebase.auth()
    console.log("Chat", currentUser)
    return {
      name: currentUser.email,
      _id: this.firebaseChat.uid,
    };
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.firebaseChat.send}
        user={this.user}
      />
    );
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    console.log("Chat666", currentUser)
    this.setState({ currentUser: currentUser })
    this.firebaseChat.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    this.firebaseChat.off();
  }
}

export default Chat;

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

  get user() {
    const { currentUser } = firebase.auth()
    console.log("Chat", currentUser)
    return {
      name: currentUser.email,
      _id: FirebaseChat.shared.uid,
    };
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={FirebaseChat.shared.send}
        user={this.user}
      />
    );
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser: currentUser })
    FirebaseChat.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    FirebaseChat.shared.off();
  }
}

export default Chat;

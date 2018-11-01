
import firebase from 'react-native-firebase'
class FirebaseChat {
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    const database = firebase.database().ref('messages')
    return database;
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  on = callback => {
    const query = this.ref
      .limitToLast(20).on('value', snapshot => console.log(snapshot))
    console.log(callback)
    //query.on('child_added', snapshot => console.log(snapshot));
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  append = message => this.ref.push(message);

  // close the connection to the Backend
  off() {
    this.ref.off();
  }
}
export default FirebaseChat;

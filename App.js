import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const  Profile = [
  {id: "1", name: "Cant Handle these lips", uri: require('./assets/ahungrydoor.jpg')},
  {id: "2", name: "Ariel", uri: require('./assets/aquaman.jpg')},
  {id: "3", name: "Larry L. Legs", uri: require('./assets/asianspiderman.jpg'),},
  {id: "4", name: "Mr. Nibbles", uri: require('./assets/EX-istencialcrisis.jpg')}
]

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

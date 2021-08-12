import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Button, Alert } from 'react-native';

// AWS Amplify Setup
import Amplify from 'aws-amplify'
import config from './src/aws-exports'
Amplify.configure(config);

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>New Rubbish App!</Text>
      <Button
      title='Login'
      onPress={() =>
      Alert.prompt('You want to login!', 'Okay', text => console.log(text))} />
      <Button
      title='Logout'
      onPress={() =>
      Alert.prompt('You want to logout!', 'Okay', text => console.log(text))} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

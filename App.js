import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';


// AWS Amplify Setup
import Amplify from 'aws-amplify'
import config from './src/aws-exports'
import Login from './src/components/authentication/Login.jsx';
Amplify.configure(config);

export default function App() {
  return (
    <Login />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

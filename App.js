import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// AWS Amplify Setup
import Amplify from 'aws-amplify'
import config from './src/aws-exports'
import Login from './src/components/authentication/Login.jsx';
import Signup from './src/components/authentication/Signup.jsx';
import OrganizerDash from './src/components/dashboards/OrganizerDash.jsx';
import VolunteerDash from './src/components/dashboards/VolunteerDash.jsx';
import CreateEvent from './src/components/events/CreateEvent.jsx';
import EventList from './src/components/events/EventList.jsx';

Amplify.configure(config);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login}></Stack.Screen>
        <Stack.Screen name='Signup' component={Signup}></Stack.Screen>
        <Stack.Screen name='Organizer' component={OrganizerDash}></Stack.Screen>
        <Stack.Screen name='Volunteer' component={VolunteerDash}></Stack.Screen>
        <Stack.Screen name='Create Event' component={CreateEvent}></Stack.Screen>
        <Stack.Screen name='Event List' component={EventList}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

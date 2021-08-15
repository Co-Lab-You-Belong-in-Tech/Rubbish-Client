import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// AWS Amplify Setup
import Amplify, { API, Auth } from 'aws-amplify'
import config from './src/aws-exports'
// import { withAuthenticator } from 'aws-amplify-react-native'

import Login from './src/components/authentication/Login.jsx';
import Signup from './src/components/authentication/Signup.jsx';
import OrganizerDash from './src/components/dashboards/OrganizerDash.jsx';
import VolunteerDash from './src/components/dashboards/VolunteerDash.jsx';
import CreateEvent from './src/components/events/CreateEvent.jsx';

Amplify.configure(config);
Amplify.configure({
  // OPTIONAL - if your API requires authentication 
  Auth: {
      // REQUIRED - Amazon Cognito Identity Pool ID
      identityPoolId: 'us-east-2:60f7c5c7-8f2b-4cb9-917e-130446db2320',
      // REQUIRED - Amazon Cognito Region
      region: 'us-east-2', 
      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: 'us-east-2_Y4oQoIAyL', 
      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: '7g3vhllj55p44uirbi1i635ujr',
  },
  API: {
      endpoints: [
          {
              name: "rubbishAccessAPI",
              endpoint: " https://275d2z0p3f.execute-api.us-east-2.amazonaws.com/dev",
              custom_header: async () => { 
                return { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` };
              }
          },
          {
              name: "AdminQueries",
              endpoint: "https://fw1xdq5lt9.execute-api.us-east-2.amazonaws.com/dev",
              custom_header: async () => { 
                return { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` };
              }

          }
      ]
  }
});

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login}></Stack.Screen>
        <Stack.Screen name='Signup' component={Signup}></Stack.Screen>
        <Stack.Screen name='Organizer' component={OrganizerDash}></Stack.Screen>
        <Stack.Screen name='Volunteer' component={VolunteerDash}></Stack.Screen>
        <Stack.Screen name='Create Event' component={CreateEvent}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  ); 
};

//export default withAuthenticator(App);
export default App;
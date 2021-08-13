import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Switch, TextInput, Alert, TouchableOpacity } from 'react-native';


export default function Signup() {
    const [password, onChangePassword] = useState('');
    const [email, onChangeEmail] = useState('');
    const [username, onChangeUsername] = useState('');
    const [location, onChangeLocation] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const toggleChecked = () => setIsChecked(previousState => !previousState);

    return (
        <SafeAreaView style={styles.container}>
            
            <Text>Signup Rubbish Mobile App</Text>
            <Text>Volunteer?</Text>
            <Text>Organizer?</Text>
            <View>
                <Switch 
                trackColor={{ false: "#000000", true: "#ffffff" }}
                thumbColor={isChecked ? "#000000" : "#ff0000"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleChecked}
                value={isChecked}
                />
            </View>
            
            <TextInput 
                style={styles.input}
                placeholder='Username'
                placeholderTextColor='white'
                onChangeText={onChangeUsername}
                value={username} />

            <TextInput 
                style={styles.input}
                placeholder='Location'
                placeholderTextColor='white'
                onChangeText={onChangeLocation}
                value={location} />

            <TextInput 
                style={styles.input}
                placeholder='Email'
                placeholderTextColor='white'
                onChangeText={onChangeEmail}
                value={email} />

            <TextInput 
                style={styles.input}
                placeholder='Password'
                placeholderTextColor='white'
                onChangeText={onChangePassword}
                value={password} />
            
            <TouchableOpacity 
                style = {styles.signupButton}
                onPress = {() =>
                    Alert.prompt('You want to signup!', 'Okay', text => console.log(text))}>
                <Text style = {styles.signupButtonText}>Signup</Text>
            </TouchableOpacity>
            <Image source={{
                width: 50,
                height: 50,
                uri: "https://picsum.photos/25/25"
            }} />

            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        margin: 15,
        height: 40,
        width: 175,
        borderColor: '#fff',
        borderWidth: 1
    },
    loginButton: {
        backgroundColor: '#A9A9A9',
        padding: 10,
        margin: 15,
        height: 40,
        width: 175,
    },
    loginButtonText: {
        color: 'white',
    },
    signupButton: {
        backgroundColor: '#A9A9A9',
        padding: 10,
        margin: 15,
        height: 40,
        width: 175,
    },
    signupButtonText: {
        color: 'white'
    },
});
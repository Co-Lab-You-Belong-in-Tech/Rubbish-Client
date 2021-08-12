import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Button, Alert, TouchableOpacity } from 'react-native';


export default function Login() {
    const [password, setPassword] = useState('');

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    return (
        <SafeAreaView style={styles.container}>
            <Image source={{
                width: 100,
                height: 100,
                uri: "https://picsum.photos/100/100"
            }} />

            <Text>Rubbish Mobile App New</Text>

            <TextInput style={styles.input}
                placeholder='Password'
                placeholderTextColor='white'
                onChangeText={handlePasswordChange} />
            <TouchableOpacity 
                style = {styles.loginButton}
                onPress = {() =>
                    Alert.prompt('You want to login!', 'Okay', text => console.log(text))}>
                <Text style = {styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style = {styles.signupButton}
                onPress = {() =>
                    Alert.prompt('You want to signup!', 'Okay', text => console.log(text))}>
                <Text style = {styles.signupButtonText}>Signup</Text>
            </TouchableOpacity>

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
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
        width: 175,
    },
    loginButtonText: {
        color: 'white'
    },
    signupButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
        width: 175,
    },
    signupButtonText: {
        color: 'white'
    },
});

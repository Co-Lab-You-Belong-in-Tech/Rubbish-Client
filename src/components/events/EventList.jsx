import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Switch, TextInput, TouchableOpacity } from 'react-native';

export default function EventList({ navigation }) {
    return (
        <SafeAreaView>
            <Text>Events</Text>
            {/* <TouchableOpacity 
                style = {styles.button}
                onPress = {() => navigation.navigate('Signup')}>
                <Text style = {styles.buttonText}>Explore</Text>
            </TouchableOpacity> */}

            <TouchableOpacity 
                style = {styles.button}
                onPress = {() => navigation.navigate('Create Event')}>
                <Text style = {styles.buttonText}>Create</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#A9A9A9',
        padding: 10,
        margin: 15,
        height: 40,
        width: 175,
    },
    buttonText: {
        color: 'white'
    }
});

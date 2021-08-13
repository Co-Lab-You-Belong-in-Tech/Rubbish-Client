import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Alert, TouchableOpacity } from 'react-native';

export default function CreateEvent() {
    return (
        <SafeAreaView>
            <Text>Create a cleanup event</Text>

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
});
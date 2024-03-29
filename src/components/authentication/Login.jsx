import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import { Auth, API } from 'aws-amplify';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginStatus: 0,
            opLog: '',
            username: '',
            password: '',
            user: null
        }
    }
    
    onChangeUsername = (text) => {
        this.setState({ username: text })
    }

    onChangePassword = (text) => {
        this.setState({ password: text })
    }

    async componentDidMount() {
        try {
            const currentUser = await Auth.currentAuthenticatedUser();
            // console.log(currentUser);
            if(currentUser && currentUser.username)
                this.setState({user: currentUser, loginStatus: 1}); 
        } catch (err) {
            console.log(err);
        } 
    }

    async signIn(username, password) {
        if (!username || !password) {
            this.setState({opLog: 'Please enter a valid input.'})
            return;
        }
    
        console.log(`Try signing: username ${username}, password ${password}`);
        
        const user = await Auth.signIn(username, password)
            .catch(e => {
                console.log('error signing in', e);
                this.setState({opLog: e.message});
            });
        console.log(user);
        if (user && user.username) {
            this.setState({opLog: '', user: user, loginStatus: 1});
        }
    }

    async signOut() {
        try {
            await Auth.signOut();
            this.setState({opLog: '', user : null, loginStatus: 0});
        } catch (error) {
            console.log('error signing out: ', error);
            this.setState({opLog: e.message});
        }
    }

    render() {
        const { loginStatus, opLog, username, password, user } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <Image source={{
                    width: 100,
                    height: 100,
                    uri: "https://picsum.photos/100/100"
                }} />
    
                <Text>Rubbish Mobile App</Text>
    
                <TextInput 
                    style={styles.input}
                    placeholder='Email/User Name'
                    placeholderTextColor='white'
                    onChangeText={this.onChangeUsername}
                    value={username}/>
    
                <TextInput 
                    style={styles.input}
                    placeholder='Password'
                    placeholderTextColor='white'
                    onChangeText={this.onChangePassword}
                    value={password}/>

                <Text> {opLog} </Text>

                <TouchableOpacity 
                    style = {styles.loginButton}
                    onPress = {() => loginStatus ? this.signOut() : this.signIn(username, password)}>
                    <Text style = {styles.loginButtonText}>{loginStatus? "Logoff" : "Login"}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style = {styles.signupButton}
                    onPress = {() => this.props.navigation.navigate('Organizer')}>
                    <Text style = {styles.signupButtonText}>Login with Google</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style = {styles.signupButton}
                    onPress = {() => this.props.navigation.navigate('Signup')}>
                    <Text style = {styles.signupButtonText}>Signup</Text>
                </TouchableOpacity>
    
                <TestPanle userSession={user}/>

                <StatusBar style="auto" />
            </SafeAreaView>
        );
    }
}

class TestPanle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: ''
        }
        
        this.query = '/api';
        this.requestBody = '';
    }

    async ApiGet (entry) {
        const apiName = 'rubbishAccessAPI';
        const path = entry;
        const init = { 
          headers: { 
            //Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
          }
        };
    
        return await API.get(apiName, path, init)
            .then(response => {
                console.log(response);
                this.setState({response: JSON.stringify(response)})
            })
            .catch(error => {
                console.log(error);
                if (error.response)
                    this.setState({response: error.response.data.message})
                else this.setState({response: error.message})
            });
    }

    async ApiPost (entry, requestBody) {
        const apiName = 'rubbishAccessAPI';
        const path = entry;
        const init = { 
            body: {}  // TODO: replace body here
        };
    
        return await API.post(apiName, path, init)
            .then(response => {
                console.log(response);
                this.setState({response: JSON.stringify(response)})
            })
            .catch(error => {
                console.log(error);
                if (error.response)
                    this.setState({response: error.response.data.message})
                else this.setState({response: error.message})
            });
    }

    async ApiPut (entry, requestBody) {
        const apiName = 'rubbishAccessAPI';
        const path = entry;
        const init = { 
            body: {} // TODO: replace body here
        };
    
        return await API.put(apiName, path, init)
            .then(response => {
                console.log(response);
                this.setState({response: JSON.stringify(response)})
            })
            .catch(error => {
                console.log(error);
                if (error.response)
                    this.setState({response: error.response.data.message})
                else this.setState({response: error.message})
            });
    }

    async ApiDelete (entry) {
        const apiName = 'rubbishAccessAPI';
        const path = entry;
        const init = { 
          headers: { 
            //Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
          }
        };
    
        return await API.del(apiName, path, init)
            .then(response => {
                console.log(response);
                this.setState({response: JSON.stringify(response)})
            })
            .catch(error => {
                console.log(error.response);
                if (error.response)
                    this.setState({response: error.response.data.message})
                else this.setState({response: error.message})
            });
    }

    onChangeQuery = (text) => {
        this.query = '/api' + text;
    }

    onChangeRequestBody = (text) => {
        this.requestBody = text;
    }

    componentDidUpdate = () => {
        if (!this.props.userSession) {
            this.query = '/api';
            this.requestBody = '';
        }
    }

    render() {
        const { response } = this.state;
        const user = this.props.userSession;
        if (user) {
            return (
                <View>
                    <View style = {{alignItems: 'center',justifyContent: 'center'}}>
                        {/* Use {"\n"} to start a new line because <br/> is not native supported on Android. */}
                        <Text> 
                            {"\n"} 
                            Successfully logged in. 
                            Current Session:
                            {"\n"}
                        </Text>
                        <View>
                            <Text> 
                                <Text style={{fontWeight: 'bold'}}>Username </Text> {user.username} {"\n"}
                                <Text style={{fontWeight: 'bold'}}>Email          </Text> {user.attributes.email} {"\n"}
                                <Text style={{fontWeight: 'bold'}}>userPoolId</Text> {user.pool.userPoolId} {"\n"}
                            </Text>
                        </View> 
                        <Text style={{ fontSize: 20, fontWeight: 'bold'}}>API test field:</Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold'}}>Response Area:</Text>
                        <Text> {response} {"\n"} </Text>
                        <Text>Enter path and queries here.</Text>
                        <View style = {{flexDirection:'row', alignItems: 'center',justifyContent: 'center'}}>
                            <Text>/api</Text>
                            <TextInput 
                                style={styles.input}
                                onChangeText={this.onChangeQuery}
                            />
                        </View>
                        

                        <View style = {{flexDirection:'row', flexWrap:'wrap'}}>
                            <TouchableOpacity 
                                style = {styles.button}
                                onPress = {() => 
                                    this.ApiGet(this.query)
                                }>
                                <Text style = {styles.loginButtonText}> Get </Text>
                            </TouchableOpacity> 

                            <TouchableOpacity 
                                style = {styles.button}
                                onPress = {() => 
                                    this.ApiDelete(this.query)
                                }>
                                <Text style = {styles.loginButtonText}> Delete </Text>
                            </TouchableOpacity>
                        </View>

                        <Text>Enter post/put request body here.</Text>
                        
                        <TextInput 
                            style={styles.input}
                            placeholder='{}'
                            placeholderTextColor='white'
                            onChangeText={this.onChangeRequestBody}
                        />

                        <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                            <TouchableOpacity 
                                style = {styles.button}
                                onPress = {() => 
                                    this.ApiPost(this.query, this.requestBody)
                                }>
                                <Text style = {styles.loginButtonText}> Post </Text>
                            </TouchableOpacity> 

                            <TouchableOpacity 
                                style = {styles.button}
                                onPress = {() => 
                                    this.ApiPut(this.query, this.requestBody)
                                }>
                                <Text style = {styles.loginButtonText}> Put </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }
        else return(
            <Text> No user session. </Text>
        )
    }
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
    button: {
        backgroundColor: '#A9A9A9',
        padding: 5,
        margin: 10,
        height: 30,
        width: 80
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

export default Login;
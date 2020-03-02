import React from 'react';
import { StyleSheet, ScrollView, Text, TextInput, View, Button, KeyboardAvoidingView, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Backendless from 'backendless';

///Styling
import { THEME } from '../styles/theme.js';

class LoginScreen extends React.Component {
    static navigationOptions = ({navigation, navigationOptions}) => {
      return {
          title: null,
          headerShown: false
      };
    };

    state = {
        username: '',
        password: ''
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>F-App</Text>
                    <Icon name="face" size={30}></Icon>
                </View>
                <KeyboardAvoidingView behavior='padding'>
                    <View style={styles.inputContainer}>
                        <Text style={styles.loginText}>Email</Text>
                        <TextInput
                            style={styles.loginInput}
                            returnKeyType="next"
                            onChangeText={(username)=>this.setState({username})}
                            value={this.state.username}
                        />
                        <Text style={styles.loginText}>Password</Text>
                        <TextInput
                            style={styles.loginInput}
                            secureTextEntry={true}
                            onChangeText={(password)=>this.setState({password})}
                            value={this.state.password}
                        />
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={() => { this._login(this.state.username, this.state.password, this.props) }}
                        >
                            <Text style={styles.loginText, {color: '#fff'}}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={() => this.props.navigation.navigate("Register") }
                        >
                            <Text style={styles.loginText, {color: '#fff'}}>Register</Text>
                        </TouchableOpacity>
                        {/* <Text style={{color: '#fff'}}>Signup here.</Text> */}
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }

    _login = async(username, password, props) => {
        //Alert("Eat ass");
        Backendless.UserService.login(username, password, true )
        .then( function( loggedInUser ) {
            props.navigation.navigate("Main")
        })
        .catch( function( error ) {
            alert("error message in login - " + error.message );
            alert("error code in login- " + error.code)
            throw error;
        });
    }

}



export default LoginScreen;

const styles = StyleSheet.create({
    container:{
        padding: 40,
        backgroundColor: THEME.background,
        flex: 1
    },
    titleContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
    },
    title:{
        color: THEME.text,
        fontSize: 32,
        fontWeight: 'bold',
    },
    inputContainer:{
        justifyContent: 'center',
    },
    loginText:{
        color: THEME.text,
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 5
    },
    loginInput:{
        height: 40,
        color: THEME.text,
        fontSize: 14,
        fontWeight: '200',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: THEME.border_color
    },
    submitButton:{
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: THEME.button,
        padding: 10,
        marginBottom: 10,
        marginTop: 15
    }
});


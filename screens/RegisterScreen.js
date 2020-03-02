import React from 'react';
import { StyleSheet, ScrollView, Text, TextInput, View, Button, KeyboardAvoidingView, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Backendless from 'backendless';
///Components
import Login from '../src/Login.js';

///Styling
import { THEME } from '../styles/theme.js';

class RegisterScreen extends React.Component {
    static navigationOptions = ({navigation, navigationOptions}) => {
      return {
          title: "Register",
      };
    };

    state = {
        email: '',
        password: '',
        cPassword: '',
        name: '',
        isRegisterError: false,
        err_display: "none",
        err_msg: "#err_text"

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Register</Text>
                </View>
                <KeyboardAvoidingView behavior='padding'>

                    <Text style={{color: '#cc0066', display: this.state.err_display}}>{this.state.err_msg}</Text>


                    <Text style={styles.loginText}>Email</Text>
                    <TextInput
                        style={styles.loginInput}
                        returnKeyType="next"
                        onChangeText={(email)=>this.setState({email})}
                        value={this.state.email}
                    />
                    <Text style={styles.loginText}>Password</Text>
                    <TextInput
                        style={styles.loginInput}
                        returnKeyType="next"
                        secureTextEntry={true}
                        onChangeText={(password)=>this.setState({password})}
                        value={this.state.password}
                    />
                    <Text style={styles.loginText}>Confirm Password</Text>
                    <TextInput
                        style={styles.loginInput}
                        secureTextEntry={true}
                        returnKeyType="next"
                        onChangeText={(cPassword)=>this.setState({cPassword})}
                        value={this.state.cPassword}
                    />
                    <Text style={styles.loginText}>Name</Text>
                    <TextInput
                        style={styles.loginInput}
                        returnKeyType="next"
                        onChangeText={(name)=>this.setState({name})}
                        value={this.state.name}
                    />
                    <TouchableOpacity
                            style={styles.submitButton}
                            onPress={() => { this._register(this.state.email, this.state.password, this.state.cPassword, this.state.name) }}
                        >
                        <Text style={styles.loginText, {color: '#fff'}}>Submit</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        );
    }

    _register = async(email, password, cPassword, name) => {
        if(email === "" && password === "" && name === ""){
            this.setState({ err_display: 'flex'})
            this.setState({ err_msg: '*All fields are required for registration.'})

            return
        }

        if(password != cPassword){
            this.setState({ err_display: 'flex'})
            this.setState({ err_msg: '*Passwords do not match. Try again.'})
            this.setState({password: "", cPassword: ""})

            return
        }

        var user = new Backendless.User();
        user.email = email;
        user.password = password;
        user.name = name;

        // console.log(user);
        Backendless.UserService.register( user )
        .then( function( registeredUser ) {
            alert("user added")
            this.props.navigation.navigate("Login")

        }.bind(this))
        .catch( function( error ) {
            alert("error message in register - " + error.message );
            alert("error code in register- " + error.code)
            throw error;
        });

        //For guest login thhat does not work
        // Backendless.UserService.loginAsGuest()
        // .then( function( loggedInGuestUser ) {
        //     Backendless.UserService.register( user )
        //     .then( function( registeredUser ) {
        //         alert("user added")
        //     })
        //     .catch( function( error ) {
        //         alert("error message in register - " + error.message );
        //         alert("error code in register- " + error.code)
        //         throw error;
        //     });
        // })
        // .catch( function( error ) {

        // });
    }

}



export default RegisterScreen;

const styles = StyleSheet.create({
    container:{
        padding: 40,
        backgroundColor: THEME.background,
        flex: 1
    },
    titleContainer:{
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    title:{
        color: THEME.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputContainer:{
        justifyContent: 'center',
    },
    loginText:{
        color: THEME.text,
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 2
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
        marginBottom: 50,
        marginTop: 15
    }
});


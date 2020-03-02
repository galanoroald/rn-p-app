import React from 'react';
import { StyleSheet, Image, Text, TextInput, View, Button, TouchableOpacity, Dimensions} from 'react-native';
import Backendless from 'backendless';

class AccountScreen extends React.Component {
    static navigationOptions = ({navigation, navigationOptions}) => {
      return {
          title: "Account",
      };

    };

    render() {
        return (
            <View>
                <Text>Account</Text>
                <Text>Settings</Text>
                <View style={{justifyContent: 'center'}}>
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={() => { this._logout(this.props) }}
                    >
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _logout = async(props) => {
        Backendless.UserService.logout()
        .then( function() {
            props.navigation.navigate("Login");
        })
        .catch( function( error ) {
            alert("error message in logout - " + error.message );
            alert("error code in logout- " + error.code)
            throw error;
        });
    }
}

export default AccountScreen;

const styles = StyleSheet.create({
    loginText:{
        width: 100,
        color: '#ffab36',
        fontSize: 14,
        fontWeight: '200',
    },
    submitButton:{
        width: 250,
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#ffba5a',
        padding: 10
    }
});

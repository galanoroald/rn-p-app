import React from 'react';
import { StyleSheet, ScrollView, Text, TextInput, View, Button, KeyboardAvoidingView, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Backendless from 'backendless';
import NumericInput from 'react-native-numeric-input';
///Components
import Login from '../src/Login.js';

///styling
import { THEME } from '../styles/theme.js';

class ReviewScreen extends React.Component {
    static navigationOptions = ({navigation, navigationOptions}) => {
      return {
          title: "Review",
          headerStyle: {
            backgroundColor: navigationOptions.headerTintColor,
          },
          headerTintColor: navigationOptions.headerStyle.backgroundColor,
      };
    };

    state = {
        title: '',
        desc: '',
        rating: 5,
    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView behavior='padding'>
                    <TextInput
                        style={ styles.textInputTitle }
                        returnKeyType="next"
                        placeholder="Title Here"
                        maxLength={80}
                        // onChangeText={}
                        // value={}
                        onChangeText={(title) => this.setState({title})}
                        value={this.state.title}
                    />
                    <TextInput
                        style={styles.textInputBody }
                        returnKeyType="next"
                        placeholder="Body Here"
                        multiline
                        numberOfLines={12}
                        maxLength={255}
                        // onChangeText={}
                        // value={}
                        onChangeText={(desc) => this.setState({desc})}
                        value={this.state.desc}
                    />
                    <Text style={ styles.title }>Rating</Text>
                    <NumericInput
                        value={this.state.rating}
                        onChange={(rating) => this.setState({rating})}
                        minValue={1}
                        maxValue={10}
                        totalWidth={240}
                        totalHeight={50}
                        iconSize={25}
                        step={1}
                        valueType='integer'
                        rounded
                        textColor='#ffcc00'
                        iconStyle={{ color: '#ffcc00' }}
                        rightButtonBackgroundColor='#cc0066'
                        leftButtonBackgroundColor='#cc0066'/>
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={() => { this._createReview(this.state.title, this.state.desc, this.state.rating, this.props) }}
                    >
                        <Text style={{color: '#fff'}}>Submit</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        );
    }

    _createReview = async(title, desc, rating, props) => {
        Backendless.Data.of( "review" ).save( { title: title, description: desc, rating: rating} )
        .then( function( savedObject ) {
            console.log(savedObject);
            props.navigation.navigate("Home")
        })
        .catch( function( error ) {
            alert("error message in create - " + error.message );
            alert("error code in create- " + error.code)
            throw error;
        });
    }

}

export default ReviewScreen;

const styles = StyleSheet.create({
    container:{
        padding: 40,
        backgroundColor: THEME.background,
        flex: 1
    },
    title: {
        fontSize: 20,
        paddingVertical: 10
    },
    textInputTitle:{
        fontSize: 20,
        color: THEME.text,
        fontWeight: '200',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: THEME.border_color
    },
    textInputBody:{
        fontSize: 14,
        color: THEME.text,
        fontWeight: '200',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: THEME.border_color
    },
    submitButton:{
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: THEME.button,
        padding: 10,
        marginBottom: 50,
        marginTop: 15
    }
});


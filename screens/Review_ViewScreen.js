import React from 'react';
import { StyleSheet, Text, Image, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Backendless from 'backendless';
///Component

///styling
import { THEME } from '../styles/theme.js';

class Review_View extends React.Component {
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
        ownerName: ""
    }

    componentDidMount(){
        this._getReviewerName()
    }

    render(){

        var stars = [];

        for (let i = 0; i < this.props.navigation.getParam('rating'); i++) {
            stars.push(<Icon name="star" size={20} color="#fae3d9"></Icon>)
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.navigation.getParam('title')}</Text>
                <Text style={styles.author}>by {this.state.ownerName}</Text>
                <View style={styles.rating}>{ stars }</View>
                <Text style={styles.desc}>{this.props.navigation.getParam('desc')}</Text>
            </View>
        );
    }

    _getReviewerName = async() => {
        Backendless.Data.of( "Users" ).findById(this.props.navigation.getParam('owner'))
        .then( function( result ) {
            this.setState({ownerName: result.name})
        }.bind(this))
        .catch( function( error ) {
            alert("user fetch error message - " + error.message );
            alert("user fetch error code - " + error.code)
            throw error;
        });
    }
}

export default Review_View;

const styles = StyleSheet.create({
    container:{
        padding: 10,
        flex: 1,
        backgroundColor: THEME.background
    },
    title:{
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 5,
        color: THEME.text
    },
    desc:{
        padding: 10,
        marginBottom: 5,
        color: '#000',
        backgroundColor: '#bbded6'
    },
    author:{
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 5,
        color: THEME.text
    },
    rating:{
        justifyContent: "center",
        padding: 5,
        borderRadius: 25,
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: '#bbded6'
    }
});

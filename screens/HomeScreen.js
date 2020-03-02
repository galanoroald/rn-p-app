import React from 'react';
import { StyleSheet, Image, Text, TextInput, View, Button, Dimensions, FlatList} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Shop from '../src/Shop';
import {GameProvider} from '../src/GameContext';
import Backendless from 'backendless';

///Components
import ReviewCard from '../src/ReviewCard';

///styling
import { THEME } from '../styles/theme.js';


class HomeScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
      return {
          title: 'Home',
          // headerRight: () => (
          //   <Button
          //     onPress={navigation.getParam('increaseCount')}
          //     title="+1"
          //     color="#ed8240"
          //   />
          // )
      };

    };

    constructor(props){
      super(props);
      this.state = {
        name: "",
        page: 0,
        DATA:[]
      };
    }

    componentDidMount() {
      this._getUser()

      const { navigation } = this.props;
      this.focusListener = navigation.addListener('didFocus', () => {
        this._getAllReviews()
      });
    }

    componentWillUnmount() {
      // Remove the event listener
      this.focusListener.remove();
    }

    _getUser = async() => {
      Backendless.UserService.getCurrentUser()
      .then( function( currentUser ) {
          // console.log(currentUser);
          this.setState({name: currentUser.name});
          this.setState({credit: currentUser.credit});
      }.bind(this))
      .catch( function ( error ) {
          alert("user fetch error message - " + error.message );
          alert("user fetch error code - " + error.code)
          throw error;
      });
    }

    _getAllReviews = async() => {
      var queryBuilder = Backendless.DataQueryBuilder.create();
      queryBuilder.setSortBy( ["created DESC"] );
      queryBuilder.setPageSize( 100 ).setOffset( 0 );
      Backendless.Data.of( "review" ).find(queryBuilder)
      .then( function( result ) {
        // console.log(result)
        this.setState({DATA: result})
        console.log(this.state.DATA);
      }.bind(this))
      .catch( function( error ) {
        alert("all reviews fetch error message - " + error.message );
        alert("all reviews fetch error code - " + error.code)
        throw error;
      });
    }

    render() {
      return (
        <View style={ styles.container }>
          <Text style={styles.welcomeText}>Hello, {this.state.name}</Text>
          <Text style={styles.subText}>F-App anywhere, anytime, forever</Text>
          <FlatList
            onEndReached={this.endReached}
            onEndReachedThreshold={.7}
            data={this.state.DATA}
            keyExtractor={item => item.objectId.toString()}
            renderItem={({ item }) =>
              <ReviewCard key={item.objectId} item={item} navigation={this.props.navigation}/>
            }
          />
        </View>
      );
    }

}

export default HomeScreen;

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
      padding: 10,
      flex: 1,
      backgroundColor: THEME.background
    },
    subText:{
      color: THEME.text,
      fontSize: 14,
      fontWeight: '500',
      marginVertical: 10
    },
    welcomeText:{
        color: THEME.text,
        fontSize: 32,
        fontWeight: '800',
        marginTop: 10
    }
});

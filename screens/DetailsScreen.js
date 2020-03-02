import React from 'react';
import { StyleSheet, Image, Text, TextInput, View, Button, Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationEvents } from 'react-navigation';
///custom components
import Shop from '../src/Shop';
import {GameProvider} from '../src/GameContext';
///Styling
import { THEME } from '../styles/theme.js';


class DetailsScreen extends React.Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
      return {
        // title: navigation.getParam('otherParam', 'Title: ' + navigation.getParam('page', 'NO-ID')),
        title: "Review",
      };
    };

    render() {
      const { navigation } = this.props;
      return (
        <View style={styles.container}>
          {/* Shop is useless */}
          <GameProvider>
            <Shop page={1}/>
          </GameProvider>
          <TouchableOpacity
              style={styles.submitButton}
              onPress={() => this.props.navigation.navigate("Review") }
          >
              <Text style={styles.buttonText, {color: '#fff'}}>+</Text>
          </TouchableOpacity>

        </View>
      );
    }
  }

  export default DetailsScreen;

  const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: THEME.background
    },
    buttonText:{
        color: '#ffcc00',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 5
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

import React from 'react';
import { StyleSheet, Image, Text, TextInput, View, Button, Dimensions} from 'react-native';
import Shop from '../src/Shop';
import {GameProvider} from '../src/GameContext';

class GameScreen extends React.Component {
    static navigationOptions = ({navigation, navigationOptions}) => {
      return {
          title: navigation.getParam('name'),
          headerStyle: {
            backgroundColor: navigationOptions.headerTintColor,
          },
          headerTintColor: navigationOptions.headerStyle.backgroundColor,
      };

    };

    render() {
        return (
            <View>
                <Image
                    style={styles.imageMain}
                    source={{ uri:this.props.navigation.getParam('image') }}
                    resizeMode='cover'
                />
            <Text>{this.props.navigation.getParam('name')}</Text>
            <Button
                title="ADD TO CART"
                onPress={() => this.props.navigation.goBack() }
            />
            <Button
                title="WAAAAAAAAAAAAAAAA"
                onPress={() => this.props.navigation.goBack() }
            />
            </View>
        );
    }
}

export default GameScreen;

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    imageMain: {
        height: height/2,
        width: width,
    }
});


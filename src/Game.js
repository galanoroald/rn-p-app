import React from 'react';
import { StyleSheet, Text, Image, View, Button, Alert, TouchableOpacity, Dimensions} from 'react-native';
import { withNavigation } from 'react-navigation';
///Component
import GameView from './GameView';

class Game extends React.Component {

    render(){
        return (
            <View>
                <TouchableOpacity onPress= {() => {
                  this.props.navigation.navigate('Game', {
                      name: this.props.name,
                      image: this.props.image,
                  });
                }}>
                    <Image
                        style={styles.imageIcon}
                        source={{ uri:this.props.image }}
                    />
                    <Text style={styles.imageText}>{this.props.name}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default withNavigation(Game);

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    imageIcon: {
        height: height/4,
        width: width
    },
    imageText:{
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowRadius: 2,
        position: 'absolute',
        //backgroundColor: 'rgba(0, 0, 0, 0.5)',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
    }
});

